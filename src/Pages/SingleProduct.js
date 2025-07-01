import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // dynamic id from URL
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
        console.log("Fetched product:", product);
      });
  }, [id]);

  if (!product) return <div className="text-center mt-12">Loading...</div>;

  return (
    <div className="container mx-auto mt-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-12 font-bold text-blue-600"
      >
        ⬅ Back
      </button>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-md"
        />

        <div className="text-center sm:text-left flex flex-col justify-between h-full">
          <div>
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.difficulty}</p>
            <p className="text-md font-semibold mt-2">
              ₹{product.caloriesPerServing}
            </p>
          </div>

          <button className="mt-3 sm:mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 text-sm sm:text-base">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
