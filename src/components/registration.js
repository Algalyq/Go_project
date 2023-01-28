import { Link } from "react-router-dom";


export default function Registration(){
    return(
        <section className="login">
         <div className="login-part">
                <span className="login-part--text">
                    <h2>Login</h2>
                    <p>Enter Login details to get access</p>
                </span>

                <form className="form">
                    <span className="form-username">
                          <p>Full Name</p>
                          <input type="text" name="fullname" placeholder="Enter Full Name"/>
                    </span>
                    <span className="form-username">
                          <p>Email</p>
                          <input type="text" name="email" placeholder="Enter Email"/>
                    </span>
                    <span className="form-username">
                          <p>Password</p>
                          <input type="password" name="password" placeholder="Enter Password"/>
                    </span>
                    <span className="form-username">
                          <p>Confirm Password</p>
                          <input type="password" name="confpassword" placeholder="Enter Confirm Password"/>
                    </span>
                </form>

                <span className="login-link">
                       <p>Already have an account?<Link to='/login'>Login</Link> here</p>
                       <button type="submit">Sign Up</button>
                </span>

         </div>
     </section>
    )
}