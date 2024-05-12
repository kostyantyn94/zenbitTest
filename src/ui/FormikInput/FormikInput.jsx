import s from "./FormikInput.module.css";
import { useField } from "formik";
import PropTypes from "prop-types";

function FormikInput(props) {
  const { labelName, type, name, placeholder } = props;
  const [field, meta] = useField(props);

  const isError = meta.touched && meta.error;

  return (
    <div className={s.input}>
      <label>{labelName}</label>
      <div>
        <input type={type} name={name} placeholder={placeholder} {...field} />
      </div>
      {isError && <p className={s.error}>{meta.error}</p>}
    </div>
  );
}

FormikInput.propTypes = {
  labelName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormikInput;
