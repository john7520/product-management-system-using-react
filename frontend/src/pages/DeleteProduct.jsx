import React from 'react'

function DeleteProduct() {
  return (
    <section className="delete-product ">
        <h1>Delete Product By ID</h1>
        <form action="">
            <label for="">ID:</label>
            <input type="number" name="id" required/>
            <button type="submit">Delete Products</button>
        </form>
    </section>
  )
}

export default DeleteProduct