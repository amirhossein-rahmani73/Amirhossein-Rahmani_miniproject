import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useGetProducts } from "../services/getProducts";
import { e2p } from "../utils/numbers";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import styles from "../styles/AdminPage.module.css";

const limit = 3;

function AdminPage() {
  const [addModal, setAddModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setpage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useGetProducts(page, limit, debouncedSearch);

  const renderPagination = () => {
    if (!data?.data.totalPages) return null;
    const pages = [];

    for (let i = 1; i <= data.data.totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={i === page ? styles.selected : null}
          onClick={() => setpage(i)}
        >
          {e2p(i)}
        </button>,
      );
    }
    return <div className={styles.pagination}>{pages}</div>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src="search-normal.png" alt="search" />
          <input
            type="text"
            placeholder="جستجو کالا"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className={styles.profile}>
          <img src="Felix-Vogel-4.png" alt="" />
          <div>
            <p>میلاد عظمی</p>
            <span>مدیر</span>
          </div>
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.management}>
          <img src="setting-3.png" alt="setting" />
          <p>مدیریت کالا</p>
        </div>
        <div>
          <button onClick={() => setAddModal(true)}>افزودن محصول</button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.data.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{e2p(product.quantity)}</td>
                  <td>{e2p(product.price)} هزار تومان</td>
                  <td>{product.id}</td>
                  <td>
                    <button onClick={() => setEditModal(product)}>
                      <img src="edit.png" alt="edit" />
                    </button>
                    <button onClick={() => setDeleteModal(product.id)}>
                      <img src="trash.png" alt="trash" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Toaster />
      </div>
      {renderPagination()}

      {!!addModal && <AddModal setAddModal={setAddModal} />}
      {!!editModal && (
        <EditModal
          editedProduct={editModal}
          setEditedProduct={setEditModal}
          onClose={() => setEditModal(null)}
        />
      )}
      {!!deleteModal && (
        <DeleteModal
          productId={deleteModal}
          onClose={() => setDeleteModal(null)}
        />
      )}
    </div>
  );
}

export default AdminPage;
