import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editProduct } from "../services/editProduct";
import styles from "../styles/EditModal.module.css";

function EditModal({ editedProduct, setEditedProduct, onClose }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({ mutationFn: editProduct });

  const changeHandler = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  const editHandler = (event) => {
    event.preventDefault();
    if (!editedProduct.name || !editedProduct.price || !editedProduct.quantity)
      return;

    mutate(editedProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-products"] });
        setEditedProduct(null);
        toast.success("محصول با موفقیت ویرایش شد");
      },
      onError: () => {
        toast.error("مشکلی پیش آمد!");
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.editModal}>
        <p>ویرایش اطلاعات</p>
        <form>
          <label htmlFor="name">نام کالا</label>
          <input
            type="text"
            placeholder="نام کالا"
            id="name"
            name="name"
            value={editedProduct.name}
            onChange={changeHandler}
          />
          <label htmlFor="quantity">تعداد موجودی</label>
          <input
            type="text"
            placeholder="تعداد"
            id="quantity"
            name="quantity"
            value={editedProduct.quantity}
            onChange={changeHandler}
          />
          <label htmlFor="price">قیمت</label>
          <input
            type="text"
            placeholder="قیمت"
            id="price"
            name="price"
            value={editedProduct.price}
            onChange={changeHandler}
          />
          <div className={styles.actions}>
            <button onClick={editHandler}>ثبت اطلاعات جدید</button>
            <button onClick={() => onClose(null)}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
