// // Use d3.json() to fetch data from JSON file
// d3.json("samples.json").then((data)=> {}
// console.log(data);

// Incoming data is internally referred to as incomingData
d3.json("data/samples.json").then((importedData) => {
    console.log(importedData),
    var data = importedData;
  };