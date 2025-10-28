import App from "./App";
import Register from "./components/pages/Register/Register";
import ErrorPage from "./ErrorPage";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Drive from "./components/pages/Drive/Drive";

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
      {
        path: "drive/*",
        element: <Drive />,
      },
    ],
  },
];

export default routes;
