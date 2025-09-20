import React from 'react'

function AddCategory() {
  return (
    <section className="add-category ">
        <h1>Add New Category</h1>
        <form action="http://localhost:5000/add-category" method="post">
            <label >Name:</label>
            <input type="text" name="category" required/>
            <button type="submit">Add Category</button>
        </form>
    </section>
  )
}

export default AddCategory