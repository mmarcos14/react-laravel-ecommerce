import { useEffect, useMemo, useState } from "react";
import { CreateModalCategory } from "./CreateModalCategory";

export const DataTableCategory = ({ Datas = [], refresh }) => {
  const safeData = Array.isArray(Datas) ? Datas : [];
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
const [addModal,setModal]=useState(false)
  const filteredCategories = useMemo(() => {
    const mot = search.toLowerCase();
    return safeData.filter((item) =>
      [item.name, item.description, item.created_at].some((field) =>
        String(field ?? "").toLowerCase().includes(mot)
      )
    );
  }, [safeData, search]);

  const totalPages = Math.ceil(filteredCategories.length / perPage);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const records = filteredCategories.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, perPage, safeData]);

  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const [currentCat,setCat]=useState(null);
  const [editshowmodal,setEditModal]=useState(false);


  const edit=(category)=>{
    setEditModal(true);
    setCat(category);
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div className="card-header bg-white border-0 py-3 px-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h5 className="mb-1 fw-bold text-dark">Categories list</h5>
            <small className="text-muted">
              {filteredCategories.length} catégorie(s) trouvée(s)
            </small>
          </div>

          <div className="d-flex gap-3 flex-wrap">
            <input
              type="text"
              className="form-control"
              style={{ minWidth: "250px" }}
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <select
              className="form-select"
              style={{ width: "110px" }}
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>

          </div>
            <button className="btn btn-sm btn-primary mx-3 float-end" type="button" onClick={()=>setModal(true)}>Add</button>

        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Photo</th>
                  <th className="text-end px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {records.length > 0 ? (
                  records.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 fw-semibold text-muted">{item.name} -({item.products.length})</td>
                      <td>
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                          {item.description}
                        </span>
                      </td>
                      <td><img src={`uploads/categories/${item.photo}`} width={'60px'}  height={'60px'}/></td>
                      <td className="text-end px-4">
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-success" onClick={()=>edit(item)}>Edit</button>
                          <button className="btn btn-outline-primary">View</button>
                          <button className="btn btn-outline-danger">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      No data to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="card-footer bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
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
                    <button className="page-link" onClick={() => setCurrentPage(num)}>
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
        )}
      </div>
      {addModal && (<CreateModalCategory showm={addModal} HideModal={()=>setModal(false)}/>)}
      {editshowmodal && (<CreateModalCategory showm={editshowmodal} HideModal={()=>setEditModal(false)} CurrentCategory={currentCat}/>)}
    </div>
  );
};