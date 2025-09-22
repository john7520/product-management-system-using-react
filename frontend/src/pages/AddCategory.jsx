import React, { useState } from 'react'
import SweetAlert from "sweetalert2";
function AddCategory() {
  const [category, setCategory] = useState("")
  
  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/add-category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    });

    const data = await response.json();

    if (data.success) {
      SweetAlert.fire("✅ Success", data.message, "success");
    } else {
      SweetAlert.fire("⚠️ Notice", data.message, "warning");
    }
  }
  return (
    <section className="add-category ">
        <h1>Add New Category</h1>
        <form onSubmit={handleSubmit}>
            <label >Name:</label>
            <input type="text" name="category" onChange={(e)=>setCategory(e.target.value)} required/>
            <button type="submit">Add Category</button>
        </form>
    </section>
  )
}

export default AddCategory