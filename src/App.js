import React, { useEffect, useState } from 'react';
import './App.css';
import Gallery from './components/Gallery';

const App = () => {
  const [datasets, setDatasets] = useState({});

  useEffect(() => {
    const corsProxy = 'https://corsproxy.io/?';
    const jsonUrl = 'https://syncandshare.lrz.de/dl/fiJrVYgy5n3qSZi9CgK5PE/index_global.json';

    fetch(corsProxy + jsonUrl)
      .then(response => response.json())
      .then(data => {
        setDatasets(data);
      })
      .catch(error => console.error('Error fetching JSON data:', error));
  }, []);

  return (
    <div className="App">
      <Gallery datasets={datasets} />
    </div>
  );
};

export default App;
