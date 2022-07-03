import axios from 'axios'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function TrackedItem(props) {
    
    const deleteitemHandler = (email, product_name) => {
        axios.delete(`http://localhost:8000/subs/${email}/${product_name}`)
            .then(res => {
                console.log("Clicked from Grandchild  " + res.data);
                props.refresh();
            })
    }

    if (!props.item.email ) {
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
                   <button onClick={() => deleteitemHandler(props.item.email, props.item.product_name)} className="btn btn-outline-danger my-2 mx-2" style={{ borderRadius: '15px'}}>X</button>
                    <span style={{ fontWeight: 'bold, underline' , flex: 1, flexDirection: 'row'}}>
                        <img src={props.item.img_url} alt="ahimage" style={{width: '100px', height: '50%'}}/>
                       
                    {props.item.product_name}: €</span>{props.item.email}
                    
                </p>
            </div>
        )
    }


}

export default TrackedItem;