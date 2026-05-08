import { Navbar, Container, Nav, Form, Button, Badge } from "react-bootstrap";
import { useState } from "react";

export const NavBar = ({ cartCount = 0 }) => {

  const [search, setSearch] = useState("");

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3">

      <Container>

        {/* LOGO */}
        <Navbar.Brand className="fw-bold text-primary">
          🛍️ ShoeShop
        </Navbar.Brand>

        {/* TOGGLE MOBILE */}
        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* LINKS */}
          <Nav className="me-auto gap-3">

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>

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

            <Nav.Link href="/cart" className="position-relative">

              🛒 Cart

              {cartCount > 0 && (
                <Badge
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}

            </Nav.Link>

            {/* USER */}
            <Nav.Link href="/login">
              👤 Login
            </Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};