import React from "react";
import classnames from "classnames";

interface ITextInputGroupProps {
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextInputGroup: React.FunctionComponent<ITextInputGroupProps> = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error
}: ITextInputGroupProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.defaultProps = {
  type: "text"
};

export default TextInputGroup;
