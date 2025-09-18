import React from 'react'

function DeleteCategory() {
  return (
    <section className="delete-category ">
        <h1>Delete Category</h1>
        <form action="">
            <label for="">ID:</label>
            <input type="number" name="id" required/>
            <button type="submit">Delete</button>
        </form>
    </section>
  )
}

export default DeleteCategory