import { Pokemon } from '../App';

export const fetchPokemonDetails = async (url: string): Promise<Pokemon | null> => {
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