import React, { useEffect, useState } from 'react';

import { useSettings } from '../context/ToggleSettings';
import { useFavouritePokemon } from '../context/FavouritePokemonsContext'; 

import Dropdown from './DropdownOptions';
import FavouritePokemonModal from './FavouritePokemonsModal'; 

import '../styles/Header.css';


function Header() {
  const {theme} = useSettings()
  const { removeFavouritePokemon } = useFavouritePokemon(); 
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  function toggleDropdown() {
    setDropdownOpen((prevState) => !prevState);
  }

  function toggleModal() {
    setModalOpen((prevState) => !prevState); 
  }

  return (
    <header className={visible ? 'header-visible' : 'header-hidden'}>
      <div className="content">
        <div className="content">
          <div>
            <img
              className="header-icon"
              src="https://s3-alpha-sig.figma.com/img/7bb1/5637/2fe6c12a7e12d1502374fdda5f883956?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZFdd-SsArAVcGIDsPu~b8ec9PFQqN2tIvgJ3dR-QSXg-BOi1kjIrEKwHWAgNk7QJsb~wTbgshNNb-VBtvaTgrJqIBERigh3SAhM5naeRs6MylxCPaWQBqFF3cLqmaOPMi4O6RNyVdVsAjYn2~1DsnySlGIxhEILiHxDSdaiz49odqoukoUBBC8fbVoUV53ZTSjK7hQIrFVeurMa8GIYJyvrUOXBsSrfbg6FrrM4WQwBaPX7Xbq~S2I~YaMHjq0kgXwXZsRXKnLuWqs7zUApYsn7wiJTXhOatZxMqEj4Ls~hk3IV3LxpfrSKSnM4Lgp0zFgduM2-EZlK7d3AAq-SMsQ__"
              alt=""
            />
          </div>
          <h1>POKEDOX</h1>
        </div>
        <div className="content">
          <div>
            <img
              className="header-icon"
              src="https://s3-alpha-sig.figma.com/img/ec5b/a1e6/2c298ac7bf9533cb7ae87f58512f6ccc?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LOWGvBmaNfGFADL8gOd1rH4SB2wcyDFKfyrfUhWixv-67JwuuHXX11~~vYfhKsNdYNohvkfW9pvf1GaMXk96UX7jh63XMk17OP-EUFFxKlFNmL2F-tA2meEPSreBZmcGUiKcJ6XmGPmTtgvs9xXa4gyIOHXb5ve46MyIarfwhrvU~QMk7SF6326Q7tXpcXJqZRqkO3WKfqRqD-UHZtQaXNsj4ftdFLgGq~OuVbG6mln5trfdRZd48XAdkEh5HuWX5UZQRrAaKn-K5ZzgUTQBn7q6OvhKB3O4A99hcYKAd9olo~NG8xs4uTnzQLgE1FEyxrlxBDe-GIkGozNvH2Iisw__"
              alt=""
              onClick={toggleModal} 
            />
          </div>
          <div onClick={toggleDropdown} className="header-settings">
            <img
              className="header-icon"
              src="https://s3-alpha-sig.figma.com/img/e0b1/5d31/8fa9b5b8a3566fea93d076c0ad40d7d7?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JIW5~M1DdbH~Y7uufTLSayr0~GyDI7t6UPtQOVFeD7i3kDz6diwTjzbVPMIjMEZn4VULp3bt0dqVzPRnSBdGHMZEXnho98aqWJbpePaQMcKakOBqKIjSs-xLOukg5S5Cxxzw0I2FoNs4Sf9NgoGQr8EsBfjSQGi28Q79qkJDYzn60ll7rpn1WqoREgIbdRH4iWKis3ruKpHghs7do9Ezf9p9DeTA5coPLdaOPKdnRSgGxkd2rqFYKQRtq9J3tl9jo57hR0U~n-ChdXr7o5wp~fMXjv~pvlp1LLFhqx5hswSkFxGxii7fLyBFYGuOcsta~6CLQCgyyNa33jiXkvLgMw__"
              alt=""
            />
            {dropdownOpen && <Dropdown />}
          </div>
        </div>
      </div>
      <FavouritePokemonModal open={modalOpen} closeModal={toggleModal} theme={theme} removePokemon={removeFavouritePokemon}/>
    </header>
  );
}

export default Header;
