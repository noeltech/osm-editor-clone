import React, { createContext, useState, useContext, useCallback } from 'react'

const StateContext = createContext()
const StateUpdaterContext = createContext()

function ContextProvider({ children }) {
  const [state, setState] = useState('')

  const handleSetState = useCallback((item) => {
    setState(item)
  }, [])
  return (
    <StateContext.Provider value={state}>
      <StateUpdaterContext.Provider value={handleSetState}>
        {children}
      </StateUpdaterContext.Provider>
    </StateContext.Provider>
  )
}

function ComponentOnlyUsingState() {
  const state = useContext(StateContext)
  console.log('state renders')
  // Use the state value
  return <div>{state.value}</div>
}

function ComponentOnlyUsingSetState() {
  const setState = useContext(StateUpdaterContext)
  console.log('action renders')
  // Use the setState function
  const handleClick = () => {
    setState({ value: 'updated value' })
  }

  return <button onClick={handleClick}>Update State</button>
}

function ContextAPITest() {
  return (
    <ContextProvider>
      <ComponentOnlyUsingState />
      <ComponentOnlyUsingSetState />
    </ContextProvider>
  )
}

export default ContextAPITest
