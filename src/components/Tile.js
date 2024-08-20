import React, { useState } from "react";
import "./Tile.css";

const Tile = ({ datasetKey, dataset }) => {
  const [selectedField, setSelectedField] = useState(0);

  const handleFieldChange = (event) => {
    setSelectedField(dataset["field_desc"].indexOf(event.target.value));
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
            <span class="right-part">{dataset["num_sims"]}</span>
          </div>
          <div className="two-sided-chip">
            <span class="left-part">frames</span>
            <span class="right-part">{dataset["num_frames"]}</span>
          </div>
          <div className="chip green-chip tile-dropdown">
            <select
              value={dataset["field_desc"][selectedField]}
              onChange={handleFieldChange}
            >
              {dataset["field_desc"].map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
          <div className="split-chip">
            {dataset["num_spatial_dim"] >= 1 && <span>x</span>}
            {dataset["num_spatial_dim"] >= 2 && <span>y</span>}
            {dataset["num_spatial_dim"] >= 3 && <span>z</span>}
          </div>
        </div>
        <div className="chip-set">
          {dataset["const_desc"].map((element) => (
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
