import { MAX_PHOTO_WIDTH_IN_PX } from '../constants';

export const getliquor_storeId = liquor_store => liquor_store.place_id;

export const getRliquor_storeLocation = liquor_store => liquor_store.geometry.location;

const getliquor_storeurl= (liquor_store) => {
  const { photos } = liquor_store;

  if (!photos || !photos.length) return undefined;

  const options = {
    maxWidth: Math.min(window.innerWidth, MAX_PHOTO_WIDTH_IN_PX)
  };
  return photos[0].getUrl(options);
};

export const parseliquor_storeData = liquor_store => ({
  id: getliquor_storeId,
  name: liquor_store.name,
  address: liquor_store.vicinity,
  rating: liquor_store.rating,
  photoUrl: getliquor_storeurl(liquor_store),
  phone: liquor_store.formatted_phone_number,
  websiteUrl: liquor_store.website,
  googlePageUrl: liquor_store.url
});

export const parseDistanceData = ({ distance, duration }) => ({
  distanceInSpace: distance.text,
  distanceInTime: duration.text
});
