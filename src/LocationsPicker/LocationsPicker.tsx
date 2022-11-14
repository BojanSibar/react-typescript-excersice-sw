import React from "react";
import { initLocations } from "../hooks/useNearbySearch";
import language from "../language/language";
import RadioButton from "../components/RadioButton";
import Label from "../components/Label";
import LocationPickerLayout from "../layouts/LocationPickerLayout";

type Props = {
  locations: string[];
  selectedLocation: string;
  setLocation: (value: string) => void;
};

const LocationsPicker = ({
  locations,
  selectedLocation,
  setLocation,
}: Props): JSX.Element => {
  return (
    <LocationPickerLayout
      labelNode={<Label title={language.locationChooser} />}
    >
      {locations.map((location) => {
        return (
          <RadioButton
            key={location}
            id={location}
            name="locations"
            value={location}
            checked={selectedLocation === location}
            onClick={() => setLocation(location)}
            label={initLocations[location].name}
          />
        );
      })}
    </LocationPickerLayout>
  );
};

export default React.memo(LocationsPicker);
