import apiAdmin from "../configs/apiAdmin";

const deleteProduct = (id) => {
  return apiAdmin.delete(`products/${id}`);
};

export { deleteProduct };
