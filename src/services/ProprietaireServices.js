import http from "../http-common";

const getAll = () => {
  return http.get("/proprietaire");
};

const get = id => {
  return http.get(`/proprietaire/${id}`);
};

const create = data => {
  return http.post("/proprietaire", data);
};

const update = (id, data) => {
  return http.put(`/proprietaire/${id}`, data);
};

const remove = id => {
  return http.delete(`/proprietaire/${id}`);
};

const removeAll = () => {
  return http.delete(`/proprietaire`);
};

const findByNom = nom => {
  return http.get(`/proprietaire?nom=${nom}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByNom
};