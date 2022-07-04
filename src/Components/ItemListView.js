import React from 'react'
import TrackedItem from './Item'


export default function ItemView(props) {
    
    return (
        <div >
            <ul>
                {props.ItemList.map(item => <TrackedItem item={item} mail={props.mail} refresh={props.refresh}/>)}
            </ul>
        </div>
    )
}