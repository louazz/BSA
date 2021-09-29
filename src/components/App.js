import React from 'react'
import logo from './bsa.png'; 
import '../assets/css/App.scss'
import { useHistory, RouteComponentProps, useLocation, Link } from 'react-router-dom';
function App() {
const history= useHistory();
  return (
    <div>
      

  <div class="d-lg-flex half">
    <div class="bg order-1 order-md-2 da"></div>
    <div class="contents order-2 order-md-1">

      <div class="container">
        <div class="row align-items-center justify-content-center">
        <img class="photo" src={logo} alt="Logo" />
          <div class="col-md-7">

            <h3>Welcome to <strong>BSA assistance</strong></h3>
            <p class="mb-4">Make transactions: safely</p>
          
            <div class="d-flex mb-5 align-items-center">
              <input value="ADD CLIENT" class="btn  btn-primary btn-dark w-100" onClick={()=> { history.push({ pathname: '/client'});}}/>
                
              </div>
              <div class="d-flex mb-5 align-items-center">
              <input value="ADD PRODUCT" class="btn  btn-primary btn-dark w-100" onClick={()=> { history.push({ pathname: '/product'});}}/>
                
              </div>
              <div class="d-flex mb-5 align-items-center">
              <input value="TRANSACTION" class="btn  btn-primary btn-dark w-100" onClick={()=> { history.push({ pathname: '/transaction'});}}/>
                
              </div>

             

            
          </div>
        </div>
      </div>
    </div>

    
  </div>
    
    </div>
  )
}

export default App
