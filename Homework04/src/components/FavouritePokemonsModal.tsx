import React from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';

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

  return ReactDOM.createPortal(
    <dialog open={open} onClose={closeModal}>
      <div className={`modal ${theme.name}-theme`}>
        <div className="modal-header">
          <h2>Favourite Pokémons</h2>
          <button onClick={closeModal} className="close-modal">X</button>
        </div>
        <div className="modal-container">
          <AnimatePresence mode="wait">
            {favouritePokemons.length === 0 ? (
              <motion.div
                key="emptyMessage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <p>No favourite Pokémon selected yet.</p>
              </motion.div>
            ) : (
              favouritePokemons.map((pokemon, index) => (
                <motion.div
                  key={pokemon.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                >
                  <div className="modal-pokemon-container">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`heart-icon clicked`}
                      onClick={() => removePokemon(pokemon)}
                    />
                    <img src={pokemon.shinyImage} alt={pokemon.name} /> 
                    <div className="modal-description">
                      <h2>{pokemon.name} | #{pokemon.number.toString().padStart(4, '0')}</h2>
                    </div>
                  </div>
                  {index !== favouritePokemons.length - 1 && <hr />}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default FavouritePokemonModal;
