import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import UserDataProvider from "../../Context/UserData";
import { PrimeReactProvider } from "primereact/api";
import Details from "../Details/Details";
function App() {
    function ProtectedRoute(props) {
        if (localStorage.getItem("token")) {
            return props.children;
        } else {
            return <Navigate to="/login" />;
        }
    }

    let routes = createBrowserRouter([
        {
            path: "/",
            element: <MasterLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "about",
                    element: (
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "movies/:title",
                    element: (
                        <ProtectedRoute>
                            <Movies />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "tvShows/:title",
                    element: (
                        <ProtectedRoute>
                            <TvShows />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "people",
                    element: (
                        <ProtectedRoute>
                            <People />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/:type/:id",
                    element: (
                        <ProtectedRoute>
                            <Details />
                        </ProtectedRoute>
                    ),
                },
                { path: "otpCode", element: <OTPCode /> },
                { path: "forgetPassword", element: <ForgetPassword /> },
                { path: "resetPassword", element: <ResetPassword /> },
                { path: "login", element: <Login /> },
                { path: "register", element: <Register /> },
                { path: "*", element: <Notfound /> },
            ],
        },
    ]);

    return (
        <div>
            <PrimeReactProvider>
                <UserDataProvider>
                    <RouterProvider router={routes} />
                </UserDataProvider>
            </PrimeReactProvider>
        </div>
    );
}

export default App;
