function InputField({
  label,
  type = "text",
  id,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default InputField;
