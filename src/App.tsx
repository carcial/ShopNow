
import "./App.css"
import Body from './components/body/Body';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Root from './components/header/Root';
import Cart from "./components/body/Cart";


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route path='/' element={<Body />} />
        <Route path='/cart' element={<Cart />} />
      </Route>
    )
  )

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
