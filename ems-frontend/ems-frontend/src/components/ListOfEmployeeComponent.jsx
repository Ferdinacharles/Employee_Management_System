import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom' 

const ListOfEmployeeComponent = () => {
    const [employee,setEmployee] = useState([])
    const navigate = useNavigate()

    let addNewEmployee =()=>{
        navigate("/addEmployee")
    }
    let updateEmployee = (id)=>{
        navigate(`/updateEmployee/${id}`)
    }

    let removeEmployee = (id)=>{
        console.log(id)
        deleteEmployee(id).then((res)=>{
            console.log(res.data)
            getAllEmployees()
        }).catch((err)=> console.log(err))

    }


    useEffect(()=>{
        getAllEmployees();
    },[])
     

    let getAllEmployees = ()=>{
        listEmployees().then((res)=>{
            console.log(res)
            setEmployee(res.data);
        }).catch((err)=>{
                console.log(err);
        })
    }    

    
  return (
    <div className='container'>
        <h1>ListOfEmployeeComponent</h1>
        <button type="button" className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'> 
            <thead>
                <tr>
                    <th>Employee id</th>
                    <th>Employee First name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Action</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                    {
                        employee.map((employee)=>{
                            return(
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td><button className='btn btn-info' onClick={()=>updateEmployee(employee.id)}>Update</button></td>
                                    <td><button className='btn btn-danger' onClick={()=>removeEmployee(employee.id)}
                                        style={{marginLeft:'10px'}}
                                        >Delete</button></td>
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
    
    
    </div>
  )
}

export default ListOfEmployeeComponent