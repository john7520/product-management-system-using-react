import React, { useState } from 'react'
import sweetAlert from "sweetalert2"
function DeleteCategory() {
  const [ id, setId ] = useState("")
  
  async function HandleDelete(e) {
    e.preventDefault()
    try {
      let result = await fetch("http://localhost:5000/delete-category", {
        method: "delete",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({
          id:id
        })
      })
      let data = await result.json()
      if (data.success) {
        sweetAlert.fire(" ✅ Success", data.msg, "success")
      } else {
        sweetAlert.fire(" ⚠️ Notice", data.msg, "warning")
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="delete-category ">
        <h1>Delete Category</h1>
        <form onSubmit={HandleDelete} action="">
            <label >ID:</label>
            <input onChange={e=>setId(e.target.value)} type="number" name="id" required/>
            <button type="submit">Delete</button>
        </form>
    </section>
  )
}

export default DeleteCategory