function AuthButton({
  text,
  loadingText,
  loading,
  onClick,
  className,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? loadingText : text}
    </button>
  );
}

export default AuthButton;
