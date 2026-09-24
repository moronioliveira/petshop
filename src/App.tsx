
import { createBrowserRouter } from 'react-router'
import './App.css'
import { Home } from './pages/home'
import { Layout } from './components/layout'
import { Cart } from './pages/cart'



const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/cart",
      element: <Cart/>
    }
    ]
  }
])

export {router}