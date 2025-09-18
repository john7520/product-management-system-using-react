import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from "../pages/AddProduct"
import DeleteProduct from "../pages/DeleteProduct"
import ListProduct from "../pages/ListProduct"
import UpdateProduct from "../pages/UpdateProduct"
import AddCategory from "../pages/AddCategory"
import CategoryList from "../pages/CategoryList"
import DeleteCategory from "../pages/DeleteCategory"
function Home() {
  return (
    <Routes>
      <Route path='/' element={<AddProduct />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/delete-product' element={<DeleteProduct />} />
      <Route path='/list-product' element={ <ListProduct/>} />
      <Route path='/update-product' element={ <UpdateProduct/>} />
      <Route path='/add-category' element={<AddCategory/> } />
      <Route path='/category-list' element={ <CategoryList/>} />
      <Route path='/delete-category' element={<DeleteCategory/>} />
    </Routes>
    
  )
}

export default Home