import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../states/Store"
import { Card, Col, Container } from "react-bootstrap"
import { oneProduct, show } from "../../states/ProductModalSlice"
import CartProductModal from "../header/CartProductModal"


export default function Cart() {
    const dispatch: AppDispatch = useDispatch()
    const { cartProduct } = useSelector((state: RootState) => state.cart)

    const showModals = (product: oneProduct) => {
        dispatch(show(product))
    }

    const discountedPrice = (product: oneProduct) => {
        return Math.floor((product.price - (0.5 * product.price)) * 100) / 100;
    }

    return (
        <>
            <CartProductModal />
            <Container className=" card-modal">
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
                    <> {cartProduct.map(product => (
                        <Col key={product.id} className="mb-4">
                            <Card className="product-card h-100" onClick={() => { showModals(product) }}>
                                <Card.Img variant="top" src={product.image} alt={product.title} className="product-image" />
                                <Card.Body>
                                    <Card.Title className="product-title">{product.title}</Card.Title>
                                    <div className="product-price-container">
                                        <span className="product-old-price">${product.price}</span>
                                        <span className="product-price">${discountedPrice(product)}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    </>
                </div>
            </Container>

        </>
    )
}

