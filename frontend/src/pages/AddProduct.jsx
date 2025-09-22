import React, { useEffect, useState } from 'react'
import sweetAlert from "sweetalert2"
function AddProduct() {
  const [category, setCategory] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [cat, setCat] = useState("")
  useEffect(() => {
    async function FetchData() {
      try {
        let result = await fetch("http://localhost:5000/list-category")
        let data = await result.json()
        setCategory(data)
      } catch (error) {
        console.log(error)
      }
    }
    FetchData();
  }, [])

  async function HandleSubmit(e) {
    e.preventDefault()
    try {
      const result = await fetch("http://localhost:5000/add-product", ({
        method: "post",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify ({
          name: name,
          price: price,
          quantity: quantity,
          category: cat
        })

      }))
      console.log(result)
      const data = await result.json()
      console.log(data)
      if (data.success) {
        sweetAlert.fire("✅ Success", data.msg, "success")
      } else {
        sweetAlert.fire("⚠️ Notice", data.msg, "warning")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="add-product">
        <h1>Add new Product</h1>
        <form onSubmit={HandleSubmit}>
            <label >Product Name:</label>
            <input type="text" name="name" onChange={(e)=>setName(e.target.value)} required/>
            <label >Price:</label>
            <input type="number" name="price" onChange={(e)=>setPrice(e.target.value)} required/>
            <label >Quantity:</label>
            <input type="number" name="quantity" onChange={(e)=>setQuantity(e.target.value)} required/>
            <label >Category:</label>
            <select name="category" onChange={(e)=>setCat(e.target.value)}   id="">
            <option value="">Null</option>
              {category.map((element) => {
                return <option  key={element.category_id} value={element.category}>{element.category}</option>
                  })}
            </select>
            <button type="submit">Add New Product</button>
        </form>
    </section>
  )
}

export default AddProduct