import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordField({
  label,
  id,
  placeholder,
  value,
  onChange,
  showPassword,
  togglePassword,
  error,
}) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <span
          className="eye-icon"
          onClick={togglePassword}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default PasswordField;
