// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
  fetchPokemon,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)


  React.useEffect(() => {
    console.log('effect')
    if (!pokemonName) {
      return
    }

    setPokemon(null)
    console.log({pokemonName})
    console.log(pokemonName)
    fetchPokemon(pokemonName).then(pokemonData => {
      console.log('fetching')
      setPokemon(pokemonData)
    })
    .catch((error) => setError(error))

    return () => {
      //cleanup
    }
  }, [pokemonName])

  if (error) {
    console.log('error')
    return(
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>)

  }

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).

  return !pokemonName ? (
    'Submit a pokemon'
  ) : !pokemon ? (
    <PokemonInfoFallback name={pokemonName} />
  ) : (
    <PokemonDataView pokemon={pokemon} />
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
