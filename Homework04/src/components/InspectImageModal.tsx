import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/FavouritePokemonsModal.css';

interface Theme {
  name: string;
  auto?: boolean;
}

interface InspectImageModalProps {
  open: boolean;
  closeModal: () => void;
  theme: Theme;
  image: string[];
}

function InspectImageModal({ open, closeModal, theme, image }: InspectImageModalProps) {

  return ReactDOM.createPortal(
    <dialog open={open} onClose={closeModal}>
        <div className={`modal ${theme.name}-theme`}>
        <div className="modal-header">
          <h2>Take a Closer Look!</h2>
          <button onClick={closeModal} className="close-modal">X</button>
        </div>
          <div className="inspect-image-modal-image-container">
          {image.map((imageUrl, index) => (
              <img className="image-inspect" key={index} src={imageUrl} alt="pokemon" />
          ))}
          </div>
        </div>
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default InspectImageModal
