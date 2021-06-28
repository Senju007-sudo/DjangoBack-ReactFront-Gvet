import http from "../http-common";

const getAll = () => {
  return http.get("/animaux");
};

const get = id => {
  return http.get(`/animaux/${id}`);
};

const create = data => {
  return http.post("/animaux", data);
};

const update = (id, data) => {
  return http.put(`/animaux/${id}`, data);
};

const remove = id => {
  return http.delete(`/animaux/${id}`);
};

const removeAll = () => {
  return http.delete(`/animaux`);
};

const findByNom = nom => {
  return http.get(`/animaux?nom=${nom}`);
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