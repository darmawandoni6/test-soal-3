import React from "react";

export const required = (value) => (value ? undefined : "required");

export const emailValid = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const onlyNumber = (value) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, "");
  return onlyNums;
};
export function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) {
    return 0;
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}

export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Hanya karakter huruf dan angka"
    : undefined;

export const mustAlphaNumeric = (value) =>
  value && /^[a-z0-9_-]+$/i.test(value)
    ? "Minimal harus karakter huruf dan angka"
    : undefined;

export function formatNumber(num) {
  const parts = num && num.toString().split(".");
  if (parts) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }
  return parts;
}
export const normalizeNumber = (value) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, "");
  return formatNumber(onlyNums);
};

//----------------------
export const renderField = (props) => {
  const {
    input,
    name,
    label,
    noLabel,
    requiredStar,
    placeholder,
    disabled,
    maxLength,
    type = "text",
    meta: { touched, error, warning },
  } = props;

  return (
    <div className="form-group">
      {!noLabel && (
        <label htmlFor={name} className="font-weight-semibold">
          {label}
          {requiredStar && <span className="form-error"> *</span>}
        </label>
      )}
      <input
        {...input}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${touched && error ? "focus-error" : ""}`}
        disabled={disabled}
        maxLength={maxLength}
      />

      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};

export const textAreaField = (props) => {
  const {
    input,
    name,
    label,
    noLabel,
    requiredStar,
    placeholder,
    rows,
    disabled,
    meta: { touched, error, warning },
  } = props;

  return (
    <div className="form-group">
      {!noLabel && (
        <label htmlFor={name} className="font-weight-semibold">
          {label}
          {requiredStar && <span className="form-error"> *</span>}
        </label>
      )}
      <textarea
        {...input}
        id={name}
        placeholder={placeholder}
        rows={rows}
        className={`form-control ${touched && error ? "focus-error" : ""}`}
        disabled={disabled}
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  );
};

export const renderFieldRadio = ({
  input,
  label,
  id,
  options,
  noLabel,
  required,
  requiredStar,
  disabled,
  meta: { touched, error, warning },
}) => (
  <>
    <div className="form-group">
      {!noLabel && (
        <label htmlFor={id} className="font-weight-semibold">
          {label}
          {requiredStar && <span className="form-error"> *</span>}
        </label>
      )}
      <div
        className="d-flex align-items-center px-3 py-2"
        style={{
          border: "1px solid #D7D7D7",
          borderRadius: "4px",
          backgroundColor: "white",
        }}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="mr-2"
            style={{ marginBottom: "0px", cursor: "pointer" }}
          >
            <input
              {...input}
              type="radio"
              value={opt.value}
              checked={opt.value.toString() === input.value}
              required={required}
              disabled={disabled}
            />
            <div className="custom-radio" />
            <span className="custom-radio-label">{opt.label}</span>
          </label>
        ))}
      </div>
      {touched &&
        ((error && <span className="form-error d-block">{error}</span>) ||
          (warning && <span className="form-error d-block">{warning}</span>))}
    </div>
  </>
);

export const renderFieldCheckbox = ({
  input,
  label,
  id,
  options,
  noLabel,
  required,
  requiredStar,
  disabled,
  meta: { touched, error, warning },
}) => (
  <>
    <div className="form-group">
      {!noLabel && (
        <label htmlFor={id} className="font-weight-semibold">
          {label}
          {requiredStar && <span className="form-error"> *</span>}
        </label>
      )}
      <div className="d-flex align-items-center ">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="mr-2"
            style={{ marginBottom: "0px", cursor: "pointer" }}
          >
            <input
              {...input}
              type="checkbox"
              value={opt.value}
              checked={input.value}
              required={required}
              disabled={disabled}
            />
            <div className="custom-checkbox" />
            <span className="custom-checkbox-label">{opt.label}</span>
          </label>
        ))}
      </div>
      {touched &&
        ((error && <span className="form-error d-block">{error}</span>) ||
          (warning && <span className="form-error d-block">{warning}</span>))}
    </div>
  </>
);
