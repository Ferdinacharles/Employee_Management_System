import React from 'react'
import ListOfEmployeeComponent from './components/ListOfEmployeeComponent'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Employee from './components/Employee'

const App = () => {
  return (
    <>
    <BrowserRouter>
        <Header/>
        <Routes>

             <Route path="/" element={<ListOfEmployeeComponent/>} ></Route>
             <Route path="/employees" element={<ListOfEmployeeComponent/>} ></Route>
             <Route path="/addEmployee" element={<Employee/>} ></Route>
             <Route path="/updateEmployee/:id" element={<Employee/>} ></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App