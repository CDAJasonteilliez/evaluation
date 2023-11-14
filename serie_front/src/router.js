import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { lazy } from 'react';
import { indexLoader } from './loader/index.js';

const Homepage = lazy(() => import('./pages/Homepage/Homepage.js'));
const Login = lazy(() => import('./pages/Login/Login.js'));
const Register = lazy(() => import('./pages/Register/Register.js'));
const Profile = lazy(() => import('./pages/Profile/Profile.js'));
const Admin = lazy(() => import('./pages/Admin/Admin.js'));
const Details = lazy(() => import('./pages/Details/Details.js'));
const NewSerie = lazy(() => import('./pages/Admin/Components/NewSerie/NewSerie.js'));
const AllSeries = lazy(() => import('./pages/Admin/Components/AllSeries/AllSeries.js'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites.js'));
const ModifySerie = lazy(() => import('./pages/Admin/Components/ModifySerie/ModifySerie.js'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: indexLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Homepage />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/admin',
                element: <Admin />,
                children: [
                    {
                        path: "",
                        element: <NewSerie />
                    },
                    {
                        path: "all",
                        element: <AllSeries />
                    },
                    {
                        path: "update/:id",
                        element: <ModifySerie />
                    }
                ]
            },
            {
                path: '/details/:id',
                element: <Details />,
            },
            {
                path: '/favorites',
                element: <Favorites />
            }

        ]
    }
])