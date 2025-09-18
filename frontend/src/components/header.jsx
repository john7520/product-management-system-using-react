import React from 'react'
import { Link } from 'react-router-dom'

function header() {
  return (
    <section className="header">
        <button className="green"><Link to="/add-product">Add Product</Link></button>
        <button className="blue"><Link to="/list-product">List Products</Link></button>
        <button className="yellow"><Link to="/update-product">Update Product</Link></button>
        <button className="red"><Link to="/delete-product">Delete Product</Link></button>
        <button className="green"><Link to="/add-category">Add Category</Link></button>
        <button className="red"><Link to="/delete-category">Delete Category</Link></button>
        <button className="blue"><Link to="/category-list">Category List</Link></button>
    </section>
  )
}

export default header