import React, { useEffect, useState } from 'react';

import { useSettings } from '../context/ToggleSettings';
import { useFavouritePokemon } from '../context/FavouritePokemonsContext'; 

import Dropdown from './DropdownOptions';
import FavouritePokemonModal from './FavouritePokemonsModal'; 
import SearchPokemonModal from './SearchPokemonModal';

import '../styles/Header.css';


function Header() {
  const {theme} = useSettings()
  const { removeFavouritePokemon, addFavouritePokemon, isFavouritePokemon } = useFavouritePokemon(); 
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const scrolledPastThreshold = currentScrollPos > 20;
      setVisible(
        prevScrollPos > currentScrollPos || !scrolledPastThreshold || dropdownOpen 
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, dropdownOpen]);

  function toggleSearchModal() {
    setSearchModalOpen((prevState) => !prevState);
  }

  function toggleDropdown() {
    setDropdownOpen((prevState) => !prevState);
  }

  function toggleFavouritePokemonModal() {
    setModalOpen((prevState) => !prevState); 
  }

  return (
    <header className={visible ? 'header-visible' : 'header-hidden'}>
      <div className="content">
        <div className="content">
          <div>
            <img
              className="header-icon"
              src="Pokeball.png"
              alt=""
            />
          </div>
          <h1>POKEDOX</h1>
        </div>
        <div className="content">
          <div>
            <img
              className="header-icon search-icon"
              src="search_icon.png"
              alt=""
              onClick={toggleSearchModal} 
            />
          </div>
          <div>
            <img
              className="header-icon"
              src="Heart.png"
              alt=""
              onClick={toggleFavouritePokemonModal} 
            />
          </div>
          <div onClick={toggleDropdown} className="header-settings">
            <img
              className="header-icon"
              src="Settings.png"
              alt=""
            />
            {dropdownOpen && <Dropdown />}
          </div>
        </div>
      </div>
      <FavouritePokemonModal open={modalOpen} closeModal={toggleFavouritePokemonModal} theme={theme} removePokemon={removeFavouritePokemon}/>
      <SearchPokemonModal open={searchModalOpen} closeModal={toggleSearchModal} theme={theme} removeFavouritePokemon={removeFavouritePokemon} addFavouritePokemon={addFavouritePokemon} isFavouritePokemon={isFavouritePokemon}/>
    </header>
  );
}

export default Header;
