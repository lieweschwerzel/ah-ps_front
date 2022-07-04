import axios from 'axios'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function TrackedItem(props) {
    const deleteitemHandler = (email, product_name) => {
        axios.delete(`http://localhost:8000/subs/${email}/${product_name}`)
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
            <div>
                <p>
                    <button onClick={() => deleteitemHandler(props.item.email, props.item.product_name)} style={{ border: 'none', backgroundColor: 'white' }}>X</button>
                    <span style={{ fontWeight: 'bold, underline', flex: 1, flexDirection: 'row' }}>
                        <img src={props.item.img_url} alt="ahimage" style={{ height: '25px' }} />
                        {props.item.product_name} ({props.item.unit}):    €{props.item.price} {props.item.discount}
                    </span>
                </p>
            </div>
        )
    }


}

export default TrackedItem;