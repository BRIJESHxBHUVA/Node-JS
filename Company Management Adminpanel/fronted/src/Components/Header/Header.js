import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Company AdminPanel</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="/">ADMIN</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" aria-current="page" to="/manager">MANAGER</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/employee">EMPLOYEE</Link>
        </li>
        
      </ul>

    </div>
  </div>
</nav>
    </>
  )
}

export default Header
