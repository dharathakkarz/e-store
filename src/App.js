
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Product from './pages/Product';

function App() {
  return (
  <>
     
   <Router>
   
    <Routes>
    <Route path='/' element= {<Product/>}></Route>
      <Route path='/product' element= {<Product/>}></Route>
     
    </Routes>
   </Router>
    
   
  </>
  );
}

export default App;
