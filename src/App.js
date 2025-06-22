import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import Products from './Pages/Products';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation/>
       <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
