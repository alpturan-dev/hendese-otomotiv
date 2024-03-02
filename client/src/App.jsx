import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    axios
      .get(import.meta.env.VITE_API_URL + '/api/products')
      .then((response) => {
        console.log("response", response.data)
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div>
      Products
      {products.map((product) => (
        <div key={product._id}>
          {product.name} | {product.description} | {product.stock}
        </div>
      ))}
    </div>
  )
}

export default App
