import { useEffect, useMemo, useState } from "react";
import { ModalProduct } from "./ModalProduct";
import { useAuth } from "../../ServiceContext/ProviderServiceContext";

export const DataTableProduct = ({ Datas = [], refresh}) => {
  const safeData = Array.isArray(Datas) ? Datas : [];
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const [addModal, setModal] = useState(false);
  const [currentProd, setProd] = useState(null);
  const [editshowmodal, setEditModal] = useState(false);

  const filteredProduct = useMemo(() => {
    const mot = search.toLowerCase();
    return safeData.filter((item) =>
      [item.name, item.description, item.created_at].some((field) =>
        String(field ?? "").toLowerCase().includes(mot)
      )
    );
  }, [safeData, search]);

  const totalPages = Math.ceil(filteredProduct.length / perPage);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const records = filteredProduct.slice(firstIndex, lastIndex);
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);
 
  useEffect(() => {
  }, [search, perPage, safeData]);

    const {OneDelete} =useAuth();

  const edit = (product) => {
    setEditModal(true);
    setProd(product);
  };

  const chanPage=(n)=>{
    setCurrentPage(n)
  }

  const DeleteProduct=async(id)=>{
    const valid=window.confirm("Are you sur ????");
    if(!valid) return
    const response=await OneDelete('product',id)

  }

    const DeleteProductimage=async(id)=>{
    const valid=window.confirm("Are you sur ????");
    if(!valid) return
    const response=await OneDelete('image',id)

  }

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div className="card-header bg-white border-0 p-4">
          <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h4 className="mb-0 fw-bold text-dark">Products</h4>
                <span className="badge rounded-pill text-bg-primary">
                  {filteredProduct.length}
                </span>
              </div>
              <small className="text-muted">Liste des produits avec recherche et pagination</small>
            </div>

            <div className="d-flex flex-column flex-md-row gap-2 align-items-stretch">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 bg-light shadow-none"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="form-select bg-light border-0 shadow-none"
                style={{ width: "110px" }}
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>

              <button
                className="btn btn-primary d-flex align-items-center gap-2"
                type="button"
                onClick={() => setModal(true)}
              >
                <i className="bi bi-plus-lg"></i>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price ($)</th>
                  <th className="py-3">Photo</th>
                  <th className="text-end px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody style={{fontSize:"14px",textDecorationLine:'revert-layer' ,Text:'black'}}>
                {records.length > 0 ? (
                  records.map((item) => (
                    <tr key={item.id}>
                        <td className="px-4 fw-semibold text-dark">
                        {item.category.name}
                      </td>
                      <td className="px-4 fw-semibold text-dark">
                        {item.name.substring(0,20)}
                      </td>
                       <td className="px-4 fw-semibold text-dark">
                        {item.price}
                      </td>

                    

                      <td>
                        <div className="d-flex  mx-3 flex-wrap gap-2 text-center">
                          {item.images?.length > 0 ? (
                            item.images.map((t, index) =>
                              t?.name ? (
                                <img
                                  key={index}
                                  src={`uploads/products/${t.name}`}
                                  alt={item.name}
                                  width="56"
                                  height="56"
                                  className="rounded-4 object-fit-cover border shadow-sm "
                                  onClick={()=>DeleteProductimage(t.id)}
                                />
                              ) : null
                            )
                          ) : (
                            <span className="text-muted small">No image</span>
                          )}
                        </div>
                      </td>

                      <td className="text-end px-4">
                        <div className="btn-group btn-group-sm shadow-sm">
                          <button
                            className="btn btn-outline-success"
                            onClick={() => edit(item)}
                          >
                            Edit
                          </button>
                          <button className="btn btn-outline-primary">
                            View
                          </button>
                          <button className="btn btn-outline-danger" onClick={()=>DeleteProduct(item.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <div className="d-flex flex-column align-items-center gap-2 text-muted">
                        <i className="bi bi-box-seam fs-1"></i>
                        <div>No data to display</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="card-footer bg-white border-0 p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
              <small className="text-muted">
                Page {currentPage} of {totalPages}
              </small>

              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                      Prev
                    </button>
                  </li>

                  {numbers.map((num) => (
                    <li
                      key={num}
                      className={`page-item ${currentPage === num ? "active" : ""}`}
                    >
                      <button className="page-link" type="button" onClick={()=> chanPage(num)}>
                        {num}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(p + 1, totalPages))
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
     {
      addModal && (
        <ModalProduct 
        showm={addModal}
         HideModal={()=>setModal(false)} 
         action_title={'Add new Product'} freshlist={refresh}/>
         
      )
     }

      {
      editshowmodal && (
        <ModalProduct 
        showm={editshowmodal}
         HideModal={()=>setEditModal(false)}
          action_title={'Update Product'}
           CurrentProduct={currentProd} freshlist={refresh}/>
      )
     }
    
    </div>
  );
};