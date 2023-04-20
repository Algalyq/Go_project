import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../store/actions/authActions'
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function Login({loginAdminAction, token}){
    const [username, setUsername] = useState("");
    let navigate = useNavigate();
    const [password, setPassword] = useState("");
    const onFinish = () => {
      loginAdminAction({username: username, password:password}, navigate);
    };
  
    const onChangeUsername = e => {
        setUsername(e.target.value)
      }
    
      const onChangePassword = e => {
        setPassword(e.target.value)
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
           navigate('/')
        }
    }, [])

    

    return(
     <section className="login">
         <div className="login-part">
                <span className="login-part--text">
                    <h2>Login</h2>
                    <p>Enter Login details to get access</p>
                </span>

                <form className="form form-login">
                    <span className="form-username">
                          <p>Username Or Email Address</p>
                          <input type="text" name="email" placeholder="Username / Email" onChange={onChangeUsername}/>
                    </span>
                    <span className="form-username">
                          <p>Password</p>
                          <input type="password" name="password" placeholder="Enter Password" onChange={onChangePassword}/>
                    </span>
                    <h3>Forget Password?</h3>
                </form>

                <span className="login-link">
                       <p>Don’t have an account? <Link to="/register">Sign Up</Link> here</p>
                       <button type="submit" onClick={onFinish}>Login</button>
                </span>

         </div>
     </section>
     )

     
}

const mapDispatchToProps = dispatch => ({
    loginAdminAction: bindActionCreators(login, dispatch),
})

const mapStateToProps = state => ({
    token: state.usersReducers.token
})
export default connect(mapStateToProps ,mapDispatchToProps)(Login);