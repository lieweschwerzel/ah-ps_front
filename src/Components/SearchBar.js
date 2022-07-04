import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';

function SearchBar({ placeholder, data, props, mail }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    console.log(mail)
   
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
   
        if (searchWord === "" ^ searchWord.length < 3) {
            console.log("empty or less than 4 chars")
            setFilteredData([]);
        } else {
            axios.get(`http://localhost:8000/search/${searchWord}`)
                .then(res => {
                    setFilteredData(res.data)
                })
        };
    }
    
    // Post an item
    const addItemHandler = (value) => {        
        axios.post('http://localhost:8000/post', { 'email': mail, 'product_name': value.product_name, 'price': value.price, 'discount': value.discount, 'unit': value.unit,  'img_url': value.img_url })
            .then(res => {
                console.log("added")
               // console.log(res.data)
                data()
                clearInput()
            }).catch((err) => {
                console.warn("error", err.message.body);
              });
    }

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                        <SearchIcon />
                    ) : (
                        <CloseIcon id="clearBtn" onClick={clearInput} />
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <a className="dataItem" onClick={() => addItemHandler(value)}>
                                <p>{value.product_name} {value.price} {value.unit}<img src={value.img_url} alt="img" style={{ width: '8%', height: '8%' }}></img> </p>
                                
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;