import { Link } from "react-router";
import "./style.scss";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="not-found__link">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;