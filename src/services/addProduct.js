import apiAdmin from "../configs/apiAdmin";

const addProduct = (data) => {
  return apiAdmin.post("products", data);
};

export { addProduct };
