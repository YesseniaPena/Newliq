import {
  getliquor_storeId,
  getliquor_storeLocation
} from "./googleAPIResponseParser";
import { SEARCH_RADIUS_IN_METERS, ERRORS } from "../constants";

const mapElement = document.createElement("div");
mapElement.id = "map";
const map = new window.google.maps.Map(mapElement);

const placesService = new window.google.maps.places.PlacesService(map);
const distanceService = new window.google.maps.DistanceMatrixService();

const {
  ZERO_RESULTS: PLACES_SERVICE_ZERO_RESULTS,
  OK: PLACES_SERVICE_OK
} = window.google.maps.places.PlacesServiceStatus;
const { OK: DISTANCE_SERVICE_OK } = window.google.maps.DistanceMatrixStatus;

export const requestNearbyliquor_store= ({ latitude, longitude }) => {
  const options = {
    location: new window.google.maps.LatLng({ lat: latitude, lng: longitude }),
    radius: SEARCH_RADIUS_IN_METERS,
    type: "liquor_store"
  };

  return new Promise((resolve, reject) => {
 placesService.nearbySearch(options, (places, status) => {
if (status === PLACES_SERVICE_ZERO_RESULTS) reject(ERRORS.NO_RESULTS);
 if (status !== PLACES_SERVICE_OK) reject(ERRORS.GENERIC);
resolve(places);
});
});
};

 export const requestliquor_storeDetails = liquor_store => {
  const options = {
    placeId: getliquor_storeId(liquor_store)
   };

   return new Promise((resolve, reject) => {
     placesService.getDetails(options, (place, status) => {
       if (status === PLACES_SERVICE_ZERO_RESULTS) reject(ERRORS.NO_RESULTS);
       if (status !== PLACES_SERVICE_OK) reject(ERRORS.GENERIC);
       resolve(place);
     });
  });
 };

export const requestliquor_storeDistance = (
   liquor_store,
   { latitude, longitude }
 ) => {
   const options = {
     origins: [new window.google.maps.LatLng({ lat: latitude, lng: longitude })],
      // destinations: [getliquor_storePlace.field.address(liquor_store)],
     travelMode: "DRIVING"
};

   return new Promise((resolve, reject) => {
     distanceService.getDistanceMatrix(options, (response, status) => {
       let distanceElement;
       if (status !== DISTANCE_SERVICE_OK) reject(ERRORS.GENERIC);
       if (response.rows && response.rows.length > 0) {
         distanceElement = response.rows[0].elements[0];
         resolve(distanceElement);
       }
       if (response.status !== DISTANCE_SERVICE_OK) reject(ERRORS.GENERIC);
     });
   });
};
