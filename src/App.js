import React, { useState, useEffect } from 'react';
import "./App.css";
import SearchBar from "./Components/SearchBar";
import ItemView from './Components/ItemListView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ItemList, setItemList] = useState([{}])
  const [mail, setMail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(false)
  const url = `https://ah-ps-spring-boot.herokuapp.com}`; //`http://localhost:8080`

  // Read all items by mail axios.get(`https://price-tracker-back.herokuapp.com/api/item/${mail}`)
  useEffect(() => {
    document.title = "AH Price Tracker"
    if (mail !== '') {
      axios.get(url+`/subs/email/${mail}`)
        .then(res => {
          setItemList(res.data.reverse())
          console.log(res.data)
        })
    }
  }, [mail, msg]);


  const changeMessage = () => { msg ? setMsg(false) : setMsg(true) }

  return (
    <div className="App">
      <div className='left-content'>
        <span className="input-email-span">
          <label>Create or edit your watchlist </label>
          <input className="input-email" onChange={event => setMail(event.target.value)} placeholder='your email address' required />
          <p>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            Never miss an offer at ah.nl.
            <br></br> <br></br>
            When a product on your list is <br></br>
            on offer, we'll notify you by email.
          </p>
        </span>
      </div>
      <div className='main-content'>
        <SearchBar className='search-bar' placeholder="Search and add products to your bonus watchlist..." data={changeMessage} mail={mail} />

        {(mail.length > 0) && (
          <div className="item-list-view">
            <ItemView refresh={changeMessage} ItemList={ItemList} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;