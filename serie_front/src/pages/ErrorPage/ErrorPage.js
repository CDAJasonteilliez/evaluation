import { useNavigate, useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError();

    const navigate = useNavigate();

    function navigateToHomepage() {
        navigate("/");
    }

    return (
        <div className="flex-fill">
            <h1>Error Page</h1>
            <p>{error.status} | {error.statusText}</p>
            <button onClick={navigateToHomepage} className="btn btn-primary"> Return to Homepage</button>
        </div>
    )
}