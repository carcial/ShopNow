import { Provider } from "react-redux"
import store from "../../states/Store"
import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function Root() {
    return (
        <Provider store={store}>
            <Header />
            <Outlet />
        </Provider>
    )
}
