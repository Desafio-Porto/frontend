import { api } from '../config/api';

const url = '/containers';

const ContainerServices = {
  getContainers: ({ page }) => {
    return api.get(`${url}?page=${page}`)
  },
  getContainerById: (id) => {
    return api.get(`${url}/${id}`)
  },
  getRelatorio: ({ page }) => {
    return api.get(`${url}/relatorio?page=${page}`)
  },
  postContainer: (container) => {
    return api.post(url, container)
  },
  putContainer: (container, id) => {
    return api.put(`${url}/${id}`, container)
  },
  deleteContainer: (id) => {
    return api.delete(`${url}/${id}`)
  }

};

export default ContainerServices;
