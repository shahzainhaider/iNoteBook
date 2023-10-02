import React from 'react';
import '../CSS/navbar.css'
import { NavLink,Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const handleClick = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">inootebook</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-Navlink css" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-Navlink css" aria-current="page" to="/about">About</NavLink>
          </li>
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex" role="search">
           <Link className="btn btn-outline-primary mx-2" to='/login'>Login</Link>
          <Link className="btn btn-outline-primary mx-2" to='/signup'>signup</Link>
        </form>:<Link className="btn btn-outline-primary mx-2" onClick={handleClick} to='login'>logout</Link>}
      </div>
    </div>
  </nav></>
  )
}

export default Navbar
