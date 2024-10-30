import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { BsCart, BsSearch } from "react-icons/bs"
import SearchModal from "./SearchModal"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../states/Store"
import { showSearch } from "../../states/SearchModalSlice"

export default function Header() {
  const dispatch: AppDispatch = useDispatch()
  const { cartProduct } = useSelector((state: RootState) => state.cart)

  const showModal = () => {
    dispatch(showSearch())
  }

  return (
    <header>
      <SearchModal />
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="main-header">
        <Navbar.Brand to={"/"} as={Link}>ShopNow</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="menu-bar" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="mr-auto">
            <Nav.Link to={"/"} as={Link} className="home-link">Home</Nav.Link>
            <Nav.Link href="#pricing" className="home-link">Pricing</Nav.Link>
          </Nav>
          <Nav className="d-lg-none">
            <Nav.Link to={"/cart"} as={Link} className="cart-wrapper">
              <BsCart className="bs-cart" />
              {cartProduct.length > 0 && (
                <span className="cart-count">{cartProduct.length}</span>
              )}
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
        <Nav className="search-icon-wrapper">
          <Nav.Link>
            <BsSearch className="bs-search" onClick={() => showModal()} />
          </Nav.Link>
          <Nav.Link to={"/cart"} as={Link} className="d-none d-lg-block cart-wrapper">
            <BsCart className="bs-cart" />
            {cartProduct.length > 0 && (
              <span className="cart-count">{cartProduct.length}</span>
            )}
          </Nav.Link>

        </Nav>
      </Navbar>



    </header>
  )
}
