import { api } from '../config/api';

const url = '/movimentacoes';

const MovimentacaoServices = {
  getMovimentacoes: ({ page }) => {
    return api.get(`${url}?page=${page}`);
  },
  getMovimentacaoById: (id) => {
    return api.get(`${url}/${id}`);
  },
  getMovimentacaoByIdContainer: ({ idContainer, page }) => {
    return api.get(`${url}/container/${idContainer}?page=${page}`);
  },
  postMovimentacao: (movimentacao) => {
    return api.post(url, movimentacao);
  },
  putMovimentacao: (movimentacao, id) => {
    return api.put(`${url}/${id}`, movimentacao);
  },
  deleteMovimentacao: (id) => {
    return api.delete(`${url}/${id}`);
  },
};

export default MovimentacaoServices;
