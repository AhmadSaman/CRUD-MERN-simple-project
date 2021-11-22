import http from "../http-common";

export const getAll = () => {
  return http.get("/developers");
};

export const get = (id) => {
  return http.get(`/developers/${id}`);
};

export const create = (data) => {
  return http.post("/developers", data);
};

export const update = (id, data) => {
  return http.put(`/developers/${id}`, data);
};

export const remove = (id) => {
  return http.delete(`/developers/${id}`);
};

export const removeAll = () => {
  return http.delete(`/developers`);
};
