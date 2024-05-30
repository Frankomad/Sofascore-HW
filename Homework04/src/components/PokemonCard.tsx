import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { useSettings } from '../context/ToggleSettings';
import { useFavouritePokemon } from '../context/FavouritePokemonsContext';
import { Pokemon } from '../App';

import Badge from './Badge';
import InspectImageModal from './InspectImageModal';

import '../styles/PokemonCard.css';


function PokemonCard({ name, number, type, healthPoints, height, weight, image, fullView, abilities, baseExperience, locationAreas, shinyImage, shinyFullView, flavorText }: Pokemon) {
  const { showDetails, theme } = useSettings();
  const { addFavouritePokemon, removeFavouritePokemon, isFavouritePokemon } = useFavouritePokemon();
  const [images, setImages] = useState<string[]>(isFavouritePokemon(name) ? [shinyFullView.front, shinyFullView.back] : [fullView.front, fullView.back]);
  const [modalOpen, setModalOpen] = useState(false);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  
  const truncatedLocationAreas = locationAreas.slice(0, 3);

  const handleHeartClick = () => {
    if (animationInProgress) return; 
    setAnimationInProgress(true); 
    if (!isFavouritePokemon(name)) {
      addFavouritePokemon({ name, number, type, healthPoints, height, weight, image, fullView, abilities, baseExperience, locationAreas, details: '', shinyImage, shinyFullView, flavorText });
    } else {
      removeFavouritePokemon({ name, number, type, healthPoints, height, weight, image, fullView, abilities, baseExperience, locationAreas, details: '', shinyImage, shinyFullView, flavorText });
    }
    setTimeout(() => setAnimationInProgress(false), 4100);
  };

  const toggleModal = () => {
    setImages(isFavouritePokemon(name) ? [shinyFullView.front, shinyFullView.back] : [fullView.front, fullView.back]);
    setModalOpen(modalOpen => !modalOpen);
  }

  return (
    <motion.div className={`pokemon-card-wrapper ${!showDetails ? 'short' : ''}`}
      initial={{ opacity: 0, x: (parseInt(number) % 2 === 0) ? 1000 : -1000}}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="col-1">
        <div className="col-1-1">
          <div className="col-1-1-1">
            <h1>#{number.toString().padStart(4, '0')} {name}</h1>
            <p><span className="bolded-label">Health Points:</span> {healthPoints} HP</p>
            <p><span className="bolded-label">Height:</span> {height} kg</p>
            <p><span className="bolded-label">Weight:</span> {weight} cm</p>
            <p><span className="bolded-label">Type:</span> {type.split(", ").map((t, index) => (<Badge key={index} type={t} />))}</p>
          </div>
          <div className="col-1-2-1">
            <h1>Full View:</h1>
            <span>Click to Inspect</span>
            <div className="col-1-2-1-1">
                {isFavouritePokemon(name) ? (
                  <>
                  <AnimatePresence mode="wait">
                    <motion.img
                      className="full-view-pokemon-img"
                      key={shinyFullView.front}
                      src={shinyFullView.front}
                      alt={name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, x: 0, transition: { duration: 2 } }}
                      exit={{ opacity: 0, transition: { duration: 2 } }}
                      transition={{ duration: 4 }}
                      onClick={() => toggleModal()}
                    /> 
                  </AnimatePresence>
                  
                  <AnimatePresence mode="wait">
                    <motion.img
                      className="full-view-pokemon-img"
                      key={shinyFullView.back}
                      src={shinyFullView.back}
                      alt={name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, x: 0, transition: { duration: 2 } }}
                      exit={{ opacity: 0, transition: { duration: 2 } }}
                      transition={{ duration: 4 }}
                      onClick={() => toggleModal()}
                    /> 
                  </AnimatePresence>
                  </>
                ) : (
                  <>
                  <AnimatePresence mode="wait">
                    <motion.img
                      className="full-view-pokemon-img"
                      key={fullView.front}
                      src={fullView.front}
                      alt={name}
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1, x: 0, transition: { duration: 2 } }}
                      exit={{ opacity: 0, transition: { duration: 2 } }}
                      transition={{ duration: 4 }}
                      onClick={() => toggleModal()}
                    />
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.img
                      className="full-view-pokemon-img"
                      key={fullView.back}
                      src={fullView.back}
                      alt={name}
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1, x: 0, transition: { duration: 2 } }}
                      exit={{ opacity: 0, transition: { duration: 2 } }}
                      transition={{ duration: 4 }}
                      onClick={() => toggleModal()}
                    /> 
                  </AnimatePresence>
                  </>
                )}
            </div>
          </div>
        </div>
        <div className="pokemon-details">
        <AnimatePresence mode="wait">
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1, transition: { duration: 1 }  }}
              exit={{ opacity: 0, scaleY: 0, transition: { duration: 1 } }}
            >
              <div>
                <h2>Details</h2>
                <p><span className="bolded-label">Flavor Text:</span> {flavorText.replace("", " ")}</p>
                <div>
                  <span className="bolded-label">Location Areas: </span>
                  {locationAreas.length > 0 ? (
                    <>
                      <span>
                        {truncatedLocationAreas.length > 0 ?
                          truncatedLocationAreas.map(area =>
                            area.split('-').map(word =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')
                          ).join(", ")
                          : "No location areas found"}
                        {locationAreas.length > 3 && <span>...</span>}
                      </span>
                    </>
                  ) : (
                    <span>This Pokémon is rarely seen...</span>
                  )}
                </div>
                <p><span className="bolded-label">Abilities:</span> {abilities}</p>
                <p><span className="bolded-label">Base Experience:</span> {baseExperience}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
      <div className="col-2">
        <img
          className={`heart-image ${isFavouritePokemon(name) ? 'hidden' : ''}`}
          onClick={handleHeartClick}
          src="HeartCard.png"
          alt=""
        />
        <FontAwesomeIcon
          icon={faHeart}
          className={`heart-icon clicked pulse ${!isFavouritePokemon(name) ? 'hidden' : ''} ${animationInProgress ? 'disabled' : ''}`} 
          onClick={handleHeartClick}
        />
        
          {isFavouritePokemon(name) ? (
            <AnimatePresence mode="wait">
              <motion.img
                className="pokemon-card-image"
                key={shinyImage}
                src={shinyImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 2 }  }}
                exit={{ opacity: 0, transition: { duration: 2 } }}
                transition={{ duration: 4 }}
              />
            </AnimatePresence>
          ) : (
            <AnimatePresence mode="wait">
              <motion.img
                className="pokemon-card-image"
                key={image}
                src={image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 2 }  }}
                exit={{ opacity: 0, transition: { duration: 2 } }}
                transition={{ duration: 4 }}
              />
            </AnimatePresence>
          )}
    
      </div>
      <InspectImageModal open={modalOpen} closeModal={toggleModal} theme={theme} image={images}/>
    </motion.div>
  );
};

export default PokemonCard;
