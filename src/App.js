import React, { useState, useEffect } from 'react';
import "./App.css";
import SearchBar from "./Components/SearchBar";
import BookData from "./Data.json";
import ItemView from './Components/ItemListView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ItemList, setItemList] = useState([{}])
  const [mail, setMail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(false)

  // Read all items by mail axios.get(`https://price-tracker-back.herokuapp.com/api/item/${mail}`)
  useEffect(() => {
    document.title = "AH Price Tracker"
    if (mail !== '') {
      axios.get(`http://localhost:8000/subs/${mail}`)
        .then(res => {
          setItemList(res.data)
          console.log(res.data)
        })
    }
  }, [mail, msg]);


  const changeMessage = () => { msg ? setMsg(false) : setMsg(true) }

  return (
    <div className="App">
      <span className="input-email-span">
        <p>Receive an update when bonus is available</p>
        <label></label>
        <input className="input-email" onChange={event => setMail(event.target.value)} placeholder='Email' required />
      </span>

      <SearchBar placeholder="Search and add products to your bonus watchlist..." data={changeMessage} mail={mail} />

      {(mail.length > 0) && (
        <div className="item-list-view">
          <ItemView refresh={changeMessage} ItemList={ItemList} />
        </div>
      )}

    </div>
  );
}

export default App;