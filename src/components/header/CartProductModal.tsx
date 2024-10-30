import { AppDispatch, RootState } from "../../states/Store";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, oneProduct } from "../../states/ProductModalSlice";
import { FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { removeProduct } from "../../states/CartSlice";


//still using the ProductModalSlice
export default function CartProductModal() {
    const { product, showModal } = useSelector((state: RootState) => state.productModal);
    const dispatch: AppDispatch = useDispatch();
    const [showDescrip, setShowDescrip] = useState<boolean>(false);


    const closeReset = () => {
        dispatch(closeModal());
    };

    const buy = (product: oneProduct) => {
        alert("Thanks for buying")
        deleteProduct(product)
    }

    const deleteProduct = (product: oneProduct) => {
        dispatch(removeProduct(product))
        closeReset()
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
                    <Button variant="primary" onClick={() => buy(product)}>
                        Buy Now
                    </Button>
                    <Button variant="danger" onClick={() => deleteProduct(product)} >Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
