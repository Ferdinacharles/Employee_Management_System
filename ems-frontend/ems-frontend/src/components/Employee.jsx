import React, { useEffect, useState } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate , useParams} from "react-router-dom";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();
  const {id} = useParams() 

  useEffect(()=>{
   if(id){
    getEmployee(id).then((res)=>{
      setFirstName(res.data.firstName)
      setLastName(res.data.lastName)
      setEmail(res.data.email)
    }).catch(err=>{
      console.log(err)
    })


   }
  },[id])

  let saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);
      if(id){
        updateEmployee(id,employee).then((res)=>{
          console.log(res.data)
          navigate("/employees")
        }).catch((err)=>{
          console.log(err)
        })
      }else{
        createEmployee(employee)
        .then((res) => {
          console.log(res.data);
          navigate("/employees");
        })
        .catch((err) => {
          console.log(err);
        });

      }

     
    
    }
  };
  let validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  };
  let pageTitle = ()=>{
    if(id){
      return <h2 className="text-center">Update Employee</h2>
    }else{
      return <h2 className="text-center">Add Employee</h2>
    }
  }

  return (
    <>
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {pageTitle()}
            <div className="card-body">
              <form action="">
                <label className="form-group" htmlFor="fname">
                  First Name:
                </label>
                <input
                  type="text"
                  id="fname"
                  placeholder="Enter employee First Name:"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? 'is-invalid' : ""
                  }`}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
                <br />
                <label className="form-group" htmlFor="lname">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lname"
                  placeholder="Enter employee Last Name:"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? 'is-invalid' : ''
                  }`}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
                <br />
                <label className="form-group" htmlFor="email">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter employee Email:"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
                <br />
                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
