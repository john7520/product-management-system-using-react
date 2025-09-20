import React, { useEffect, useState } from 'react'

function AddProduct() {
  const [category, setCategory] = useState([])
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
  return (
    <section className="add-product">
        <h1>Add new Product</h1>
        <form action="http://localhost:5000/add-product" method="post">
            <label >Product Name:</label>
            <input type="text" name="name" required/>
            <label >Price:</label>
            <input type="number" name="price" required/>
            <label >Quantity:</label>
            <input type="number" name="quantity" required/>
            <label >Category:</label>
            <select name="category"    id="">
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