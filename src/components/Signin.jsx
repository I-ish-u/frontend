import { useFormik } from 'formik';
import React from 'react'
import { Await, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signin = () => {
    const navigate=useNavigate();

  const signupForm = useFormik({
    initialValues: {
      name : "",
      email : "",
      password : "",
      age : ""
    },
    onSubmit :async ( values,{resetForm,setSubmitting} ) => {
      console.log(values);
      setSubmitting(true);
     const res= await fetch('http://localhost:5000/user/add',{
        method:'POST',
        body:JSON.stringify(values),
        headers:{
            'Content-Type':'application/json'
        }
        
      })
      console.log(res.status);
      setSubmitting(false);
      if(res.status===200){
        Swal.fire({
            icon:'success',
            title:'welldone!',
            text:'registered successfully👌'
        })
        navigate('/login');
      }else{
        Swal.fire({
            icon:'error',
            title:'Error',
            text:'something went wrong🤦‍♂️'
        })
      }
    }
  });
  const uploadfile=async (e)=>{
    const file=e.target.files[0];
    const fd=new FormData();
    fd.append('myfile',file);
    const res=await fetch('http://localhost:5000/util/uploadfile',{
      method:'POST',
      body:fd
    });
    console.log(res.status);
    if(res.status===200){
      console.log('file run successfully');
    }else{console.log('file doesnot run successfully');}
  }

  return (
    <div>
      <div className="w-25 j">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center">Login Form</h3>
            <hr />

            <form onSubmit={signupForm.handleSubmit}>
              <label htmlFor="">Name</label>
              <span style={{color: 'red', fontSize: '0.7em', marginLeft: 10}}>{signupForm.errors.name}</span>
              <input type="text" className="form-control mb-3" name="name" onChange={signupForm.handleChange} value={signupForm.values.name} />
              
              <label htmlFor="">Email Address</label>
              <span style={{color: 'red', fontSize: '0.7em', marginLeft: 10}}>{signupForm.errors.email}</span>
              <input type="email" className="form-control mb-3" name="email" onChange={signupForm.handleChange} value={signupForm.values.email} />

              <label htmlFor="">Password</label>
              <span style={{color: 'red', fontSize: '0.7em', marginLeft: 10}}>{signupForm.errors.password}</span>
              <input type="password" className="form-control mb-3" name="password" onChange={signupForm.handleChange} value={signupForm.values.password} />
              
              <label htmlFor="">Age</label>
              <span style={{color: 'red', fontSize: '0.7em', marginLeft: 10}}>{signupForm.errors.age}</span>
              <input type="number" className="form-control mb-3" name="age" onChange={signupForm.handleChange} value={signupForm.values.age} />
              <input type='file' onChange={uploadfile}/>
              <button disabled={signupForm.isSubmitting} className="btn btn-primary w-100 mt-5">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;