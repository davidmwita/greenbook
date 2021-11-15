import React from "react";
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
    googleMapsApiKey: "AIzaSyC63Jix2qjSi-XO22n0hBK2qAJ5epORgvo",
    libraries,
  });
  // add markers when reviews given
  // setMarkers...
  const [markers, setMarkers] = React.useState([]);
  // set it for when a user clicks on a marker
  // box appears with info
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //use to pan to location on map when specific page opens
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  });

  const addMarker = (name, lat, lng) => {
    setMarkers((crnt) => [
      ...crnt,
      {
        name: name,
        lat: lat,
        lng: lng,
        time: new Date(),
      },
    ]);
  };

  // const addressFromPlaceId = async (placeId) => {
  //     const geocoder = new google.maps.Geocoder();
  //     const { results } = await geocoder.geocode({ placeId })

  //     if (results[0]) {
  //         // const result = [results[0].name, results[0].formatted_address]
  //         return results
  //     }
  //     else
  //         return null
  // }

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
        className="map"
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
              <h3>{selected.name}</h3>
              {/* {console.log(addressFromPlaceId(selected.placeId))} */}
              {/** TODO: add location name */}
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

          const name = address.split(",")[0];

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);

            addMarker(name, lat, lng);

            panTo({ lat, lng });
            /** TODO:
             * 1) pan to location on map
             * 2) have marker pop up
             * 3) have link to go to location page (pass in address)
             * 4) firebase backend to display reviews etc for that page
             */
          } catch (error) {
            console.log("error!" + error);
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

        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
