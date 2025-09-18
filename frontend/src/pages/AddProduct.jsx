import React from 'react'

function AddProduct() {
  return (
    <section className="add-product">
        <h1>Add new Product</h1>
        <form action="http://localhost:4000/add-product" method="post">
            <label for="">Product Name:</label>
            <input type="text" name="name" required/>
            <label for="">Price:</label>
            <input type="number" name="price" required/>
            <label for="">Quantity:</label>
            <input type="number" name="quantity" required/>
            <label for="">Category:</label>
            <select name="category" id="">
                <option value="">Null</option>
            </select>
            <button type="submit">Add New Product</button>
        </form>
    </section>
  )
}

export default AddProduct