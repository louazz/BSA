import React, { useState, useEffect } from 'react';
import logo from './bsa.png'; 
import '../assets/css/App.scss'
import { useHistory, RouteComponentProps, useLocation, Link } from 'react-router-dom';
function client() {

    const history= useHistory();
    const [name, setname] = useState("");
    const [add, setadd] = useState("");
    function handlechange_name(event) {
        setname(event.target.value)
    }
    function handlechange_add(event) {
        setadd(event.target.value)
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
            <h3>Add a <strong>client</strong></h3>
            <p class="mb-4">Client's data are saved locally on your machine. </p>
            <form action="#" method="post">
              <div class="form-group first">
                <label for="username">name</label>
                <input type="text" class="form-control" placeholder="name" onChange={handlechange_name}/>
              </div>
              <div class="form-group last mb-3">
                <label>address</label>
                <input class="form-control" placeholder="address" onChange={handlechange_add} />
              </div>
              
              <div class="d-flex mb-5 align-items-center">
              <input value="submit" class="btn  btn-primary btn-dark w-100"  onClick={()=>{
                  
                 var msg= window.ipcRenderer.sendSync('add client', {name: name, address: add}); alert(msg)}}/>            
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

export default client
