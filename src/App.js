import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './Pages/Cart';
import Products from './components/Products';
import Navigation from './components/Navigation';
import SingleProduct from './Pages/SingleProduct';
import { CartContext } from './Pages/CartContext';
import { useEffect, useState } from 'react';

function App() {

// const [ cart, setCart] = useState({});


// Fetch from local storage//

//  Load from localStorage on first render
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : { items: {}, totalItems: 0 };
    } catch {
      return { items: {}, totalItems: 0 };
    }
  });

useEffect(() => {
     window.localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

  return (
    <div className="App">
      <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart}}>
      <Navigation/>
       <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/products/:id' element={<SingleProduct/>}></Route>
        <Route path='/products' exact element={<Products/>}></Route>
       </Routes>
       </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
