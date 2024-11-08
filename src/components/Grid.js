import "./Grid.css";

const Grid = ({ items }) => {
  return <div className="grid-container">{items.map((item) => item)}</div>;
};

export default Grid;
