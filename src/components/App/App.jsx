import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
// shorthand is import { useState, useEffect } from 'react'

function App() {

  // will fetch creatures from server and will set value of creatureListFetch to the axios response
  const fetchCreature = () => {
    console.log('inside of fetchCreature()')
    axios.get('/creature')
    .then((response) => {
      console.log("response data", response.data)
      setCreatureList(response.data)
    })
    .catch((error) => {
      console.log("Error GET /creature", error)
    })
  }

  const [creatureList, setCreatureList] = useState([]);
  // note: needs to be an empty array to start since we're using .map (array method) below and it only works with arrays.  Alternatively can use a question mark ? right after creatureList - creatureList?.map(etc).  This works by not having this line run if the method doesn't work correctly.  The only issue is it doesn't work in every scenario

  // state for name
  const [newCreatureName, setNewCreatureName] = useState('');

  // state for origin
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');

  useEffect(() => {
    // recursive function - when a function is run within another function
    fetchCreature()
  }, [])

  const addCreature = (event) => {
    event.preventDefault();
    console.group()
    console.log("inside of addCreature()")
    console.log("new name:", newCreatureName)
    console.log("new origin:", newCreatureOrigin)
    console.groupEnd()
  }

  // POST request
  axios({
    method: 'POST',
    url: '/creature',
    data: {
      name: newCreatureName,
      origin: newCreatureOrigin
    }
    // short-hand
    // axios.post({name: newCreatureName, origin: newCreatureOrigin}

    // we can see we need these two properties because we looked at the server side and it seems the req.body only uses the req.body.name and req.body.origin as properties
  }).then((response) => {
    console.log(response)
    // fetchCreature()
  }).catch((error) => {
    console.log("error POST /creature")
  })

  return (
    <div>
      <h2>Add Creature</h2>
      <form onSubmit={addCreature}>

        <label>Name:</label>
        <input id='name' onChange={(event) => { setNewCreatureName(event.target.value) }}></input>

        <label>Origin:</label>
        <input id='origin' onChange={(event) => { setNewCreatureOrigin(event.target.value) }} />

        <button type='submit'>Add New Creature</button>
      </form>
      <ul>
        {creatureList.map(creature => (
          <li key={creature.id}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
