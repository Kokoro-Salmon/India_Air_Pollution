// function App() {
// const [showCard, setShowCard] = useState(true);
// const [properties, setProperties] = useState(null);
// const [seperateData, setSeperateData] = useState(null);
// const [lng, setLng] = useState(77.12);
// const [lat, setLat] = useState(22.41);
// const [zoom, setZoom] = useState(3.5);
// const [data, setData] = useState([]);
// const [error, setError] = useState(null);
// const [coordinates, setCoordinates] = useState({});

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const res = await axios.get(
//         `https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd000001935730ca3ebc41b075b1e831b540250a&format=json&offset=0&limit=20000`
//       );
//       setData(res.data.records);
//       // console.log(res);
//       console.log(res.data.records);

//       // const records = res.data.records;
//       // const coords = {};
//       // records.forEach(rec => {
//       //   const { station, latitude, longitude } = rec;
//       //   if (latitude && longitude && !coords[station]) {
//       //     coords[station] = [parseFloat(longitude), parseFloat(latitude)];
//       //   }
//       // });

//       // setCoordinates(coords);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   fetchData();
// }, []);

// This useEffect is uncommented and called unconditionally
// useEffect(() => {
//   if (Object.keys(coordinates).length > 0) {
//     console.log('Coordinates:', coordinates);
//   }
// }, [coordinates]);




//   return (
//     <div className="App">
//       Hello



//     </div>
//   );
// }

// export default App;
