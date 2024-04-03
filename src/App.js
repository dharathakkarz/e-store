
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './pages/product/Product';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Cart from './pages/product/Cart';
import Checkout from './pages/product/Checkout';
import Nav from './components/Nav';
import Slide from './pages/home/Slide';
import Card from './pages/home/Card';

import Men from './pages/category/Men';
import Women from './pages/category/Women';
import Jewelery from './pages/category/Jewelery';
import Electronics from './pages/category/Electronis';


function App() {
  return (
    <>

      <Router>
        <Nav />
        <Routes>

          <Route path='/' element={<Login />}></Route>

          <Route path='/product' element={<Product />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/checkout' element={<Checkout />}></Route>
          <Route path='/slide' element={<Slide />}></Route>
          <Route path='/card' element={<Card />}></Route>
          <Route path='/men' element={<Men />}></Route>
          <Route path='/women' element={<Women />}></Route>
          <Route path='/jewelery' element={<Jewelery />}></Route>
          <Route path='/electronics' element={<Electronics />}></Route>

        </Routes>
      </Router>


    </>
  );
}

export default App;
