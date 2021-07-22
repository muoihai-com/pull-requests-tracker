/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import LogoGithub from './components/LogoGithub';

import { store } from './utils'

function App() {
  const [name, setName] = useState('')
  const [data, setData] = useState([])

  const removeItem = async () => {
    const storeData = await store.get()
    if(!storeData) return
    if(storeData.name && storeData.name.trim() !== '') setName(storeData.name)

    if (!storeData.list) return
    if (storeData.list.length === 0) return

    storeData.list = storeData.list.filter(item => item.updated_at === (new Date()).getDate() || item.status === 'Open')
    
    setData([...storeData.list])
    store.set(storeData)
  }

  useEffect(() => {
    removeItem()
  }, [])

  const changeName = (e) => {
    const name = e.target.value;
    setName(name.trim())
  }

  const saveName = async () => {
    if (name.trim() === '') return

    const storeData = await store.get() || {}
    storeData.name = name

    store.set(storeData)
  }

  const clear = () => {
    store.clear()
    setName('')
    setData([])
  }

  return (
    <div className="App">
      <div className="header">
        <div className="flex">
          <LogoGithub/>
          <h3 className="ml-1">
            Pull Requests Tracker
          </h3>
        </div>
        <div>
          <input type="name" placeholder="Name to track" className="input" value={name} onChange={changeName}></input>
          <button className="ml-1 btn btn-primary" onClick={saveName}>Save</button>
          <button className="ml-1 btn btn-sub" onClick={clear}>ClearAll</button>
        </div>
      </div>
      <div className="list">
        {data.map(item => {
          return <div className="flex item">
            <div className="status">
              {item.status}
            </div>
            <div className="title">
              {item.title}
            </div>
            <div className="flex tool">
              <a href={`https://github.com${item.pathname}`} target="_blank" rel="noreferrer"><button className="btn btn-sub">Open in new tab</button></a>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
