
import './App.css'
import HomePage from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import {BrowserRouter as Router , Routes,Route} from 'react-router'
import Products from './pages/admin/product'
import AbouUs from './pages/about'
import ContactUs from './pages/contact-us'
import NotFound from './pages/page-not-found'
import ClientLayout from './layouts/client.layout'
import Wishlist from './pages/wishlist'
import CartPage from './pages/cart'
import ProductDetailPage from './pages/prodct-detail'
import Dashboard from './pages/admin'
import CategoryList from './pages/admin/category/category'
import AdminLayout from './layouts/admin.layout'
import CreteCategory from './pages/admin/category/create-category'
import Brands from './pages/admin/brands'
import CreteBrand from './pages/admin/brands/create-brand'
import Users from './pages/admin/users'
import Orders from './pages/admin/orders'
import CreteProduct from './pages/admin/product/create-product'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<Register/>}/>

        {/* defining page routes */}
        {/* client */}
        <Route  path='/' element={<ClientLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/products' element={<Products/>}/>
          {/* dynamic */}
          <Route path='/product/:id' element={<ProductDetailPage/>}/>
          <Route path='/about_us' element={<AbouUs/>}/>
          <Route path='/contact_us' element={<ContactUs/>}/>
          <Route path='/wish_list' element={<Wishlist/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>

        {/* admin routes */}
        <Route path='/admin' element={<AdminLayout/>}>

          <Route path='/admin' element={<Dashboard/>}/>
          {/* category */}
          <Route path='/admin/category' element={<CategoryList/>}/>
          <Route path='/admin/add/category' element={<CreteCategory/>}/>
          {/* brands */}
          <Route path='/admin/brands' element={<Brands/>}/>
          <Route path='/admin/add/brand' element={<CreteBrand/>}/>
          {/* product */}
          <Route path='/admin/products' element={<Products/>}/>
          <Route path='/admin/add/product' element={<CreteProduct/>}/>
          {/* users */}
          <Route path='/admin/users' element={<Users/>}/>
          {/* orders */}
          <Route path='/admin/orders' element={<Orders/>}/>

          <Route path='*' element={<NotFound/>}/>

        </Route>
      </Routes>
    </Router> 
    </>
  )
}

export default App
