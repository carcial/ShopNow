import { AppDispatch, RootState } from "../../states/Store";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, oneProduct } from "../../states/ProductModalSlice";
import { FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { addProduct } from "../../states/CartSlice";
//import './ProductModal.css';

export default function ProductModal() {
    const { product, showModal } = useSelector((state: RootState) => state.productModal);
    const dispatch: AppDispatch = useDispatch();
    const [showDescrip, setShowDescrip] = useState<boolean>(false);
    const { cartProduct } = useSelector((state: RootState) => state.cart)

    const closeReset = () => {
        dispatch(closeModal());
    };

    const addToCart = (product: oneProduct) => {
        dispatch(addProduct(product))
        closeReset()
    }

    const buy = () => {
        alert("Thanks for buying")
        closeReset()
    }
    const disabledButton = () => {
        return cartProduct.some(Element => Element.id === product.id)
    }
    const discountedPrice = (product: oneProduct) => {
        return Math.floor((product.price - (0.5 * product.price)) * 100) / 100;
    }

    return (
        <>
            <Modal
                backdrop="static"
                show={showModal}
                onHide={() => closeReset()}
                centered
                dialogClassName="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="product-title-modal">{product.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="product-image-container">
                        <img src={product.image} alt={product.title} className="product-image" />
                    </div>
                    <div className="product-info">
                        {product.price !== undefined && (
                            <div className="product-price-container">
                                <span className="product-old-price">${product.price}</span>
                                <span className="product-price">${discountedPrice(product)}</span>
                            </div>
                        )}
                        <div className={`product-description ${showDescrip ? "" : "collapsed"}`}>
                            {product.description}
                        </div>
                        <div className="toggle-description-wrapper" onClick={() => setShowDescrip(!showDescrip)}>
                            <span>{showDescrip ? "Hide Description" : "Show Description"}</span>
                            <FaChevronUp
                                className={`toggle-description-icon ${showDescrip ? "rotate" : ""}`}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { buy() }}>
                        Buy Now
                    </Button>
                    <Button variant="outline-primary" onClick={() => addToCart(product)} disabled={disabledButton()}>Add to cart</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
