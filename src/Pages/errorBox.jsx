import "./error.css";
function ErrorMessage({ message, onClose }) {
  return (
    <div className="error-overlay" onClick={onClose}>
      <div id="error-box">
        <div className="dot"></div>
        <div className="dot two"></div>
        <div className="face2">
          <div className="eye"></div>
          <div className="eye right"></div>
          <div className="mouth sad"></div>
        </div>
        <div className="shadow"></div>
        <div className="message">
          <div className="alert">Error!</div>
          <p>OH NO, SOMETHING WENT WRONG</p>
          <div className="error-text">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
