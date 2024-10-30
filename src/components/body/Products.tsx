import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchedData } from "../../states/FetchDataSlice"
import { AppDispatch, RootState } from "../../states/Store"
import { Card, Col, Container, Spinner } from "react-bootstrap"
import ProductModal from "./ProductModal"
import { oneProduct, show } from "../../states/ProductModalSlice"




export default function Products() {
    const dispatch: AppDispatch = useDispatch()
    const { data, isLoading, error } = useSelector((state: RootState) => state.getFetchedData)

    useEffect(() => {
        dispatch(fetchedData());
    }, [dispatch]);


    const showModals = (product: oneProduct) => {
        dispatch(show(product))
    }
    const discountedPrice = (product: oneProduct) => {
        return Math.floor((product.price - (0.5 * product.price)) * 100) / 100;
    }


    return (
        <div >
            <ProductModal />
            <Container>
                <div className="promo-banner">
                    <span className="promo-discount">50% OFF</span> on All Products! Limited Time Only!
                </div>

                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
                    {error ? (
                        <div className="error-message">There was an error from the server</div>
                    )
                        :
                        <>
                            {!isLoading ?
                                (data.map((product) => (
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
                                )))
                                :
                                <div className="loading-container">
                                    <Spinner animation="border" variant="primary" />
                                    <span>Loading...</span>
                                </div>
                            }
                        </>
                    }
                </div>
            </Container>
        </div>
    )
}
