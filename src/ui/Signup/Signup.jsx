import { useSelector } from "react-redux";
import Header from "../Header/Header";
import s from "./Signup.module.css";
import { Form, useActionData, redirect } from "react-router-dom";
import axios from "axios";

function Signup() {
  const formErrors = useActionData();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  return (
    <>
      <Header showBtns={false} />
      <div className={s.container}>
        <div className={s.img}></div>
        <div className={s.formContainer}>
          {isLoggedIn ? (
            <div className={s.signedIn}>
              <p>You are signed in</p>
            </div>
          ) : (
            <Form method="POST">
              <div className={s.header}>Sign Up</div>
              <div className={s.input}>
                <label>Email</label>
                <div>
                  <input
                    type="text"
                    name="email"
                    required
                    placeholder="Email"
                  />
                </div>
                {formErrors?.email && (
                  <p className={s.error}>{formErrors.email}</p>
                )}
              </div>
              <div className={s.input}>
                <label>Password</label>
                <div>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Password"
                  />
                </div>
                {formErrors?.password && (
                  <p className={s.error}>{formErrors.password}</p>
                )}
              </div>
              <div className={s.input}>
                <label>Confirm password</label>
                <div>
                  <input
                    type="password"
                    name="password2"
                    required
                    placeholder="Password"
                  />
                </div>
                {formErrors?.password2 && (
                  <p className={s.error}>{formErrors.password2}</p>
                )}
              </div>
              <button>Sign Up</button>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { email, password, password2 } = data;

  const errors = {};

  // validate the fields
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 4) {
    errors.password = "Password must be > 4 characters";
  }

  if (password !== password2) {
    errors.password2 = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newData = { email, password };

  try {
    const { data: res } = await axios.post(
      "https://zenbittestapi-production.up.railway.app/register",
      newData
    );

    if (res.message) {
      console.error(res.message);
      alert(res.message);
      return redirect(`/signup`);
    } else {
      console.log(res);
      alert("New user is created");
    }
  } catch (err) {
    console.log(err);
  }

  return redirect(`/login`);
}

export default Signup;
