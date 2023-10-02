import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const navigate = useNavigate()
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const {name,email,password} = credentials

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response =await fetch(`http://localhost:5000/api/auth/createuser`,{
              method:'POST',
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({name,email,password})
            });
            const data =await response.json();
            console.log(data);
            
            if(data.success){
                localStorage.setItem('token',data.authToken)
                //redirect
                navigate('/');
                props.showAlert(' User has been created', 'success')
            }else{
                props.showAlert(' Invalid details','danger')
            }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
      }; 
  return (
    <>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Full Name</label>
    <input type="text" className="form-control" id="name" name='name' value={credentials.name} aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} name='cpassword' onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </>
  )
}

export default Signup
