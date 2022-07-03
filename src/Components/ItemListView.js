import React from 'react'
import TrackedItem from './Item'


export default function ItemView(props) {
    return (
        <div >
            <ul>
                {props.ItemList.map(item => <TrackedItem item={item} test={props.test}/>)}
            </ul>
        </div>
    )
}