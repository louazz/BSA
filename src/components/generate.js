import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import React, { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import moment from "moment";
import logo from './header.jpg';
import logoprime from './footer.jpg';
import '../assets/css/generate.scss';
import { NumberToLetter } from 'convertir-nombre-lettre';
var QRCode = require('qrcode.react');
function Gen() {
    const history = useHistory();
    const location = useLocation();
    const pdfExportComponent = useRef(null);
    const contentArea = useRef(null);
    const [checker, setchecker] = useState(true);
    const [basket, setbasket] = useState([])
    const [client, setclient] = useState({})
    const [total, settotal] = useState(null)
    const [items, setitems]= useState([null])
    useEffect(() => {
        if (checker == true) {
          console.log(location.state.id)
            var m = window.ipcRenderer.sendSync('transaction by id',location.state.id);
            console.log(m)
            var b= basket.push(m)
            setbasket(b)
            console.log(basket)
          settotal(basket[0][0].total)
          setclient(basket[0][0].client)
          var i= items.push(basket[0][0].items)
          setitems(i)
            setchecker(false)
        }
    });
    const handleExportWithComponent = (event) => {
        pdfExportComponent.current.save();
    }
    const handleExportWithFunction = (event) => {
        console.log(text);
        savePDF(contentArea.current, { paperSize: "A4" });
    }

    function navigate() {
        console.log(location.state.total)
        history.push({ pathname: '/' });
    }
    let items_to_render
    if(items[0])
{     items_to_render= items[0].map(function (item) {
        return <tr>
            <th scope="row">{item.product.code}</th>
            <td>{item.product.name.toUpperCase()}</td>
            <td>{item.quantity}</td>
            <td>{parseFloat(item.product.price).toFixed(3)}</td>
            <td>{parseFloat(item.product.price * item.quantity).toFixed(3)}</td>
        </tr>
    })}
    return (
        <div>
            <div class="card">
                <button type="button" class="btn btn-outline-secondary float-right" onClick={handleExportWithComponent}>Print</button>
                <button type="button" class="btn btn-outline-info float-left" onClick={navigate}>Back</button>
            </div>
            <PDFExport ref={pdfExportComponent} paperSize="A4" fileName={moment().format("DD-MM-YYYY hh:mm:ss")}>
                <div class="card ">
                    <div class="card-body">
                        <img class="card-img-top photooo" src={logo} />
                        <h6 class="card-subtitle mb-2 text-muted  text-center"></h6>
                        <hr />
                        <h5 class="text-center">FACTURE</h5>
                        <p class="delta text-left">{`REF: ${location.state.id}`}<br />{`BSA LE: ${moment().format("DD-MM-YYYY hh:mm:ss")}`}</p>
                        <hr />
                        <p class="card-text">
                        <div class="container">
                        <div class="row" >
                            <div class="span12">
                               <div class="row">
                                <div class="span4 delta">    {`CLIENT : ${client.name}`}<br />{`ADRESSE: ${client.address}`}</div>

                                </div>
                            </div>

                        </div>
                        </div>
<br/>

                            <p class="delta "> LIST DES PRODUITS:</p>
                            <table class="table delta">
                                <thead>
                                    <tr>  <th scope="col">CODE</th>
                                        <th scope="col">PRODUIT</th>
                                        <th scope="col">QUANTITE</th>
                                        <th scope="col">PRIX UNITAIRE</th>
                                        <th scope="col">PRIX TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { items[0]?
                                      items[0].map(function (item) {
                                        return <tr>
                                            <th scope="row">{item.product.code}</th>
                                            <td>{item.product.name.toUpperCase()}</td>
                                            <td>{item.quantity}</td>
                                            <td>{parseFloat(item.product.price).toFixed(3)}</td>
                                            <td>{parseFloat(item.product.price * item.quantity).toFixed(3)}</td>
                                        </tr>
                                    }):
                                    location.state.items.map(function (item) {
                                        return <tr>
                                            <th scope="row">{item.product.code}</th>
                                            <td>{item.product.name.toUpperCase()}</td>
                                            <td>{item.quantity}</td>
                                            <td>{parseFloat(item.product.price).toFixed(3)}</td>
                                            <td>{parseFloat(item.product.price * item.quantity).toFixed(3)}</td>
                                        </tr>})}
                                    <tr>
                                        <th scope="row">#</th>
                                        <td colspan="2">TOTAL</td>
                                        <td>{parseFloat(total).toFixed(3)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="delta ">{`LE TOTAL EST DE: ${NumberToLetter(parseFloat(location.state.total).toFixed(0)).toUpperCase()} DINARS `}</p>
                            <br />
                        </p>
                        <hr />
                        <p class="text-center"><QRCode value={JSON.stringify(location.state.basket)} /></p>
                    </div>
                    <img class=" photooo" src={logoprime} />
                </div>
            </PDFExport>
        </div>
    );
}

export default Gen;
