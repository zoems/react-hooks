// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage

  // the initial name value is defined every time it is rendered ( as Greeting is called when re/rendered) but the function is only called on the first render

  const [name, setName] = React.useState(() =>  window.localStorage.getItem('name') || initialName ) // here we call the initial name to define the initial state

  // 🐨 Here's where you'll use `React.useEffect`. // gets called anytime function is re/rendered
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
