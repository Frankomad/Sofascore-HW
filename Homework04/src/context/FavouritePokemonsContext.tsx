import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Pokemon } from '../App';

interface FavouritePokemonContextType {
  favouritePokemons: Pokemon[];
  addFavouritePokemon: (pokemon: Pokemon) => void;
  removeFavouritePokemon: (pokemon: Pokemon) => void;
  isFavouritePokemon: (pokemon: string) => boolean;
}

const FavouritePokemonContext = createContext<FavouritePokemonContextType | undefined>(undefined);

export const useFavouritePokemon = (): FavouritePokemonContextType => {
  const context = useContext(FavouritePokemonContext);
  if (!context) {
    throw new Error('useFavouritePokemon must be used within a FavouritePokemonProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const FavouritePokemonProvider = ({ children }: Props) => {
  const [favouritePokemons, setFavouritePokemons] = useState<Pokemon[]>(() => {
    const storedPokemons = localStorage.getItem('favouritePokemons');
    return storedPokemons ? JSON.parse(storedPokemons) : [];
  });

  const addFavouritePokemon = (pokemon: Pokemon) => {
    setFavouritePokemons((prevFavourites) => [...prevFavourites, pokemon]);
  };

  const removeFavouritePokemon = (pokemon: Pokemon) => {
    setFavouritePokemons((prevFavourites) =>
      prevFavourites.filter((favPokemon) => favPokemon.name !== pokemon.name)
    );
  };

  const isFavouritePokemon = (name: string) => {
    return favouritePokemons.some((favPokemon) => favPokemon.name === name);
  };

  useEffect(() => {
    localStorage.setItem('favouritePokemons', JSON.stringify(favouritePokemons));
  }, [favouritePokemons]);

  return (
    <FavouritePokemonContext.Provider
      value={{ favouritePokemons, addFavouritePokemon, removeFavouritePokemon, isFavouritePokemon }}
    >
      {children}
    </FavouritePokemonContext.Provider>
  );
};
