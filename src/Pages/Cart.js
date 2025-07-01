import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const Cart = () => {

  let total = 0;

  const [products, setProducts] = useState([]);

  const { cart, setCart } = useContext(CartContext);

  const [priceFetched, setTogglePriceFetched] = useState(false);

  useEffect(() => {

     if(!cart.items){

      return;
     }

     if(priceFetched){
      return; 
     }

     const fetchProducts = async () => {
      const ids = Object.keys(cart.items); // e.g., ["4", "21"]
      try {
        const productRequests = ids.map(id =>
          fetch(`https://dummyjson.com/recipes/${id}`).then(res => res.json())
        );
        const products = await Promise.all(productRequests);

        console.log(products);
        setProducts(products);
        setTogglePriceFetched(true);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };


    fetchProducts();
  }, [cart]);

  const getQty = (productId) => {
    return cart.items[productId];
  }

  const increment = (productId) =>{
    const existingQty = cart.items[productId];
    const _cart = {...cart};
    _cart.items[productId] = existingQty + 1; 
    _cart.totalItems += 1;
    setCart(_cart);
  }
  

   const decrement = (productId) =>{
    const existingQty = cart.items[productId];
     if (existingQty === 1){
         return;
    }
    const _cart = {...cart};
    _cart.items[productId] = existingQty - 1; 
    _cart.totalItems -= 1;
    setCart(_cart);
  }

 const getSum = (productId, caloriesPerServing) => {
  return caloriesPerServing * getQty(productId);
};

const grandTotal = products.reduce((acc, product) => {
  return acc + getSum(product.id, product.caloriesPerServing);
}, 0);


const handleDelete = (productId) => {
  const _cart = { ...cart };  // clone cart first
  const qty = _cart.items[productId];  // subtract quantity
  delete _cart.items[productId];  // delete the item
  _cart.totalItems -= qty;
  setCart(_cart);  // update state
  const updatedProductsList = products.filter((product) => product.id !==productId);
  setProducts(updatedProductsList);
};

const handleOrderNow  = () => {
  window.alert("Your Order is Successfully!");
  setProducts([]);
  setCart({});
}



  return (
      
    !products.length 
    
    ? <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt=""></img>
    :
      
   <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
    <h2 className="text-xl font-semibold mb-4 text-center">Cart items</h2>
    <ul className="space-y-6">
       {
        products.map(product =>{

        return(
      
        
          <li  key={product.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img src={product.image} alt="Pizza" className="w-16 h-16 rounded-full" />
              <span className="font-medium">{product.name}</span>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <button onClick={() => { decrement(product.id)}} className="bg-orange-400 text-white font-bold px-3 py-1 rounded-full">-</button>
              <span className="font-semibold">{ getQty(product.id)}</span>
              <button onClick={() => { increment(product.id)}}className="bg-orange-400 text-white font-bold px-3 py-1 rounded-full">+</button>
            </div>
            <span className="text-lg font-semibold">₹ {getSum(product.id, product.caloriesPerServing)}</span>
            <button onClick={() =>{ handleDelete(product.id)}} className="bg-red-400 text-white px-4 py-1 rounded-full">Delete</button>
          </li>
        )})
      }
    </ul>

   
    <div className="flex justify-between items-center mt-8 border-t pt-4">
      <span className="text-lg font-semibold">Grand Total: ₹ { grandTotal }</span>
      <button onClick={ handleOrderNow } className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">Order Now</button>
    </div>
  </div>
  
  
  )
}

export default Cart;