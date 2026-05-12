import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProduct } from "../services/addProduct";
import styles from "../styles/AddModal.module.css";

function AddModal({ setAddModal }) {
  const queryClient = useQueryClient();
  const [addForm, setAddForm] = useState({ name: "", price: "", quantity: "" });

  const { mutate } = useMutation({ mutationFn: addProduct });

  const changeHandler = (event) => {
    setAddForm({ ...addForm, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!addForm.name || !addForm.price || !addForm.quantity) return;

    mutate(addForm, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-products"] });
        setAddModal(null);
        toast.success("محصول با موفقیت اضافه شد");
      },
      onError: () => {
        toast.error("مشکلی پیش آمد!");
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.addModal}>
        <p>ایجاد محصول جدید</p>
        <form onChange={changeHandler} onSubmit={submitHandler}>
          <label htmlFor="name">نام کالا</label>
          <input type="text" placeholder="نام کالا" name="name" id="name" />
          <label htmlFor="quantity">تعداد موجودی</label>
          <input
            type="text"
            placeholder="تعداد"
            name="quantity"
            id="quantity"
          />
          <label htmlFor="price">قیمت</label>
          <input type="text" placeholder="قیمت" name="price" id="price" />
          <div className={styles.actions}>
            <button type="submit">ایجاد</button>
            <button onClick={() => setAddModal(null)}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
