import React, { useState } from 'react';

const Tile = ({ datasetKey, dataset, onClick }) => {
  const [mediaType, setMediaType] = useState('image');

  const handleImageError = () => {
    setMediaType('video');
  };

  return (
    <div className="tile" onClick={() => onClick(datasetKey)}>
      {mediaType === 'image' ? (
          <img
            src={`${process.env.PUBLIC_URL}/thumbnails/${datasetKey}.png`}
            alt={datasetKey}
            className="tile-media"
            onError={handleImageError}
          />
        ) : (
          <video
            src={`${process.env.PUBLIC_URL}/thumbnails/${datasetKey}.mp4`}
            autoPlay
            loop
            muted
            className="tile-media"
          />
        )}
      <div className="tile-title">{datasetKey}</div>
    </div>
  );
};

export default Tile;