import "./Loading.css";

export default function Loading() {
  return (
    <div className="spinner-container-submit">
      <img
        src="../../../public/4942ab41a3358d14cded6d951fad3ba6 (1).gif"
        alt="Loading"
        className="loading-image"
      />

      <div className="loading-dots">
        <div className="yellow"></div>
        <div className="red"></div>
        <div className="blue"></div>
      </div>
    </div>
  );
}
