import React from 'react'
import TrackedItem from './Item'


export default function ItemView(props) {

    console.log("pop"+props.ItemList.length)
    return (

        <div className='item-parent' >
            {(props.ItemList.length > 0) && (
                <ul>
                {props.ItemList.map((item, key) => <TrackedItem item={item} mail={props.mail} refresh={props.refresh} />)}
            </ul>
            )}
            
        </div>
    )
}