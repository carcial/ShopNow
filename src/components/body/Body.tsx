import Products from "./Products";


export default function Body() {
    return (
        <div className="body">

            <section className="main-carousel">
                <div className="carousel-img-container"></div>
                <div className="carousel-content">
                    <h1>Don't Miss Our Discounts !!!</h1>
                    <p>Huge savings on all items. Limited time offer!</p>
                </div>
            </section>

            <section>
                <Products />
            </section>


        </div>
    )
}
