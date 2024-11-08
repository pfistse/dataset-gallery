import React, { useState } from "react";
import "./Tile.css";

const Tile = ({ datasetKey, dataset }) => {
  const [selectedField, setSelectedField] = useState(0);

  const handleFieldChange = (event) => {
    setSelectedField(dataset["Fields"].indexOf(event.target.value));
  };

  return (
    <div className="tile">
      <video
        src={`${process.env.PUBLIC_URL}/preview/${datasetKey}_${selectedField}.mp4`}
        autoPlay
        loop
        muted
        className="tile-media"
      />
      <div className="tile-info">
        <div className="tile-title">{datasetKey}</div>
        <div className="chip-set">
          <div className="two-sided-chip">
            <span class="left-part">sims</span>
            <span class="right-part">{dataset["numSims"]}</span>
          </div>
          <div className="two-sided-chip">
            <span class="left-part">frames</span>
            <span class="right-part">{dataset["numFrames"]}</span>
          </div>
          <div className="chip green-chip tile-dropdown">
            <select
              value={dataset["Fields"][selectedField]}
              onChange={handleFieldChange}
            >
              {dataset["Fields"].map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
          <div className="split-chip">
            {dataset["numSpatialDim"] >= 1 && <span>x</span>}
            {dataset["numSpatialDim"] >= 2 && <span>y</span>}
            {dataset["numSpatialDim"] >= 3 && <span>z</span>}
          </div>
        </div>
        <div className="chip-set">
          {dataset["Constants"].map((element) => (
            <div className="chip" key={element}>
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tile;
