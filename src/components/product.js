import React, { useState, useEffect } from 'react';
import logo from './bsa.png'; 
import '../assets/css/App.scss'
import { useHistory, RouteComponentProps, useLocation, Link } from 'react-router-dom';
function product() {
    const [name, setname]= useState("")
    const [code, setcode]= useState("")
    const [price, setprice]= useState("")
    const history= useHistory();
    function handlechange_name(event) {
        setname(event.target.value)
    }
    function handlechange_code(event) {
        setcode(event.target.value)
    }
    function handlechange_price(event) {
        setprice(event.target.value)
    }
    
  return (
    <div>
      

  <div class="d-lg-flex half">
    <div class="bg order-1 order-md-2 da"></div>
    <div class="contents order-2 order-md-1">

      <div class="container">
        <div class="row align-items-center justify-content-center">
        <input value="Back" class="btn  btn-primary btn-light "  onClick={()=> { history.push({ pathname: '/'});}}/>
          <div class="col-md-7">
          <img class="photo" src={logo} alt="Logo" />
            <h3>Add a<strong> product</strong></h3>
            <p class="mb-4">Your data is locally saved: DO NOT WORRY</p>
            <form action="#" method="post">
              <div class="form-group first">
                <label for="username">Product name</label>
                <input type="text" class="form-control" placeholder="name" onChange={handlechange_name}/>
              </div>
              
              <div class="form-group last mb-3">
                <label for="password">Product code</label>
                <input type="password" class="form-control" placeholder="code" onChange={handlechange_code}/>
              </div>
              <div class="form-group first">
                <label for="username">Product price</label>
                <input type="text" class="form-control" placeholder="price" onChange={handlechange_price}/>
              </div>
              <div class="d-flex mb-5 align-items-center">
              <input  value="submit" class="btn  btn-primary btn-dark w-100" onClick={()=>{
                   var t=window.ipcRenderer.sendSync('add medicine', {name: name, code: code, price: price});
                   alert(t);
              }}/>
                
              </div>

           


            </form>
          </div>
        </div>
      </div>
    </div>

    
  </div>
    
    </div>
  )
}

export default product
