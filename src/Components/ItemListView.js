import React from 'react'
import TrackedItem from './Item'


export default function ItemView(props) {
    console.log("pop"+Array.isArray(props.ItemList) && props.ItemList.lenght)
    return (

        <div  >
            {(Array.isArray(props.ItemList)) && (
                <ul>
                {props.ItemList.map((item, key) => <TrackedItem item={item} mail={props.mail} refresh={props.refresh} />)}
            </ul>
            )}
            
        </div>
    )
}