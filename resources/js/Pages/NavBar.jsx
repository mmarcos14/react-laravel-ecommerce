import { Navbar, Container, Nav, Form, Button, Badge } from "react-bootstrap";
import { useState } from "react";
import { useCart } from "../ServiceContext/ProviderCartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../ServiceContext/ProviderServiceContext";

export const NavBar = () => {

   const [search, setSearch] = useState("");
   const { cart } = useCart();
   const  {user,logout,getUser}=useAuth();

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3">

      <Container>

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          🛍️ ShoeShop
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* LINKS */}
          <Nav className="me-auto gap-3">

            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/shop" className="nav-link">
              Shop
            </Link>

            <Link to="/about" className="nav-link">
              About
            </Link>

          </Nav>

          {/* SEARCH */}
          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="me-2"
            />
            <Button variant="outline-primary">
              Search
            </Button>
          </Form>

          {/* CART */}
          <Nav className="align-items-center gap-3">

            <Link
              to="/cart"
              className="nav-link position-relative text-decoration-none"
            >
              🛒 Cart

              {cart?.product?.length > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cart.product.length}
                </Badge>
              )}

            </Link>

            {/* LOGIN */}
            {user ? 
            (
              <Link onClick={()=>{logout('user');getUser();window.href.reload()}} className="nav-link">
              👤Logout
            </Link>
            ):(
                <Link to="/login" className="nav-link">
              👤 Login
            </Link>
            )}
          

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};