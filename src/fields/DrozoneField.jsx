import React, { useState } from "react";
import Dropzone from "react-dropzone";

const DrozoneField = (props) => {
  const [isRejected, setRejected] = useState(false);
  const [images, setImages] = useState();

  const {
    input,
    accept,
    maxSize,
    disabled,
    label,
    requiredStar,
    meta: { touched, error, warning },
  } = props;

  const previewImage = () => {
    if (images) {
      return (
        <div className="border text-center p-2 rounded">
          <img
            src={URL.createObjectURL(images)}
            alt=""
            style={{ height: 150 }}
          />
        </div>
      );
    }
    return (
      <div className="border text-center p-2 rounded">
        <i className="fas fa-cloud-upload-alt mr-2"></i>
        <br />
        Upload Document
      </div>
    );
  };

  return (
    <div className="form-group dropzone h-100 ">
      <label htmlFor={input.name} className="font-weight-semibold">
        {label}
        {requiredStar && <span className="form-error"> *</span>}
      </label>
      <Dropzone
        name="file"
        accept={accept}
        maxSize={maxSize}
        onDropAccepted={(values) => {
          setImages(values[0]);
          setRejected(false);
        }}
        disabled={disabled}
        onDropRejected={() => setRejected(true)}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {previewImage()}
          </div>
        )}
      </Dropzone>
      {isRejected ? (
        <span className="form-error">File is too large!</span>
      ) : (
        touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))
      )}
    </div>
  );
};

export default DrozoneField;
