import { useCallback, useMemo, useReducer } from "react";

interface Props {
  placesService: google.maps.places.PlacesService | null;
}

interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export const initLocations: Record<string, GeoLocation> = {
  snowmass: {
    name: "Snowmass, CO",
    latitude: 39.213,
    longitude: -106.9378,
  },
  malibu: {
    name: "Malibu, CA",
    latitude: 34.0259,
    longitude: -118.7798,
  },
  catskill: {
    name: "Catskill, NY",
    latitude: 42.2146,
    longitude: -73.9595,
  },
  grandTetonNationalPark: {
    name: "Grand Teton National Park, WY",
    latitude: 43.7904,
    longitude: -110.6818,
  },
  columbiaRiverGorge: {
    name: "Columbia River Gorge, OR",
    latitude: 45.7253,
    longitude: -121.73,
  },
};

export type SearchStatus = "init" | "fetching" | "fetched" | "error";

const nearbySearchState = {
  searchStatus: "init" as SearchStatus,
  searchResults: [] as google.maps.places.PlaceResult[],
  locations: initLocations,
  location: "",
  keyword: "",
  searchedForKeyWord: "",
};

type NearbySearchState = typeof nearbySearchState;

type NearbySearchActions =
  | {
      type: "searchNearby";
    }
  | { type: "searchNearbyDone"; payload: google.maps.places.PlaceResult[] }
  | { type: "setLocation"; payload: string }
  | { type: "setKeyword"; payload: string };

interface ReturnType {
  location: string;
  locations: string[];
  keyword: string;
  searchedForKeyWord: string;
  results: google.maps.places.PlaceResult[];
  status: SearchStatus;
  passedValidation: boolean;
  setLocation: (newLocation: string) => void;
  setKeyword: (newKeyword: string) => void;
  searchNearby: () => void;
}

const nearbySearchReducer = (
  state: NearbySearchState,
  action: NearbySearchActions
): NearbySearchState => {
  switch (action.type) {
    case "setLocation": {
      return {
        ...state,
        location: action.payload,
      };
    }
    case "setKeyword": {
      return {
        ...state,
        keyword: action.payload,
      };
    }
    case "searchNearby": {
      return {
        ...state,
        searchedForKeyWord: "",
        searchStatus: "fetching",
      };
    }
    case "searchNearbyDone": {
      return {
        ...state,
        searchStatus: "fetched",
        searchedForKeyWord: state.keyword,
        searchResults: action.payload,
      };
    }
    default:
      return state;
  }
};

export function useNearbySearch({ placesService }: Props): ReturnType {
  const [state, dispatch] = useReducer(nearbySearchReducer, nearbySearchState);

  const locations = Object.keys(state.locations);

  const setLocation = useCallback(
    (newLocation: string) => {
      dispatch({ type: "setLocation", payload: newLocation });
    },
    [dispatch]
  );

  const setKeyword = useCallback(
    (newKeyword: string) => {
      dispatch({ type: "setKeyword", payload: newKeyword });
    },
    [dispatch]
  );

  const passedValidation = useMemo(() => {
    return !!state.keyword && !!state.location;
  }, [state]);

  const searchNearby = useCallback(() => {
    if (!passedValidation) return;
    const radius = 5000;
    const selectedLocation = state.locations[state.location];
    const location = {
      lat: selectedLocation.latitude,
      lng: selectedLocation.longitude,
    };
    const keyword = state.keyword;

    dispatch({ type: "searchNearby" });
    placesService?.nearbySearch({ location, radius, keyword }, (results) => {
      console.log(results);
      const payload = results || [];
      dispatch({ type: "searchNearbyDone", payload });
    });
  }, [state, dispatch, passedValidation]);

  return {
    location: state.location,
    locations,
    keyword: state.keyword,
    searchedForKeyWord: state.searchedForKeyWord,
    results: state.searchResults,
    status: state.searchStatus,
    passedValidation,
    setLocation,
    setKeyword,
    searchNearby,
  };
}
