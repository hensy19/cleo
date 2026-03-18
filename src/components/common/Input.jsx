import './Input.css'

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  name,
  id,
  className = ''
}) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input-field ${error ? 'error' : ''}`}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  )
}
