import React, { useState, useEffect } from 'react';
import "./App.css";
import SearchBar from "./Components/SearchBar";
import ItemView from './Components/ItemListView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ItemList, setItemList] = useState([{}])
  const [mail, setMail] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(false)
  const url = `https://ah-ps-spring-boot.herokuapp.com`; //`http://localhost:8080`

  // Read all items by mail axios.get(`https://price-tracker-back.herokuapp.com/api/item/${mail}`)
  useEffect(() => {
    document.title = "AHA Bonus NIET gemist"
    if (mail !== '') {
      axios.get(url + `/subs/email/${mail}`)
        .then(res => {
          setItemList(res.data.reverse())
          console.log(res.data)
        })
    }
  }, [mail, msg]);

  useEffect(() => {
    axios.get(url + `/prods/search/datum`)
      .then(res => {
        setDate(res.data)
        const l = date.length-1
        console.log(date[0])
      })
  }, []);



  const changeMessage = () => { msg ? setMsg(false) : setMsg(true) }

  return (
    <div className="App">

      <div className='left-content'>
        <div className='top'><h1>AHA <h1> BONUS</h1> NIET GEMIST</h1></div>

        <span className="input-email-span">
          <label>Create or edit your watchlist </label>
          <input className="input-email" onChange={event => setMail(event.target.value.toLowerCase())} placeholder='your email address' required />
          <p>
            Never miss an offer at ah.nl.
            <br></br> <br></br>
            When a product on your list is
            on offer, we'll notify you by email.
          </p>


        </span>
      </div>
      <div className="datum">


      </div>
      <div className='main-content'>
        <SearchBar className='search-bar' placeholder="Search and add products..." data={changeMessage} mail={mail} />

        {(mail.length > 0) && (
          <div className="item-list-view">
            <ItemView refresh={changeMessage} ItemList={ItemList} />

          </div>
        )}
        <div className='footer-wrapper'>
          <div className='date'>
            {date.length !== 0 ? (
              <p>db last updated: {date[0].unit}</p>
            ) : (
              <p>db last updated:</p>
              
            )
            }
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;