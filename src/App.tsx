import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import LocationsPicker from "./LocationsPicker/LocationsPicker";
import SearchActivity from "./SearchActivity/SearchActivity";
import { useNearbySearch } from "./hooks/useNearbySearch";
import Results from "./Results/Results";
import MainAppLayout from "./layouts/MainAppLayout";

const loader = new Loader({
  apiKey: import.meta.env.VITE_REACT_GOOGLE_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const initializeService = (mapDiv: HTMLDivElement) => {
    setPlacesService(new google.maps.places.PlacesService(mapDiv));
  };

  const {
    locations,
    location,
    setLocation,
    keyword,
    searchedForKeyWord,
    results,
    status,
    passedValidation,
    setKeyword,
    searchNearby,
  } = useNearbySearch({
    placesService,
  });

  const onLoadFailed = (error: any) => {
    console.error(error);
  };

  useEffect(() => {
    const initLoader = async () => {
      try {
        await loader.load();
        if (mapRef.current) initializeService(mapRef.current);
      } catch (error) {
        onLoadFailed(error);
      }
    };
    initLoader();
  }, []);

  // const onSearchHit = () => {
  //   const location = { lat: 39.213, lng: -106.9378 };
  //   const radius = 5500;
  //   const keyword = "hiking";
  //   placesService?.nearbySearch({ location, radius, keyword }, (results) => {
  //     console.log(results);
  //   });
  // };

  return (
    <MainAppLayout
      locationsNode={
        <LocationsPicker
          locations={locations}
          selectedLocation={location}
          setLocation={setLocation}
        />
      }
      keywordNode={
        <SearchActivity
          passedValidation={passedValidation}
          keyword={keyword}
          onSearchHit={searchNearby}
          setKeyword={setKeyword}
        />
      }
      resultsNode={
        <Results
          keyword={searchedForKeyWord}
          results={results}
          status={status}
        />
      }
    >
      <div id="map" ref={mapRef} />
    </MainAppLayout>
  );
}

export default App;
