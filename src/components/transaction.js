import React, { useState, useEffect } from 'react';
import SelectSearch from 'react-select-search';
import '../assets/css/App.scss'
import '../assets/css/Search.scss'
import logo from './bsa.png';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useHistory, useLocation } from 'react-router-dom';
import { func } from 'prop-types';
import Select from 'react-select'; import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}; Modal.setAppElement(document.getElementById('root'));
function transaction() {
    var uniqid = require('uniqid');
    const history = useHistory();
    const [medicine, setmedicine] = useState([]);
    const [client, setclient] = useState([]);
    const [result, setresult] = useState([]);
    const [quantity, setquantity] = useState("");
    const [checker, setchecker] = useState(true);
    const [items, setitems] = useState([])
    const [target_c, settarget_c] = useState("")
    const [target_s, settarget_s] = useState("")
    const [basket, setbasket] = useState([])
    const [total, settotal] = useState(0.000)
    const [value, setValue] = useState('');
    const [remise, setremise] = useState(0.000);
    const [tmp, settemp] = useState([]);

    const options = [
        { value: '1', label: 'remise' },
        { value: '2', label: 'augmentation' },

    ]; let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        if (checker == true) {
            var m = window.ipcRenderer.sendSync('get medicine');
            setmedicine(m)
            var c = window.ipcRenderer.sendSync('get client');
            setclient(c)
            settarget_c("")
            setbasket([])
            setchecker(false)
        }
    });
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }
    const handleOnSearch1 = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.

        console.log(string, results)
    }
    const handleOnHover1 = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect1 = (item) => {
        settarget_c(item);     // the item selected
        console.log(item)
    }

    const handleOnFocus1 = () => {
        console.log('Focused')
    }

    const formatResult1 = (item) => {
        return item;
    }



    const handleOnSearch2 = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.

        console.log(string, results)
    }
    const handleOnHover2 = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect2 = (item) => {
        // the item selected
        settarget_s(item);
        console.log(item)
    }

    const handleOnFocus2 = () => {
        console.log('Focused')
    }

    const formatResult2 = (item) => {

        return item;
    }




    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        setresult(item)
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item) => {

        return item;
    }
    function handlechange_quantity(event) {
        setquantity(event.target.value)
    }
    function handlechange_select(val) {

        setValue(val)
        console.log(value)
    }
    function handle_remise(e) {
        if (value.value == "1") {
            setremise(-e.target.value)
        } else {
            setremise(e.target.value)
        }
    }


    return (
        <div>


            <div class="d-lg-flex half">
                <div class="bg order-1 order-md-2 do"></div>
                <div class="contents order-2 order-md-1">

                    <div class="container">
                        <div class="row align-items-center justify-content-center">
                            <input value="Back" class="btn  btn-primary btn-light " onClick={() => { history.push({ pathname: '/' }); }} />
                            <div class="col-md-7">
                                <img class="photo" src={logo} alt="Logo" />
                                <h3>Perform a <strong>transaction</strong></h3>
                                <p class="mb-4">Safety first: it's our new brand slogon</p>
                                <form action="#" method="post">
                                    <div class="form-group first">
                                        <label >Product</label>
                                        <ReactSearchAutocomplete
                                            items={medicine}
                                            onSearch={handleOnSearch}
                                            onHover={handleOnHover}
                                            onSelect={handleOnSelect}
                                            onFocus={handleOnFocus}
                                            autoFocus
                                            formatResult={formatResult}
                                        />
                                    </div>
                                    <div class="form-group last mb-3">
                                        <label >Quantity</label>
                                        <input type="text" class="form-control" placeholder="quantity" onChange={handlechange_quantity} />
                                    </div>
                                    <div class="d-flex mb-5 align-items-center">
                                        <input value="Add items" class="btn  btn-primary btn-dark w-100" onClick={() => {
                                            var v = items;
                                            console.log(result.name)
                                            var t = total + result.price * quantity
                                            console.log(t)
                                            settotal(t)
                                            var res = { product: result, quantity: quantity };
                                            console.log(result)
                                            v.push(res);
                                            setitems(v)
                                            console.log("items: "+items)
                                            var tmpo = tmp;
                                            tmpo.push({ name: result.name })
                                            settemp(tmpo)
                                            console.log(tmpo)
                                            alert("item is added to the basket")
                                        }} />


                                        <input value="Delete items" class="btn  btn-primary btn-dark w-100" onClick={openModal} />
                                        <Modal
                                            isOpen={modalIsOpen}
                                            onAfterOpen={afterOpenModal}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Edit"
                                        >
                                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit</h2>
                                            <input value="Close" class="btn  btn-primary btn-dark w-100" onClick={closeModal} />
                                            <div>Edit</div>
                                            <form>
                                                <ReactSearchAutocomplete
                                                    items={tmp}
                                                    onSearch={handleOnSearch2}
                                                    onHover={handleOnHover2}
                                                    onSelect={handleOnSelect2}
                                                    onFocus={handleOnFocus2}
                                                    autoFocus
                                                    formatResult={formatResult2}
                                                />
                                                <input value="DELETE" class="btn  btn-primary btn-dark w-100" onClick={() => {
                                                    var i = items;
                                                    console.log(target_s.name)
                                                    i.map(function (item, index) {
                                                        console.log(item.name)
                                                        if (item.product.name === target_s.name) {
                                                            console.log("checker")
                                                            items.splice(index, 1)
                                                            settotal(total - (item.product.price * item.quantity))
                                                            alert("item deleted")
                                                        }
                                                    });

                                                    console.log(items)
                                                }} />

                                            </form>
                                        </Modal>
                                    </div>
                                    <Select
                                        value="remise"
                                        onChange={handlechange_select}
                                        options={options}
                                    />
                                    <div class="form-group last mb-3">
                                        <label >Value</label>
                                        <input type="text" class="form-control" placeholder={value.label} onChange={handle_remise} />
                                    </div>
                                    <div class="form-group last mb-3">
                                        <label >Client</label>
                                        <ReactSearchAutocomplete
                                            items={client}
                                            onSearch={handleOnSearch1}
                                            onHover={handleOnHover1}
                                            onSelect={handleOnSelect1}
                                            onFocus={handleOnFocus1}
                                            autoFocus
                                            formatResult={formatResult1}
                                        />
                                    </div>

                                    <div>

                                    </div>
                                    <div class="d-flex mb-5 align-items-center">
                                        <input value="Perform transaction" class="btn  btn-primary btn-dark w-100" onClick={() => {
                                            var b = basket;
                                            var t = total + (remise * total / 100)
                                            var id = uniqid()
                                            var res = { client: target_c, items: items, total: t, id: id };
                                            b.push(res)
                                            setbasket(b)
                                            console.log("basket: "+ b)
                                            window.ipcRenderer.send('add transaction', basket)
                                            console.log(basket)
                                            history.push({ pathname: '/generate', state: { client: target_c, items: items, total: t, basket: basket, id: id } })
                                            alert("transaction made")
                                        }} />
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div >
    )
}

export default transaction
