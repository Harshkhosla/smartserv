import React, { useState, useEffect } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://s3.amazonaws.com/open-to-cors/assignment.json';
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status code: ${response.status}`);
        }

        const data = await response.json();

        // Convert the object of products into an array
        const productsArray = Object.entries(data.products).map(([id, product]) => ({
          id,
          ...product
        }));

        // Sort products based on descending popularity
        const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);

        // Update the component state with the sorted products
        setProducts(sortedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
