import App from "./App";
import Register from "./components/pages/Register/Register";
import ErrorPage from "./ErrorPage";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default routes;
