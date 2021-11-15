import React from "react";
import Link from "next/link";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

const libraries = ["places"];
const mapContainerStyle = {
  width: "40vw",
  height: "40vh",
  border: "2px solid #4098A4",
  borderRadius: "10px"
};
const center = {
  lat: 49.28273,
  lng: -123.120735,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // add markers when location is searched for
  const [markers, setMarkers] = React.useState([]);
  // set it for when a user clicks on a marker
  // box appears with info and link to review
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //use to pan to location on map when loc searched for
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  });

  const addMarker = (name, remainingAddress, lat, lng, locationTypes) => {
    setMarkers((crnt) => [
      ...crnt,
      {
        name: name,
        address: remainingAddress,
        lat: lat,
        lng: lng,
        types: locationTypes,
        time: new Date()
      },
    ]);
  };


  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Map";

  return (
    <div className="map">
      <Search panTo={panTo} addMarker={addMarker} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h4>{selected.name}</h4>
              <p>{selected.address}</p>
              {(selected.types.length > 0) ? (
                  <p>Type: {selected.types.toString()} </p>
                ): null }
              {/* Link to location review page */}
              <Link href={`/locations/${selected.name}`}>
                <a>View reviews here</a>
              </Link>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Search({ panTo, addMarker }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 49.28273, lng: () => -123.120735 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        className="map-searchbar"
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          let addressArr = address.split(",")
          const name = addressArr.shift();
          const remainingAddress = addressArr.join(",")

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);

            const healthTypes = ["health", "hospital", "doctor", "dentist", "pharmacy", "drugstore"]
            let locationTypes = []

            if (results[0].types) {
              results[0].types.forEach(type => {
                if (healthTypes.includes(type)) {
                  locationTypes.push(type)
                }
              })

              addMarker(name, remainingAddress, lat, lng, locationTypes);
            }

            panTo({ lat, lng });

          } catch (error) {
            console.log("error! " + error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disable={(!ready).toString()}
          placeholder="Search a healthcare facility"
          className="map-searchbar-input"
        />

        <ComboboxPopover className="suggestions-box">
          <ComboboxList className="suggestions-list">
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption className="withBorder" key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
