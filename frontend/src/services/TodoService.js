import Api from "./Api";

export default {
  index(page, size) {
    return Api().get("todo", {
      params: {
        page: page,
        size: size,
      },
    });
  },
  createData(data) {
    return Api().post("create", data);
  },
  putData(data) {
    return Api().put(`todo/${data.id}`, data);
  },
  deleteData(id) {
    return Api().delete(`delete/${id}`);
  },
};
