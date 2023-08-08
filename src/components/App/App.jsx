import {useState} from 'react';

function App () {
 
  const [creatureList, setCreatureList] = useState([
    {name :'Unicorn', origin: 'Britain'},
    {name : 'Sphinx', origin: 'Egypt'},
    {name: 'Jackalope', origin: 'America'}
  ]);
  
  return (
    <div>
      <ul>
        {creatureList.map(creature => (
          <li key={creature.name}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
