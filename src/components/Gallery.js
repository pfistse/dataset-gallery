import Tile from "./Tile";

const Gallery = ({ datasets }) => {
  return (
    <div className="gallery-wrapper">
      <div className="tiles">
        {Object.keys(datasets).map((key) => (
          <Tile key={key} datasetKey={key} dataset={datasets[key]} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
