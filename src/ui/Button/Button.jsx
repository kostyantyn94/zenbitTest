import PropTypes from "prop-types";
import s from "./Button.module.css";

function Button({ children, onLogOut = () => {} }) {
  return (
    <div className={s.btn} onClick={onLogOut}>
      {children}
    </div>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onLogOut: PropTypes.func,
};

export default Button;
