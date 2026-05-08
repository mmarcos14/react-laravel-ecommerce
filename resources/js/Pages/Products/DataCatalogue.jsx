import { useMemo, useState } from "react";
import { useCart } from "../../ServiceContext/ProviderCartContext";

export const DataCatalogue = ({
  Datas = [],
  onView,
  onEdit,
  onDelete,
  onAddToCart
}) => {

  const safeData = Array.isArray(Datas) ? Datas : [];

  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return safeData.filter((item) =>
      [item.name, item.description].some((field) =>
        String(field ?? "").toLowerCase().includes(q)
      )
    );
  }, [safeData, search]);

  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const records = filteredProducts.slice(firstIndex, lastIndex);

  const getImage = (item) => {
    if (item?.images?.length > 0 && item.images[0]?.name) {
      return `uploads/products/${item.images[0].name}`;
    }
    return "https://via.placeholder.com/600x400?text=Product";
  };

  const {AddToCart}=useCart();

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <div>
          <h3 className="fw-bold">🛍️ Product Catalogue</h3>
          <small className="text-muted">
            {filteredProducts.length} products available
          </small>
        </div>

        <div className="d-flex gap-2">

          <input
            className="form-control shadow-sm"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select shadow-sm"
            style={{ width: "90px" }}
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>

        </div>
      </div>

      {/* GRID */}
      <div className="row g-4">

        {records.length > 0 ? (
          records.map((item) => (

            <div className="col-md-3" key={item.id}>

              {/* CARD */}
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden product-card">

                {/* IMAGE */}
                <div className="position-relative overflow-hidden">

                  <img
                    src={getImage(item)}
                    className="w-100 product-img"
                    style={{
                      height: "240px",
                      objectFit: "cover",
                      transition: "0.4s"
                    }}
                  />

                  {/* BADGE */}
                  <span className="badge bg-success position-absolute top-0 start-0 m-2">
                    New
                  </span>

                  {/* QUICK ACTIONS ON HOVER */}
                  <div className="product-overlay d-flex flex-column justify-content-center align-items-center gap-2">

                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => onView?.(item)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => AddToCart(item)}
                    >
                      🛒 Add to cart
                    </button>

                  </div>

                </div>

                {/* BODY */}
                <div className="card-body">

                  <h6 className="fw-bold mb-1">{item.name}</h6>

                  <p className="text-muted small mb-2">
                    {item.description?.substring(0, 60)}...
                  </p>

                  <div className="d-flex justify-content-between align-items-center">

                    <span className="fw-bold text-dark">
                      ${item.price ?? 0}
                    </span>

                    <small className="text-muted">
                      Stock: {item.quantity ?? 0}
                    </small>

                  </div>

                </div>

              </div>

            </div>

          ))
        ) : (
          <div className="text-center py-5 text-muted">
            No products found
          </div>
        )}

      </div>

      {/* CSS STYLE */}
      <style>{`
        .product-card {
          transition: 0.3s;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-img {
          transition: 0.4s;
        }

        .product-card:hover .product-img {
          transform: scale(1.1);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: rgba(0,0,0,0.4);
          opacity: 0;
          transition: 0.3s;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }
      `}</style>

    </div>
  );
};