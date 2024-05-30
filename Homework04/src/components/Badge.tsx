import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Badge.css'; 

interface PokemonTypeBadgeProps {
  type: string;
}

function PokemonTypeBadge({ type }: PokemonTypeBadgeProps) {
  const typeColors: {[key: string]: string} = {
    fairy: '#F0B6BC',
    steel: '#B8B8D0',
    ghost: '#705898',
    psychic: '#F85888',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    fighting: '#C03028',
    ice: '#98D8D8',
    electric: '#F8D030',
    grass: '#78C850',
    water: '#6890F0',
    fire: '#F08030',
    normal: '#A8A878',
    bug: '#A8B820',
    rock: '#636363',
  };

  const color = typeColors[type.toLowerCase()] || 'black';

  return (
    <div
      className="type-badge" 
      style={{
        backgroundColor: color,
      }}
    >
      {type}
    </div>
  );
};

PokemonTypeBadge.propTypes = {
  type: PropTypes.string.isRequired
};

export default PokemonTypeBadge;
