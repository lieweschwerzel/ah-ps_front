import axios from 'axios'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function TrackedItem(props) {
    const deleteitemHandler = (id) => {
        axios.delete(`http://localhost:8080/subs/delete/${id}`)
            .then(res => {
                console.log("Clicked from Grandchild  " + res.data);
                //call refresh in app.js to refresh page on msg to true or false
                props.refresh();
            })
    }

    if (!props.item.email) {
        return (
            <div>
                <p>
                    <span>
                    </span>
                </p>
            </div>
        )
    }
    else {
        return (
            
            <div><br></br>
                <div>
                    <div className='item-wrapper'>
                        <img className='item-img' src={props.item.img_url} alt="ahimage" />
                        <div className='item-product-name'>{props.item.product_name} ({props.item.unit})</div>
                        <div className='item-price'>{props.item.price} </div>
                        <div className='item-discount'>{props.item.discount} </div>
                        <button className='item-delete' onClick={() => deleteitemHandler(props.item.id)}>X</button>
                    </div>
                </div>
            </div>
        )
    }


}

export default TrackedItem;