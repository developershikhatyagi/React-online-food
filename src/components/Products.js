import Product from "./Product";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Pages/CartContext";

//  https://dummyjson.com/recipes
const Products = () => {
 const { name } = useContext(CartContext);

const [products, setProducts] = useState([]);

useEffect(() =>{
  fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(products =>{
      setProducts(products.recipes);
      // console.log(products);
  })

}, []);

  return (
    <div className='container mx-auto pb-24 text-left'>
        <h1 className='text-lg font-bold my-8 ms-5'>Products</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 my-8">
        {
          products.map(product => <Product key={product.id} product={product}/>)
        }
         
  </div>

    </div>
  )
}

export default Products;