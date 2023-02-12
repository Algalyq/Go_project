import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { register } from "../store/actions/authActions";
import { useEffect, useState } from "react";


function Registration({createUserAction, isLoading}){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phone, setPhone] = useState("")

    function onChangeUsername(e){
        setUsername(e.target.value)
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

    function onChangeFirstName(e){
        setFirstName(e.target.value)
    }

    function onChangeLastName(e){
        setLastName(e.target.value)
    }

    function onChangePhone(e){
        setPhone(e.target.value)
    }

   

    function handleOk(){
        createUserAction({
            username,
            email,
            password,
            confirmPassword,
            first_name,
            last_name,
            phone
        })
    }

    useEffect(() => {
        console.log(isLoading)
         if(!isLoading){
            setUsername("")
            setEmail("")
            setFirstName("")
            setLastName("")
            setPassword("")
            setPhone("")
            setConfirmPassword("")
         }
    }, [isLoading])
    return(
        <section className="login">
         <div className="login-part">
                <span className="login-part--text">
                    <h2>Login</h2>
                    <p>Create your account to get full access</p>
                </span>

                <form className="form">
                    <span>
                        <span className="form-username">
                            <p>Email</p>
                            <input type="text" name="email" placeholder="Enter Email" value={email} onChange={onChangeEmail}/>
                        </span>
                        <span className="form-username">
                            <p>Username</p>
                            <input type="text" name="username" placeholder="Enter Username" value={username} onChange={onChangeUsername}/>
                        </span>
                        <span className="form-username">
                            <p>Password</p>
                            <input type="password" name="password" placeholder="Enter Password" value={password} onChange={onChangePassword}/>
                        </span>
                    
                            <span className="form-username">
                                <p>Confirm Password</p>
                                <input type="password" name="confpassword" placeholder="Enter Confirm Password" value={confirmPassword} onChange={onChangeConfirmPassword}/>
                            </span>
                    </span>

                    <span>
                                <span className="form-username">
                                    <p>First Name</p>
                                    <input type="text" name="firstname" placeholder="Enter First name" value={first_name} onChange={onChangeFirstName}/>
                                </span>

                                <span className="form-username">
                                <p>Last Name</p>
                                <input type="text" name="lastname" placeholder="Enter Last name" value={last_name} onChange={onChangeLastName}/>
                                </span>

                            <span className="form-username">
                                <p>Mobile Phone</p>
                                <input type="text" name="phone" placeholder="Enter Phone Number" value={phone} onChange={onChangePhone}/>
                            </span> 
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