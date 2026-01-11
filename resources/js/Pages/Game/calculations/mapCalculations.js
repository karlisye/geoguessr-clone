export const calculateLatLon = ({ xPerc, yPerc }) => {
  const lat = 90-(yPerc/100)*180;
  const lon = (xPerc/100)*360-180;
  return { lat, lon };
}

export const calculateDistance = (guess, real) => {
  const { lat:lat1, lon:lon1 } = guess;
  const { lat:lat2, lon:lon2 } = real;

  const deltaLat = Math.PI / 180 * (lat2 - lat1);
  const deltaLon = Math.PI / 180 * (lon2 - lon1);

  const R = 6371;

  const a = 
    Math.sin(deltaLat/2) ** 2 +
    Math.cos(Math.PI / 180 * lat1) *
    Math.cos(Math.PI / 180 * lat2) *
    Math.sin(deltaLon/2) **2;
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export const calcuateScore = (distance) => {
  return 5000 * Math.exp(-distance/2000);
}

export const calculateLocation = ({ lat, lon }) => {
  const xPerc = ((lon+180)/360) * 100;
  const yPerc = ((90-lat)/180) * 100;
  return { xPerc, yPerc };
}