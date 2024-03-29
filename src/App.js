
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Product from './pages/product/Product';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Cart from './pages/product/Cart';
import Checkout from './pages/product/Checkout';
import Home from './pages/home/Home';
import Nav from './components/Nav';
import SideNav from './components/SideNav';
import Slide from './pages/home/Slide';
import Card from './pages/home/Card';


function App() {
  return (
  <>
     
   <Router>
<Nav/>
    <Routes>

    <Route path='/' element= {<Login/>}></Route>
    <Route path='/home' element= {<Home/>}></Route>
      <Route path='/product' element= {<Product/>}></Route>
      <Route path='/signup' element= {<Signup/>}></Route>
      <Route path='/login' element= {<Login/>}></Route>
      <Route path='/cart' element= {<Cart/>}></Route>
      <Route path='/checkout' element= {<Checkout/>}></Route>
      <Route path='/sidenav' element= {<SideNav/>}></Route>
      <Route path='/slide' element= {<Slide/>}></Route>
      <Route path='/card' element= {<Card/>}></Route>
     
    </Routes>
   </Router>
    
   
  </>
  );
}

export default App;
