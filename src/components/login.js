import { Link } from "react-router-dom";



export default function Login(){
    return(
     <section className="login">
         <div className="login-part">
                <span className="login-part--text">
                    <h2>Login</h2>
                    <p>Enter Login details to get access</p>
                </span>

                <form className="form">
                    <span className="form-username">
                          <p>Username Or Email Address</p>
                          <input type="text" name="email" placeholder="Username / Email"/>
                    </span>
                    <span className="form-username">
                          <p>Password</p>
                          <input type="password" name="password" placeholder="Enter Password"/>
                    </span>
                    <h3>Forget Password?</h3>
                </form>

                <span className="login-link">
                       <p>Don’t have an account? <Link to="/register">Sign Up</Link> here</p>
                       <button type="submit">Login</button>
                </span>

         </div>
     </section>
     )

     
}