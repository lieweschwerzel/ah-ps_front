import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';

function SearchBar({ placeholder, data, props, mail }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        if (searchWord === "" ^ searchWord.length < 3) {
            setFilteredData([]);
        } else {
            axios.get(`https://ah-ps-spring-boot.herokuapp.com/prods/search/${searchWord}`)
                .then(res => {
                    setFilteredData(res.data)
                }) 
        };
    }

    // Post an item
    const addItemHandler = (value) => {
        if (mail !== "") {
            axios.post('https://ah-ps-spring-boot.herokuapp.com/subs/post', {
                'email': mail, 'productName': value.productName,
                'price': value.price, 'unit': value.unit, 'discount': value.discount, 'imgUrl': value.imgUrl
            })
                .then(res => {
                    console.log("added")
                    console.log(res.data)
                    data()
                    clearInput()
                }).catch((err) => {
                    console.warn("error", err.message.body);
                });
        }
        else {
            console.log("not added")
            setWordEntered("not added")
        }
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
                                <p>{value.productName} {value.price} {value.unit}<img src={value.imgUrl} alt="img" style={{ width: '8%', height: '8%' }}></img> </p>

                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;