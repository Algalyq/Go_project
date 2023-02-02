import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { register } from "../store/actions/authActions";
import { useState } from "react";


function Registration({createUserAction}){
    const [fullname, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    function onChangeFullName(e){
        setFullName(e.target.value)
    }

    function onChangeEmail(e){
        setEmail(e.target.value)
    }

    function onChangePassword(e){
        setPassword(e.target.value)
    }

    function onChangeConfirmPassword(e){
        setConfirmPassword(e.target.value)
    }

    function handleOk(){
        createUserAction({
            fullname,
            email,
            password,
            confirmPassword
        })
    }
    return(
        <section className="login">
         <div className="login-part">
                <span className="login-part--text">
                    <h2>Login</h2>
                    <p>Create your account to get full access</p>
                </span>

                <form className="form">
                    <span className="form-username">
                          <p>Full Name</p>
                          <input type="text" name="fullname" placeholder="Enter Full Name" onChange={onChangeFullName}/>
                    </span>
                    <span className="form-username">
                          <p>Email</p>
                          <input type="text" name="email" placeholder="Enter Email" onChange={onChangeEmail}/>
                    </span>
                    <span className="form-username">
                          <p>Password</p>
                          <input type="password" name="password" placeholder="Enter Password" onChange={onChangePassword}/>
                    </span>
                    <span className="form-username">
                          <p>Confirm Password</p>
                          <input type="password" name="confpassword" placeholder="Enter Confirm Password" onChange={onChangeConfirmPassword}/>
                    </span>
                </form>

                <span className="login-link">
                       <p>Already have an account?<Link to='/login'>Login</Link> here</p>
                       <button type="submit" onClick={handleOk}>Sign Up</button>
                </span>

         </div>
     </section>
    )
}

const mapDispatchToProps = dispatch => ({
      createUserAction: bindActionCreators(register, dispatch)
})

const mapStateToProps = state => ({
    isLoading: state.usersReducers.isLoading
})


export default connect(mapStateToProps, mapDispatchToProps)(Registration);