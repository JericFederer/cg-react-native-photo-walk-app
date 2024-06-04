import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList';
import { fetchPlaces } from '@/util/database';

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const allPlacesList = await fetchPlaces();
      setLoadedPlaces(allPlacesList);
    }

    if (isFocused) {
      loadPlaces()
    }
  }, [isFocused]);

  //   if (isFocused && route.params) {
  //     setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
  //   }
  // }, [isFocused, route]);

  return <PlacesList places={ loadedPlaces } />;
}

export default AllPlaces;
