import React, { useEffect, useState } from 'react'

function ListProduct() {

  
  const [products, setProducts] = useState([])
  useEffect(() => {
    async function FetchData() {
      try {
        let result = await fetch("http://localhost:5000/list-product")
        let data = await result.json()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }
    FetchData()
  }, [])
  const sortedProducts = products.sort((a, b) => a.product_id - b.product_id)
  
  return (
    <section className="list-products">
        <h1>List All products</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>CATEGORY</th>
                </tr>
            </thead>
            <tbody>
                {
            sortedProducts.map((element) => {
                  
                  return (
                    <tr key={element.product_id}>
                      <td>{element.product_id} </td>
                      <td>{element.name} </td>
                      <td>${element.price} </td>
                      <td>{element.quantity} </td>
                      <td>{element.category?element.category:"Null"} </td>
                    </tr>
                    )
                  })
                }
            </tbody>
        </table>
    </section>
  )
}

export default ListProduct