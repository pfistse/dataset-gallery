import React, { useEffect, useState } from "react";

import "./App.css";
import Carousel from "./components/Carousel";
import Grid from "./components/Grid";
import Tile from "./components/Tile";

const App = () => {
  const [datasets, setDatasets] = useState({});

  useEffect(() => {
    const jsonUrl = `${process.env.PUBLIC_URL}/index.json`;

    fetch(jsonUrl)
      .then((response) => response.json())
      .then((data) => {
        setDatasets(data);
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  const items = Object.keys(datasets).map((key) => (
    <Tile key={key} datasetKey={key} dataset={datasets[key]} />
  ));

  return (
    <div className="App">
      {/* <Carousel items={items} /> */}
      <Grid items={items} />
    </div>
  );
};

export default App;
