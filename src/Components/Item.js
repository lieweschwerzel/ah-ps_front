import axios from 'axios'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function TrackedItem(props) {
    const url = `http://192.168.1.100:8088` ; //`http://localhost:8080`
    console.log(props.mail)
    const deleteitemHandler = (id) => {        
        console.log(id);
        axios.delete(url+`/subs/delete/${id}`)
            .then(res => {
                console.log("Clicked from Grandchild  " + res.data);
                //call refresh in app.js to refresh page on msg to true or false
                props.refresh();
            })
    }

    if (!props.mail) {
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
                        <a href={"https://www.ah.nl" + props.item.productUrl} target="_blank"  rel="noreferrer" className='item-product-name'>{props.item.productName}
                        <span className='item-unit'> &nbsp;({props.item.unit})</span>
                        </a>                        
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