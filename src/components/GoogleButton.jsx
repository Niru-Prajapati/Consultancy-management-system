import googleIcon from "../assets/images/google.jpg";

function GoogleButton({ text, onClick }) {
  return (
    <button className="google-btn" onClick={onClick}>
      <img
        src={googleIcon}
        alt="Google"
        className="google-icon"
      />
      <span>{text}</span>
    </button>
  );
}

export default GoogleButton;
