import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import s from "./Header.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";

function Header() {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logout());
  }

  return (
    <div className={s.header}>
      {!isLoggedIn && (
        <>
          <Link to="/login">
            <Button>Log in</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </>
      )}
      {isLoggedIn && <Button onLogOut={handleLogOut}>Log out</Button>}
    </div>
  );
}

export default Header;
