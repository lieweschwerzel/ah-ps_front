import React, { useState, useEffect } from 'react';
import "./App.css";
import SearchBar from "./Components/SearchBar";
import ItemView from './Components/ItemListView';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ItemList, setItemList] = useState([{}])
  const [mail, setMail] = useState('')
  const [tmpmail, setTmpMail] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(false)
  const url = `https://ah-ps-spring-boot.herokuapp.com`; //`http://localhost:8080`

  // Read all items by mail axios.get(`https://price-tracker-back.herokuapp.com/api/item/${mail}`)
  useEffect(() => {
    if (mail !== '') {
      axios.get(url + `/subs/email/${mail}`)
        .then(res => {
          setItemList(res.data.reverse())
          console.log(res.data)
        })
    }
  }, [msg]);

  useEffect(() => {
    axios.get(url + `/prods/search/datum`)
      .then(res => {
        setDate(res.data)
        const l = date.length - 1
        console.log(date[0])
      })
  }, []);

  const handleSubmit = (e) => {
    setMail(tmpmail)
    msg ? setMsg(false) : setMsg(true)
    setItemList([])
    e.preventDefault();

    console.log(`Form submitted, ${mail}`);

  }



  const changeMessage = () => { msg ? setMsg(false) : setMsg(true) }

  return (
    <div className="App">

      <div className='left-content'>
        <div className='top'><h1>AHA <h1> BONUS</h1> NIET GEMIST</h1></div>
          <p className='slogan'>Never miss an offer at ah.nl.</p>
          <br></br> <br></br>
      </div>

      <div className='main-content'>
        {(mail.length < 1) && (
          <div className='input-email-wrapper'>
            <form onSubmit={handleSubmit}>
              <p for="email" ></p>
              <input type="email" id="email" name="email" onChange={(e) => setTmpMail(e.target.value)} placeholder="Enter your email"></input>
              <button type='submit'>Login</button>
            </form>
          </div>
        )}
        {(mail.length > 0) && (
          <div className='logged-in-wrapper'>
            <p>{mail}</p>
            <button onClick={(e) => setMail('')&setTmpMail('')}>X</button>
          </div>
        )}
        <SearchBar className='search-bar' placeholder="Search and add products..." data={changeMessage} mail={mail} />
        {(mail.length > 0) && (
          <div className="item-list-view">
            <ItemView refresh={changeMessage} ItemList={ItemList} />
          </div>
        )}
        <div className='footer-wrapper'>
          <div className='date'>
            {date.length !== 0 ? (
              <p>db updated: {date[0].unit}</p>
            ) : (
              <p>db updated:</p>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;