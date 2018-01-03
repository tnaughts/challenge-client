const API_URL = 'http://localhost:9393/api/v1';

export const resources = {
  project: {
    plural: 'projects'
  },
  story: {
    plural: 'stories'
  }
};

Object.keys(resources).forEach((key) => {
  let resource = resources[key];
  resource.url = `${API_URL}/${resource.plural}`;
});

export default resources;
