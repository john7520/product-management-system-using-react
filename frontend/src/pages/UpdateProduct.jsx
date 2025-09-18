import React from 'react'

function UpdateProduct() {
  return (
    <section className="update-product ">
        <h1>Update Product Info</h1>
        <form action="">
            <label for="">Product ID:</label>
            <input type="number" name="id" required/>
            <label for="">New Product Name:</label>
            <input type="text" name="name" required/>
            <label for="">New Price:</label>
            <input type="number" name="price" required/>
            <label for="">New Quantity:</label>
            <input type="number" name="quantity" required/>
            <label for="">New Category ID:</label>
            <select name="category" id="">
                <option value="">Null</option>
                
            </select>
            
            <button type="submit">Add Updated Product</button>
        </form>
    </section>
  )
}

export default UpdateProduct