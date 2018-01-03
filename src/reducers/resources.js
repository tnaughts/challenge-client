export const defaultState = {
  collection: {
    loading: {}
  },
  detail: {
    loading: {}
  }
};

export default (state = defaultState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
  case 'REQUEST_RESOURCE_COLLECTION':
    newState.collection.loading[action.resource] = true;
    return newState;
  case 'REQUEST_RESOURCE_DETAIL':
    newState.detail.loading[action.resource] = true;
    return newState;
  case 'REQUEST_RESOURCE_CREATE':
    newState.detail.loading[action.resource] = true;
    return newState;
  case 'REQUEST_RESOURCE_UPDATE':
    newState.detail.loading[action.resource] = true;
    return newState;
  case 'RECEIVE_RESOURCE_COLLECTION':
    newState.collection.loading[action.resource] = false;
    newState.collection[action.resource] = action.payload;
    return newState;
  case 'RECEIVE_RESOURCE_DETAIL':
    newState.detail.loading[action.resource] = false;
    newState.detail[action.resource] = action.payload;
    return newState;
  case 'RESOURCE_UPDATE_ERROR':
    newState.detail.loading[action.resource] = false;
    return newState;
  case 'RESOURCE_COLLECTION_ERROR':
    newState.collection[action.resource] = null;
    newState.collection.loading[action.resource] = false;
    return newState;
  case 'RESOURCE_DETAIL_ERROR':
    newState.detail[action.resource] = null;
    newState.detail.loading[action.resource] = false;
    return newState;
  case 'CLEAR_RESOURCE_COLLECTION':
    newState.collection[action.resource] = null;
    return newState;
  case 'CLEAR_RESOURCE_DETAIL':
    newState.detail[action.resource] = null;
    return newState;
  default:
    return state;
  }
};
