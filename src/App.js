import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapComponent from './GoogleMapComponent';
import coordinateJSON from './coordinates.json';

function App() {
  const [showCard, setShowCard] = useState(true);
  const [properties, setProperties] = useState(null);
  const [seperateData, setSeperateData] = useState(null);
  const [lng, setLng] = useState(77.12);
  const [lat, setLat] = useState(22.41);
  const [zoom, setZoom] = useState(3.5);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  // const [coordinates, setCoordinates] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001935730ca3ebc41b075b1e831b540250a&format=json&offset=0&limit=20000`
        );
        setData(res.data.records);
        // console.log(res);
        console.log(res.data.records);

        // const records = res.data.records;
        // const coords = {};
        // records.forEach(rec => {
        //   const { station, latitude, longitude } = rec;
        //   if (latitude && longitude && !coords[station]) {
        //     coords[station] = [parseFloat(longitude), parseFloat(latitude)];
        //   }
        // });

        // setCoordinates(coords);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  // This useEffect is uncommented and called unconditionally
  // useEffect(() => {
  //   if (Object.keys(coordinates).length > 0) {
  //     console.log('Coordinates:', coordinates);
  //   }
  // }, [coordinates]);

  const markerClicked = (title) => {
    setProperties(title);
    setShowCard(true);
  };

  useEffect(() => {
    const processData = () => {
      let mp = new Map();
      let arr2 = [];

      data.forEach(rec => {
        if (rec.pollutant_avg === 'NA') return;
        if (!coordinateJSON[rec.station]) return;

        if (mp.has(rec.station)) {
          arr2[mp.get(rec.station)].properties.pollutants.push({
            pollutant_id: rec.pollutant_id,
            pollutant_avg: rec.pollutant_avg
          });
        } else {
          arr2.push({
            type: 'Feature',
            properties: {
              place: rec.station + ', ' + rec.state,
              last_update: rec.last_update,
              pollutants: [{ pollutant_id: rec.pollutant_id, pollutant_avg: rec.pollutant_avg }]
            },
            geometry: { coordinates: coordinateJSON[rec.station], type: 'Point' }
          });
          mp.set(rec.station, arr2.length - 1);
        }
      });

      setSeperateData({ type: 'FeatureCollection', features: arr2 });
    };

    if (data.length > 0) {
      processData();
    }
  }, [data]);

  const printArr = (arr) => {
    if (!arr) return '';
    return arr.map(item => `${item.pollutant_id}:${item.pollutant_avg}`).join(' | ');
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      {(!showCard || !properties) && (
        <div className="sidebar">
          Air Quality Index
          <br />
          (Hover/Click on any Location for Details)
          <br />
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      )}

      {showCard && properties && (
        <div className="sidebar">
          {properties.place}
          <br />
          {'Last Update: ' + properties.last_update}
          <br />
          {printArr(properties.pollutants)}
        </div>
      )}

      <GoogleMapComponent
        center={{ lat, lng }}
        zoom={zoom}
        onMarkerClick={markerClicked}
        markers={seperateData ? seperateData.features : []}
      />
    </div>
  );
}

export default App;
