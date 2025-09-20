import React, { useEffect, useState } from 'react'

function CategoryList() {
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
    FetchData()
  }, [])

  return (
    <section className="category-list ">
        <h1>List of Category</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                </tr>
            </thead>
            <tbody>
                {
                  category.map((element) => {
                    return (
                      <tr>
                        <td>{element.category_id}</td>
                        <td>{element.category} </td>
                      </tr>
                    )
                  })
                  
                }
            </tbody>
        </table>
    </section>
  )
}

export default CategoryList