import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct } from "../services/deleteProduct";
import styles from "../styles/DeleteModal.module.css";

function DeleteModal({ productId, onClose }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({ mutationFn: deleteProduct });

  const deleteHandler = (productId) => {
    mutate(productId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-products"] });
        onClose();
        toast.success("محصول با موفقیت حذف شد");
      },
      onError: () => {
        toast.error("مشکلی پیش آمد!");
      },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.deleteModal}>
        <img src="Close.png" alt="close" />
        <p>آیا از حذف این محصول مطمئنید؟</p>
        <div className={styles.actions}>
          <button onClick={() => deleteHandler(productId)}>حذف</button>
          <button onClick={() => onClose()}>لغو</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
