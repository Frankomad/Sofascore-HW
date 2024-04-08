import React, { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import Loader from './components/Loader';
import { useSettings } from './context/ToggleSettings'; 
import Header from './components/Header';

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

  const fetchPokemonDetails = async (url: string): Promise<Pokemon | null> => {
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
  
      const englishFlavorText = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
      const flavorText = englishFlavorText ? englishFlavorText.flavor_text : 'Flavor text not available';
  
      const locationAreasResponse = await fetch(data.location_area_encounters);
      const locationAreasData = await locationAreasResponse.json();
      const locationAreas = locationAreasData.map((area: any) => area.location_area.name);

      return {
        number: extractPokemonNumber(url),
        name: data.name,
        healthPoints: data.stats[0].base_stat,
        height: data.height * 10,
        weight: data.weight,
        type: data.types.map((type: { type: { name: string } }) => type.type.name).join(', '),
        details: data.species.url,
        fullView: {
          front: data.sprites.front_default,
          back: data.sprites.back_default,
        },
        shinyFullView: {
          front: data.sprites.front_shiny,
          back: data.sprites.back_shiny,
        },
        flavorText: flavorText,
        shinyImage: data.sprites.other['official-artwork'].front_shiny,
        image: data.sprites.other['official-artwork'].front_default,
        abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name).join(', '),
        baseExperience: data.base_experience,
        locationAreas: locationAreas,
      };
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      return null;
    }
  };

  const extractPokemonNumber = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2]; 
  };

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
