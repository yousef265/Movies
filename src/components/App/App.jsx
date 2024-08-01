import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "../MasterLayout/MasterLayout";
import About from "./../About/About";
import Movies from "./../Movies/Movies";
import TvShows from "../TvShows/TvShows";
import Register from "./../Register/Register";
import Login from "./../Login/Login";
import People from "./../People/People";
import Home from "./../Home/Home";
import Notfound from "./../Notfound/Notfound";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import OTPCode from "../OTPCode/OTPCode";
import ResetPassword from "../ResetPassword/ResetPassword";

function App() {
    let routes = createBrowserRouter([
        {
            path: "/",
            element: <MasterLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "about", element: <About /> },
                { path: "movies", element: <Movies /> },
                { path: "tvShows", element: <TvShows /> },
                { path: "register", element: <Register /> },
                { path: "people", element: <People /> },
                { path: "login", element: <Login /> },
                { path: "forgetPassword", element: <ForgetPassword /> },
                { path: "otpCode", element: <OTPCode /> },
                { path: "resetPassword", element: <ResetPassword /> },
                { path: "*", element: <Notfound /> },
            ],
        },
    ]);

    return (
        <div>
            <RouterProvider router={routes} />
        </div>
    );
}

export default App;
