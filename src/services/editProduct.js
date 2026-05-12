import apiAdmin from "../configs/apiAdmin";

const editProduct = (data) => {
  const { id } = data;
  return apiAdmin.put(`products/${id}`, data);
};

export { editProduct };
