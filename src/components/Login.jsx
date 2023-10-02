import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate()
    const [credentials,setCredentials] = useState({email:"",password:""})
    const {email,password} = credentials

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response =await fetch(`http://localhost:5000/api/auth/login`,{
              method:'POST',
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({email, password})
            });
            const data =await response.json();
            console.log(data);
            
            if(data.success){
                localStorage.setItem('token',data.authToken)
                //redirect
                props.showAlert(' You are loggin','success')
                navigate('/');
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
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} name='password' onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </>
  )
}

export default Login
