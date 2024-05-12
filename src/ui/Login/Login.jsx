import Header from "../Header/Header";
import s from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { Formik, Form } from "formik";
import FormikInput from "../FormikInput/FormikInput";
import { loginSchema } from "./validationSchema";
import { fetchAllDeals } from "../../redux/dealsSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  const initialValues = {
    email: "",
    password: "",
  };

  async function onSubmit(values, helpers) {
    try {
      const { data: res } = await axios.post(
        "https://zenbittestapi-production.up.railway.app/login",
        values
      );

      if (res.message) {
        console.error(res.message);
        alert(res.message);
      } else {
        console.log(res);
        localStorage.setItem("loggedUser", res[0].email);
        helpers.resetForm();
        dispatch(login(values.email));
        dispatch(fetchAllDeals());
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <div className={s.container}>
        <div className={s.img}></div>
        <div className={s.formContainer}>
          {isLoggedIn ? (
            <div className={s.signedIn}>
              <p>You are signed in</p>
            </div>
          ) : (
            // <Form method="POST">
            //   <div className={s.header}>Login</div>
            //   <div className={s.input}>
            //     <label>Email</label>
            //     <div>
            //       <input
            //         type="text"
            //         name="email"
            //         required
            //         placeholder="Email"
            //       />
            //     </div>
            //     {formErrors?.email && (
            //       <p className={s.error}>{formErrors.email}</p>
            //     )}
            //   </div>
            //   <div className={s.input}>
            //     <label>Password</label>
            //     <div>
            //       <input
            //         type="password"
            //         name="password"
            //         required
            //         placeholder="Password"
            //       />
            //     </div>
            //     {formErrors?.password && (
            //       <p className={s.error}>{formErrors.password}</p>
            //     )}
            //   </div>
            //   <div className={s.forgotPass}>
            //     <Link>Forgot password?</Link>
            //   </div>
            //   <button>Sign In</button>
            //   <div className={s.account}>
            //     Don’t have account? <Link to="/signup">Sign Up</Link>
            //   </div>
            // </Form>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={loginSchema}
            >
              <Form>
                <div className={s.header}>Login</div>
                <FormikInput
                  type="text"
                  placeholder="Enter your email"
                  labelName="Email"
                  name="email"
                />
                <FormikInput
                  type="password"
                  placeholder="Enter your password"
                  labelName="Password"
                  name="password"
                />
                <div className={s.forgotPass}>
                  <Link>Forgot password?</Link>
                </div>
                <button>Sign In</button>
                <div className={s.account}>
                  Don’t have account? <Link to="/signup">Sign Up</Link>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </>
  );
}

// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   const { email, password } = data;

//   const errors = {};

//   // validate the fields
//   if (typeof email !== "string" || !email.includes("@")) {
//     errors.email = "That doesn't look like an email address";
//   }

//   if (typeof password !== "string" || password.length < 4) {
//     errors.password = "Password must be > 4 characters";
//   }

//   if (Object.keys(errors).length > 0) return errors;

//   try {
//     const { data: res } = await axios.post(
//       "https://zenbittestapi-production.up.railway.app/login",
//       data
//     );

//     if (res.message) {
//       console.error(res.message);
//       alert(res.message);
//       return redirect(`/login`);
//     } else {
//       console.log(res);
//       localStorage.setItem("loggedUser", res[0].email);
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   return redirect(`/`);
// }

export default Login;
