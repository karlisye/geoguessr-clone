import { MAP_WIDTH, MAP_HEIGHT } from "../constants/maps";

export const calculateLatLon = (x, y) => {
    const lat = 90 - (y/MAP_HEIGHT) * 180;
    const lon = (x/MAP_WIDTH) * 360 - 180;
    return { lat, lon };
  }

export const calculateXY = ({ lat, lon }) => {
  const x = ((lon + 180) / 360) * 1800;
  const y = ((90 - lat) / 180) * 900;

  return { x, y };
}

export const calculateDistance = (latLon, location) => {
  const { lat:lat1, lon:lon1 } = latLon;
  const { lat:lat2, lon:lon2 } = location;

  const R = 6371;
  const deltaLat = Math.PI / 180 * (lat2 - lat1);
  const deltaLon = Math.PI / 180 * (lon2 - lon1);

  const a = 
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(Math.PI / 180 * lat1) *
    Math.cos(Math.PI / 180 * lat2) *
    Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  const roundScore = Math.round(5000 * Math.exp(-distance / 2000));

  return roundScore;
}