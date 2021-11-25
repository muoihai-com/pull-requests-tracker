/* eslint-disable no-undef */
function getData() {
  let title = '';
  let status = '';
  let nameActive = '';
  const pathname = window.location.pathname
  const updated_at = (new Date()).getDate();
  const regex = /\/.*\/.*\/pull\/[0-9]+/
  if(!regex.test(pathname)) return {nameActive}

  const titleSelector = document.querySelector("#partial-discussion-header .js-issue-title")
  if(titleSelector) title = titleSelector.innerText.trim()

  const statusSelector = document.querySelector("#partial-discussion-header span.State")
  if(statusSelector) status = statusSelector.innerText.trim()

  const nameSelector = document.querySelector("div.timeline-comment-header a.author")
  if (nameSelector) nameActive = nameSelector.innerText.trim()

  return {
    title,
    status,
    pathname,
    updated_at,
    nameActive
  }
}

window.addEventListener('focus', function() {
  chrome.runtime.sendMessage(getData())  
})

chrome.runtime.sendMessage(getData())
