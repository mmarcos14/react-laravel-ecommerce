import { Catalogue } from "./Catalogue"
import { ProductList } from "./ProductList"

export const CategoryProductCatalogue=()=>{
       return(
        <div className="container-fluid">
            <div className="row g-4">
                 <div className="col-lg-2">
                    <div
                        className="card border-0 shadow-sm rounded-4 position-sticky"
                        style={{ top: "24px" }}
                    >
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">Category product</h5>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Products</span>
                                <span className="fw-semibold">
                                    
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Items</span>
                                <span className="fw-semibold">
                                   
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal</span>
                                <span className="fw-semibold">
                                  
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Shipping</span>
                                <span className="fw-semibold">
                                  
                                </span>
                            </div>

                            <hr className="my-3" />

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="fw-semibold">Total</span>
                                <span className="fs-4 fw-bold text-success">
                                
                                </span>
                            </div>

                            <div className="d-grid gap-2">
                             
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <div className="mb-4">
                              
                            </div>

                          <Catalogue/>
                        </div>
                    </div>
                </div>

               
            </div>
        </div>
       )
}