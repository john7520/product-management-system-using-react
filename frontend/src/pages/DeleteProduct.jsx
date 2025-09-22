import React, { useState } from 'react'
import sweetAlert from "sweetalert2"
function DeleteProduct() {
  const [id, setId] = useState("")
  async function HandleDelete(e) {
    e.preventDefault()
    try {
      let result = await fetch("http://localhost:5000/delete-product", {
        method: "delete",
        headers: {
          "content-type":"application/json"
        },
        body: JSON.stringify({
          id:id
        })
      })
      const data = await result.json()
      if (data.success) {
        sweetAlert.fire("✅ Success ", data.msg, "success")
      } else {
        sweetAlert.fire("⚠️ Notice ", data.msg, "warning")
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="delete-product ">
        <h1>Delete Product By ID</h1>
        <form onSubmit={HandleDelete}>
            <label >ID:</label>
            <input onChange={(e)=>setId(e.target.value)} type="number" name="id" required/>
            <button type="submit">Delete Products</button>
        </form>
    </section>
  )
}

export default DeleteProduct