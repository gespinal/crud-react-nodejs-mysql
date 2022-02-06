import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'; 

function App() {

  const [item, setItem] = useState("");
  const [itemU, setItemU] = useState("");
  const [itemList, setItemList] = useState([]);

  useEffect(()=> {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setItemList(response.data);
      console.log(response.data);
    });
  }, []);

  const getItems = () => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setItemList(response.data);
    });
  };

  const createItem = () => {
    Axios.post("http://localhost:3001/api/insert", {
      item: item,
    }).then((response) => {
      setItemList([
        ...itemList,
        {
          id: response.data.insertId,
          item: item,
        },
      ]);
    });
  };

  const updateItem = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      id: id,
      itemU: itemU,
      }).then((response) => {
        setItemList(
          itemList.map((val) => {
            return val.id == id
            ? {
              id: val.id,
              item: itemU,
            }
            : val;
          })
        );
    });
    setItemU("");
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`).then((response) => {
      setItemList(
        itemList.filter((val) => {
          return val.id != id;
        })
      );
    });
  }

  return (
    <div className="App">
      <div class="four">
      <h1><span>My</span> CRUD <em>App</em></h1>
      </div>
      <div className="form">
        <label>Item:</label>
        <input type="text" name="item" onChange={(e)=> {
          setItem(e.target.value);
        }}
        />
        <button class="button-smt" onClick={createItem}>Submit</button>
        {itemList.map((val, key) => {
          return (
            <div className="items">
            <p className="itemsT">{val.item}</p>
            <input type="text" name="itemU" onChange={(e)=> {
              setItemU(e.target.value);
            }}
            />
            <button class="button-upd" onClick={() => {updateItem(val.id)}}>Update</button>
            <button class="button-del" onClick={() => {deleteItem(val.id)}}>Delete</button>
            </div>
          ) 
        })}
      </div>
    </div>
  );
}

export default App;
