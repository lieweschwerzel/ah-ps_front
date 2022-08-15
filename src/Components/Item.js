import axios from 'axios'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function TrackedItem(props) {
    const url = `https://ah-ps-spring-boot.herokuapp.com` ; //`http://localhost:8080`
    const deleteitemHandler = (id) => {
        console.log(id);
        axios.delete(url+`/subs/delete/${id}`)
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
                        <img className='item-img' src={props.item.imgUrl} alt="ahimage" />
                        <a  href={props.item.productUrl} target="_blank"  rel="noreferrer" className='item-product-name'>{props.item.productName} ({props.item.unit})</a>
                        <div className='item-price'>€{props.item.price} </div>
                        <div className='item-discount'>{props.item.discount} </div>
                        <button className='item-delete' onClick={() => deleteitemHandler(props.item.id)}>X</button>
                    </div>
                </div>
            </div>
        )
    }


}

export default TrackedItem;