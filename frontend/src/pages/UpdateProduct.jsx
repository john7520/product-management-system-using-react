import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function UpdateProduct() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [cat, setCat] = useState("")
  const [category, setCategory] = useState([])
  useEffect(() => {
    async function FetchData() {
      try {
        let result = await fetch("http://localhost:5000/list-category");
        let data = await result.json()
        setCategory(data)
      } catch (error) {
        console.log(error)
      }
    }
    FetchData()
  }, [])
  async function HandleUpdate(e) {
    e.preventDefault()
    try {
      let result = await fetch("http://localhost:5000/update-product", {
        method: "put",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          id: id,
          name: name,
          price: price,
          quantity: quantity,
          category: cat
          
        })
      })
      let data = await result.json()
      if (data.success) {
        Swal.fire("✅ Success", data.msg, "success")
        
      } else {
        Swal.fire("⚠️ Notice", data.msg, "warning")
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <section className="update-product ">
        <h1>Update Product Info</h1>
        <form onSubmit={HandleUpdate} action="">
            <label >Product ID:</label>
            <input onChange={(e)=>setId(e.target.value)} type="number" name="id" required/>
            <label >New Product Name:</label>
            <input onChange={(e)=>setName(e.target.value)} type="text"  name="name" required/>
            <label >New Price:</label>
            <input onChange={(e)=>setPrice(e.target.value)} type="number" name="price" required/>
            <label >New Quantity:</label>
            <input onChange={(e)=>setQuantity(e.target.value)} type="number" name="quantity" required/>
            <label >New Category:</label>
            <select onChange={(e)=>setCat(e.target.value)} name="category" id="">
                <option value="">Null</option>
                {
            category.map((element) => {
                    return <option key={element.category_id} value={element.category}>{element.category} </option>
                  })
                }
            </select>
            
            <button type="submit">Add Updated Product</button>
        </form>
    </section>
  )
}

export default UpdateProduct