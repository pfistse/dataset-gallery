import React, { useEffect, useState } from "react";

import "./App.css";
import Carousel from "./components/Carousel";
import Tile from "./components/Tile";

const App = () => {
  const [datasets, setDatasets] = useState({});

  useEffect(() => {
    const corsProxy = "https://corsproxy.io/?";
    const jsonUrl =
      "https://syncandshare.lrz.de/dl/fiFpt1oyzXW8J4uvg43JF8/index_global.json";
    const cacheBuster = `?cb=${new Date().getTime()}`;

    fetch(corsProxy + jsonUrl + cacheBuster)
      .then((response) => response.json())
      .then((data) => {
        setDatasets(data);
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  const items = Object.keys(datasets).map((key) => (
    <Tile key={key} datasetKey={key} dataset={datasets[key]} />
  ))

  return (
    <div className="App">
      <Carousel items={items} />
    </div>
  );
};

export default App;
