/* eslint camelcase: 0 */
/* eslint no-shadow: 0 */
import {get, post, patch, remove} from '../lib/request';
import {error} from './notifications';
import resources from '../constants/resources';
import {capitalize} from '../utils/string';
import {makeAuthHeader} from '../utils/auth';
import _ from 'underscore';

const notifyError = error.bind(null, 'api_error');

export function apiError(error) {
  return {
    type: 'API_ERROR',
    error
  };
}

export function receiveCollectionError(resource, error) {
  return {
    type: 'RESOURCE_COLLECTION_ERROR',
    resource,
    error
  };
}

export function receiveDetailError(resource, error) {
  return {
    type: 'RESOURCE_DETAIL_ERROR',
    resource,
    error
  };
}

export function receiveCollection(resource, payload) {
  return {
    type: 'RECEIVE_RESOURCE_COLLECTION',
    resource,
    payload
  };
}

export function receiveDetail(resource, payload) {
  return {
    type: 'RECEIVE_RESOURCE_DETAIL',
    resource,
    payload
  };
}

export function requestCollection(resource) {
  return {
    type: 'REQUEST_RESOURCE_COLLECTION',
    resource
  };
}

export function requestDetail(resource) {
  return {
    type: 'REQUEST_RESOURCE_DETAIL',
    resource
  };
}

export function requestResourceCreate(resource) {
  return {
    type: 'REQUEST_RESOURCE_CREATE',
    resource
  };
}

export function requestResourceUpdate(resource) {
  return {
    type: 'REQUEST_RESOURCE_UPDATE',
    resource
  };
}

export function resourceDeleted(resource, id) {
  return {
    type: 'REQUEST_RESOURCE_DELETED',
    id,
    resource
  };
}

export function clearCollection(resource) {
  return {
    type: 'CLEAR_RESOURCE_COLLECTION',
    resource: resource
  };
}

export function clearDetail(resource) {
  return {
    type: 'CLEAR_RESOURCE_DETAIL',
    resource: resource
  };
}

const addAuthHeader = (headers) => {
  let authHeader = makeAuthHeader();
  return Object.assign({}, headers, authHeader);
};

function _delete(resourceType, url, params) {
  return (dispatch, getState) => {
    let headers = addAuthHeader({}, getState);
    return remove(url, params, headers)
      .catch(errResponse => {
        dispatch(apiError(errResponse));
        throw new Error(errResponse.data.error);
      })
      .then(response => dispatch(resourceDeleted(resourceType, response.data)));
  };
}

function _fetch(requestAction, receiveAction, errorAction) {
  return (resourceType, url, params) => {
    return (dispatch, getState) => {
      let headers = addAuthHeader({}, getState);
      dispatch(requestAction(resourceType));
      return get(url, params, headers)
        .catch(errResponse => {
          dispatch(errorAction(resourceType, errResponse.data));
          throw new Error(errResponse.data.error);
        })
        .then(response => dispatch(receiveAction(resourceType, response.data)));
    };
  };
}

function _post(resourceType, url, params) {
  return (dispatch, getState) => {
    dispatch(requestResourceCreate(resourceType));
    let headers = addAuthHeader({}, getState);
    return post(url, params, headers)
      .catch(errResponse => {
        let errors = [];
        _.map(errResponse.data, (val, key) => (
          errors.push(`${key} ${val[0]}`)
        ));
        dispatch(apiError(errResponse.data));
        dispatch(notifyError(errors.join(', ')));
        throw new Error(errResponse.data.error);
      })
      .then(response => dispatch(receiveDetail(resourceType, response.data)));
  };
}

function _patch(resourceType, url, params) {
  return (dispatch, getState) => {
    dispatch(requestResourceUpdate(resourceType));
    let headers = addAuthHeader({}, getState);
    return patch(url, params, headers)
      .catch(errResponse => {
        dispatch(apiError(errResponse.data));
        throw new Error(errResponse.data.error);
      })
      .then(response => dispatch(receiveDetail(resourceType, response.data)));
  };
}

export const fetchCollection = _fetch(requestCollection, receiveCollection, receiveCollectionError);
export const fetchDetail = _fetch(requestDetail, receiveDetail, receiveDetailError);

export const actions = {};

Object.keys(resources).forEach((key) => {
  let resource = resources[key];
  actions['fetch' + capitalize(key)] = (id, params) => {
    return fetchDetail(key, `${resource.url}/${id}`, params);
  };
  actions['fetch' + capitalize(resource.plural)] = fetchCollection.bind(null, key, resource.url);
  actions['create' + capitalize(key)] = (params) => {
    return _post(key, resource.url, params);
  };
  actions['patch' + capitalize(key)] = (id, params) => {
    return _patch(key, `${resource.url}/${id}`, params);
  };
  actions['delete' + capitalize(key)] = (id, params) => {
    return _delete(key, `${resource.url}/${id}`, params);
  };
});
