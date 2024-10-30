import { Form, Modal, Spinner } from "react-bootstrap";
import { hideSearch } from "../../states/SearchModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../states/Store";
import { useEffect, useState } from "react";
import { ProductsValue } from "../../states/FetchDataSlice";
import ProductModal from "../body/ProductModal";
import { oneProduct, show } from "../../states/ProductModalSlice";

export default function SearchModal() {

    const { showSearchModal } = useSelector((state: RootState) => state.searchModal)
    const { data, isLoading, error } = useSelector((state: RootState) => state.getFetchedData)
    const dispatch: AppDispatch = useDispatch()
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchedProduct, setSearchedProduct] = useState<ProductsValue[]>([])

    const closeReset = () => {
        dispatch(hideSearch())
        setSearchValue("")
        setSearchedProduct([])
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    const search = () => {
        if (searchValue !== "") {
            setSearchedProduct(
                data.filter(product => {
                    return product.title.toUpperCase().includes(searchValue.toUpperCase())
                })
            )
        }
        else {
            setSearchedProduct([])
        }
    }

    const showProduct = (product: oneProduct) => {
        dispatch(show(product))
        closeReset()
    }

    useEffect(() => {
        search()
    }, [searchValue])

    return (
        <>
            <ProductModal />
            <Modal
                size="lg"
                show={showSearchModal}
                onHide={() => closeReset()}
                aria-labelledby="example-modal-sizes-title-lg"
                className="search-modal"
            >
                <Modal.Header closeButton>
                    <Form className="search-bar-container w-100">
                        <Form.Control
                            type="search"
                            placeholder="Search for products..."
                            className="search-bar"
                            aria-label="Search"
                            value={searchValue}
                            onChange={handleOnChange}
                        />
                    </Form>
                </Modal.Header>
                <Modal.Body>
                    {error ? (
                        <div className="error-message">There was an error from the server</div>
                    ) : (
                        <>
                            {isLoading ? (
                                <div className="loading-container">
                                    <Spinner animation="border" variant="primary" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <div className="search-results">
                                    {searchedProduct.length === 0 ? (
                                        <div className="no-result-container"><span className="no-results">No results found</span></div>
                                    ) : (
                                        <>
                                            {searchedProduct.map((product) => (
                                                <div key={product.id} className="search-result-item" onClick={() => showProduct(product)}>
                                                    {product.title}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}
