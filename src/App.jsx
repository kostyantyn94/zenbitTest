import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./ui/Homepage/Homepage";
import Login from "./ui/Login/Login";
import Signup, { action as userSignUpAction } from "./ui/Signup/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import { fetchAllDeals } from "./redux/dealsSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <div>Error</div>,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <div>Error</div>,
    action: userSignUpAction,
  },
]);

function App() {
  const dispatch = useDispatch();

  dispatch(fetchAllDeals());

  useEffect(() => {
    if (localStorage.getItem("loggedUser")) {
      console.log("YES");
      dispatch(login(localStorage.getItem("loggedUser")));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
