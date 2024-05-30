import React, { useState, useEffect } from 'react';

import { useSettings } from './context/ToggleSettings'; 
import { fetchPokemonDetails } from './util/FetchPokemonDetails';

import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import Loader from './components/Loader';

import './App.css';

export interface Pokemon {
  name: string;
  number: string;
  type: string;
  healthPoints: number;
  height: number;
  weight: number;
  details: string;
  fullView: {
    front: string;
    back: string;
  };
  shinyFullView: {
    front: string;
    back: string;
  }
  flavorText: string;
  shinyImage: string;
  image: string;
  abilities: string;
  baseExperience: number;
  locationAreas: string[]; 
}

function App() {
  const { theme } = useSettings();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPokemonData('https://pokeapi.co/api/v2/pokemon');
  }, []);

  const fetchPokemonData = async (url: string) => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const updatedPokemonList = await Promise.all(data.results.map(async (pokemon: { name: string; url: string }) => {
      const pokemonDetails = await fetchPokemonDetails(pokemon.url);
      return {
        ...pokemonDetails,
        url: pokemon.url,
      };
    }));

    setPokemonList(prevList => [...prevList, ...updatedPokemonList]);
    setNextPageUrl(data.next);
    setLoading(false);
  };

  const handleScroll = () => {
    const distanceToBottom = window.innerHeight + window.scrollY;
  
    const totalHeight = document.documentElement.offsetHeight;
  
    if (distanceToBottom >= totalHeight - 2) {
      if (nextPageUrl && !loading) {
        fetchPokemonData(nextPageUrl);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [nextPageUrl, loading]);

  function setBodyBackgroundColor(themeName: string) {
    const body = document.body;
    switch (themeName) {
      case 'dark':
        body.style.backgroundColor = 'var(--background-color-col-1-dark)';
        break;
      case 'light':
        body.style.backgroundColor = 'var(--background-color-col-1-light)';
        break;
      default:
        body.style.backgroundColor = '#fff';
    }
  }
  
  useEffect(() => {
    setBodyBackgroundColor(theme.name);
  }, [theme.name]);

  return (
    <>
      <div className={`theme-${theme.name}`}>
        <Header />
          {pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} {...pokemon}/>
          ))}
        {loading && <Loader />}
      </div>
    </>
  );
}

export default App;
