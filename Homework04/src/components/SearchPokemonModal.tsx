import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Pokemon } from '../App';
import { fetchPokemonDetails } from '../util/FetchPokemonDetails';

import Badge from './Badge';

import '../styles/SearchPokemonModal.css';

interface Theme {
  name: string;
  auto?: boolean;
}

interface SearchPokemonModalProps {
  open: boolean;
  closeModal: () => void;
  theme: Theme;
  addFavouritePokemon: (pokemon: Pokemon) => void;
  removeFavouritePokemon: (pokemon: Pokemon) => void;
  isFavouritePokemon: (name: string) => boolean;
}

function SearchPokemonModal({ open, closeModal, theme, addFavouritePokemon, removeFavouritePokemon, isFavouritePokemon }: SearchPokemonModalProps) {
  const [query, setQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchedQuery, setSearchedQuery] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleSearch = async () => {
    try {
      setLoading(true); 
      const formattedQuery = query.toString(); 
      const data = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${formattedQuery.toLowerCase()}`);
      setSearchResult(data);
    } catch (error) {
      setSearchResult(null);
    } finally {
      setLoading(false); 
      setSearchedQuery(query);
    }
  };

  const handleFavouriteButtonClick = (pokemon: Pokemon) => {
    if (!buttonDisabled) {
      if (isFavouritePokemon(pokemon.name)) {
        removeFavouritePokemon(pokemon);
      } else {
        addFavouritePokemon(pokemon);
      }
      setButtonDisabled(true);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 4100);
    }
  };

  return ReactDOM.createPortal(
    <dialog open={open} onClose={closeModal}>
      <div className={`modal ${theme.name}-theme`}>
        <div className="search-pokemon-modal-header">
          <div className="modal-header">
            <h2>Search Pokemon</h2>
            <button onClick={closeModal} className="close-modal">X</button>
          </div>
          <div className="search-pokemon-modal-input">
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter name or number"
            />
            <button onClick={handleSearch} className="search-button search-button-margin-right" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
            {searchedQuery && searchResult && (
              <button className="search-button" onClick={() => handleFavouriteButtonClick(searchResult)} disabled={buttonDisabled}>
                {isFavouritePokemon(searchResult.name) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            )}
          </div>
        </div>
        {searchedQuery && searchResult ? (
          <div>
            <h2>{searchResult.name}</h2>
            <p><span className="bolded-label">Health Points:</span> {searchResult.healthPoints} HP</p>
            <p><span className="bolded-label">Height:</span> {searchResult.height} cm</p>
            <p><span className="bolded-label">Weight:</span>  {searchResult.weight} kg</p>
            <p><span className="bolded-label">Type:</span> {searchResult.type.split(", ").map((t, index) => (<Badge key={index} type={t} />))}</p>
            <p><span className="bolded-label">Flavor Text:</span> {searchResult.flavorText.replace("", " ")}</p>
            <p><span className="bolded-label">Abilities:</span> {searchResult.abilities}</p>
            <p><span className="bolded-label">Base Experience:</span> {searchResult.baseExperience}</p>
            <div>
              <span className="bolded-label">Location Areas: </span>
              {searchResult.locationAreas.length > 0 ? (
                <>
                  <span>
                    {searchResult.locationAreas.slice(0, 3).length > 0 ?
                      searchResult.locationAreas.slice(0, 3).map(area =>
                        area.split('-').map(word =>
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')
                      ).join(", ")
                      : "No location areas found"}
                    {searchResult.locationAreas.length > 3 && <span>...</span>}
                  </span>
                </>
              ) : (
                <span>This Pokémon is rarely seen...</span>
              )}
            </div>
            <div className="search-modal-image-container">
              
                {!isFavouritePokemon(searchResult.name) ? (
                    <>
                    <AnimatePresence mode="wait">
                    <motion.img src={searchResult.image} alt={searchResult.name} className="search-modal-image"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1, x: 0, transition: { duration: 3 }  }}
                                  exit={{ opacity: 0, transition: { duration: 3 } }}/>
                    <div className="search-modal-image-small-container">
                        <motion.img src={searchResult.fullView.front} alt="" className="search-modal-image-small" 
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1, x: 0, transition: { duration: 3 }  }}
                                      exit={{ opacity: 0, transition: { duration: 3 } }}/>
                        <motion.img src={searchResult.fullView.back} alt="" className="search-modal-image-small"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1, x: 0, transition: { duration: 3 }  }}
                                      exit={{ opacity: 0, transition: { duration: 3 } }}/>
                    </div>
                    </AnimatePresence>
                    </>
                ) : (
                    <>
                    <motion.img src={searchResult.shinyImage} alt={searchResult.name} className="search-modal-image"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1, x: 0, transition: { duration: 3 }  }}
                                  exit={{ opacity: 0, transition: { duration: 3 } }}/>
                    <div className="search-modal-image-small-container">
                        <motion.img src={searchResult.shinyFullView.front} alt="" className="search-modal-image-small"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1, x: 0, transition: { duration: 3 }  }}
                                      exit={{ opacity: 0, transition: { duration: 3 } }}/>
                        <motion.img src={searchResult.shinyFullView.back} alt="" className="search-modal-image-small"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1, x: 0, transition: { duration: 3 }  }}
                                      exit={{ opacity: 0, transition: { duration: 3 } }}/>
                    </div>
                    </>
                )}
              
            </div>
          </div>
        ) : searchedQuery ? (
          <p>No Pokémon found for "{searchedQuery}".</p>
        ) : null}
      </div>
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}

export default SearchPokemonModal;
