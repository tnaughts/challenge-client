import {AUTH_TOKEN} from '../config';

export const makeAuthHeader = () => {
    return {
      'Authorization': `Basic ${AUTH_TOKEN}`,
    };
};
