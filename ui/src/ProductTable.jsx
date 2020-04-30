/* eslint-disable react/jsx-no-target-blank */

import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const ProductRow = withRouter(({
  product, location: { search }, deleteProduct, index,
}) => {
  // eslint-disable-next-line no-unused-vars
  const selectLocation = { pathname: `/products/${product.id}`, search };
  return (
    <tr>
      <td>{product.pname}</td>
      <td>{`$${product.price}`}</td>
      <td>{product.category}</td>
      <td><a href={`/view/${product.id}`}>View</a></td>
      <td>
        <Link to={`/edit/${product.id}`}>Edit</Link>
        {' | '}
        <button type="button" onClick={() => { deleteProduct(index); }}>
          Delete
        </button>
      </td>
    </tr>
  );
});

export default function ProductTable({ products, deleteProduct }) {
  // eslint-disable-next-line react/destructuring-assignment
  const productRows = products.map((product, index) => (
    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>

    </table>
  );
}
