import "./style.scss";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
