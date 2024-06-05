import React, { useState } from 'react';
import Tile from './Tile';
import Popup from './Popup';

const Gallery = ({ datasets }) => {
  const [selectedDataset, setSelectedDataset] = useState(null);

  const handleTileClick = (datasetKey) => {
    setSelectedDataset({ key: datasetKey, ...datasets[datasetKey] });
  };

  const closePopup = () => {
    setSelectedDataset(null);
  };

  return (
    <div className="gallery-wrapper">
      <div className={`gallery ${selectedDataset ? 'blurred' : ''}`}>
        <div className="tiles">
          {Object.keys(datasets).map((key) => (
            <Tile key={key} datasetKey={key} dataset={datasets[key]} onClick={handleTileClick} />
          ))}
        </div>
      </div>
      {selectedDataset && (
        <Popup dataset={selectedDataset} onClose={closePopup} />
      )}
    </div>
  );
};

export default Gallery;
