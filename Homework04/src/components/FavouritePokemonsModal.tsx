import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { useFavouritePokemon } from '../context/FavouritePokemonsContext';
import { Pokemon } from '../App';

import '../styles/FavouritePokemonsModal.css';

interface Theme {
  name: string;
  auto?: boolean;
}

interface FavouritePokemonModalProps {
  open: boolean;
  closeModal: () => void;
  theme: Theme;
  removePokemon: (pokemon: Pokemon) => void;
}

function FavouritePokemonModal({ open, closeModal, theme, removePokemon }: FavouritePokemonModalProps) {
  const { favouritePokemons } = useFavouritePokemon();
  const [pokemonsToRemove, setPokemonsToRemove] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (!open) {
      // Remove all pokemonsToRemove from the context
      pokemonsToRemove.forEach((pokemon) => {
        removePokemon(pokemon);
      });
      // Clear pokemonsToRemove list
      setPokemonsToRemove([]);
    }
    console.log('Pokemons to remove:', pokemonsToRemove)
  }, [open]);

  const toggleRemoveList = (pokemon: Pokemon) => {
    if (pokemonsToRemove.includes(pokemon)) {
      // If the pokemon is already in the remove list, remove it
      setPokemonsToRemove(pokemonsToRemove.filter((p) => p !== pokemon));
    } else {
      // If the pokemon is not in the remove list, add it
      setPokemonsToRemove([...pokemonsToRemove, pokemon]);
    }
  };

  return ReactDOM.createPortal(
    <dialog open={open} onClose={closeModal}>
      <div className={`modal ${theme.name}-theme`}>
        <div className="modal-header">
          <h2>Favourite Pokémons</h2>
          <button onClick={closeModal} className="close-modal">X</button>
        </div>
        <div className="modal-container">
          {favouritePokemons.length === 0 ? (
            <div>
              <p>No favourite Pokémon selected yet.</p>
            </div>
          ) : (
            favouritePokemons.map((pokemon, index) => (
              <div key={index} className="modal-pokemon-container">
                {pokemonsToRemove.includes(pokemon) ? (
                  <img
                    className="heart-image"
                    src="HeartCard.png"
                    alt=""
                    onClick={() => toggleRemoveList(pokemon)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="heart-icon clicked pulse"
                    onClick={() => toggleRemoveList(pokemon)}
                  />
                )}
                <img src={pokemon.shinyImage} alt={pokemon.name} />
                <div className="modal-description">
                  <h2>{pokemon.name} | #{pokemon.number.toString().padStart(4, '0')}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}

export default FavouritePokemonModal;
