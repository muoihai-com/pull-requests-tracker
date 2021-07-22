/* eslint-disable no-undef */
import { store } from '../utils'

const saveData = async (message) => {
  const storeData = await store.get()
  const name = storeData.name;
  const nameActive = message.nameActive;
  if (name === '' || nameActive === '') return
  if (nameActive.toLowerCase() !== name.toLowerCase()) return

  const title = message.title;
  const status = message.status;
  const pathname = message.pathname
  const updated_at = message.updated_at;

  if(title.trim() === '') return;
  if(status.trim() === '') return;

  const newItem = {
    title,
    status,
    pathname,
    updated_at
  }

  if(!storeData.list) storeData.list = []
  const existItemIndex = storeData.list.findIndex(item => item.pathname === pathname)

  if(existItemIndex === -1) {
    storeData.list.push(newItem)
  } else {
    storeData.list.splice(existItemIndex, 1, newItem)
  }

  store.set(storeData)
}

chrome.runtime.onMessage.addListener(function(message) {
  saveData(message)
})
