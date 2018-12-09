import React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faGithub,
  faYoutube,
  faLinkedin,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

const FormField = ({ field, onChangeHandler }) => {
  const generateFieldInstructions = message => {
    const messageTemplate = (
      <small className="form-text text-muted">{message}</small>
    );
    return messageTemplate;
  };
  const generateInputField = () => {
    let template;

    if (field.inputGroup) {
      let icon;
      if (field.icon === "twitter") icon = faTwitter;
      if (field.icon === "facebook") icon = faFacebook;
      if (field.icon === "youtube") icon = faYoutube;
      if (field.icon === "linkedin") icon = faLinkedin;
      if (field.icon === "github") icon = faGithub;
      if (field.icon === "instagram") icon = faInstagram;

      template = (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={icon} />
            </span>
          </div>
          <input
            type={field.type}
            value={field.value}
            onChange={onChangeHandler}
            className="form-control form-control-lg"
            placeholder={field.placeholder}
            name={field.name}
          />
        </div>
      );
      return template;
    }

    if (field.type === "select") {
      template = (
        <select
          name={field.name}
          value={field.value}
          onChange={onChangeHandler}
          className={classnames("form-control form-control-lg", {
            "is-invalid": field.validationMessage
          })}
        >
          <option value="">Select one...</option>
          {field.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      template = (
        <textarea
          value={field.value}
          name={field.name}
          onChange={onChangeHandler}
          placeholder={field.placeholder}
          className={classnames("form-control form-colontrol-lg", {
            "is-invalid": field.validationMessage
          })}
        />
      );
    }

    if (field.type === "checkbox") {
      template = (
        <input
          type={field.type}
          value={field.value}
          name={field.name}
          onChange={onChangeHandler}
          placeholder={field.placeholder}
          className="form-check-input"
          id={field.name}
          style={{
            position: "static",
            marginLeft: "1rem"
          }}
        />
      );
    }

    if (
      field.type === "text" ||
      field.type === "email" ||
      field.type === "number" ||
      field.type === "password" ||
      field.type === "date"
    ) {
      template = (
        <input
          type={field.type}
          value={field.value}
          name={field.name}
          onChange={onChangeHandler}
          placeholder={field.placeholder}
          className={classnames("form-control form-control-lg", {
            "is-invalid": field.validationMessage
          })}
          disabled={field.disabled && field.disabled == true ? true : false}
        />
      );
    }
    return template;
  };

  return (
    <div className="form-group">
      {field.label ? <label htmlFor={field.name}>{field.label}</label> : null}
      {generateInputField()}

      {field.instructions
        ? generateFieldInstructions(field.instructions)
        : null}
      {field.validationMessage && (
        <div className="invalid-feedback">{field.validationMessage}</div>
      )}
    </div>
  );
};

export default FormField;
