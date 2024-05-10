import { Link } from "react-router-dom";

export default function Home(){

    return(
        <div className="home-page">
            <div className="card">
                <h1>
                    Welcome to 
                    <br />
                    <span>The Lokker Room!</span>
                </h1>
                <div className="buttons">
                    <Link to="/login">
                        <div className="button">LOGIN</div>
                    </Link>
                    <Link to="/register">
                        <div className="button">SIGN UP</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}