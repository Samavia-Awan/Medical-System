function Button({ text, onClick, variant = "primary", disabled = false, icon, className = "" }) {
  const buttonClass = `btn-${variant} ${className}`.trim();
  
  return (
    <button 
      onClick={onClick} 
      className={buttonClass}
      disabled={disabled}
      title={text}
    >
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
      {text}
    </button>
  );
}

export default Button;