import React, { useEffect, useState } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/userAction";
import { CLEAR_ERRORS } from "../../../constants/userConstants";
import SmallLoader from "../../layout/SmallLoader/SmallLoader";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { success, error, loading } = useSelector((state) => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showPass,setShowPass] = useState(false)

    function loginSubmit(e) {
        e.preventDefault();
        if (username !== '' && password !== '') {
            dispatch(login(username, password))
        }
    }

    useEffect(() => {
        if (success) {
            navigate('/')
        }
        if (error) {
            setErrMsg(error)
            dispatch({type:CLEAR_ERRORS})
        }
    }, [success, navigate,error,dispatch])

    return <>
        <div className="login-container">
            <div className="loginform-box">
                <div className="header-form">
                    <h4><i className="bi bi-person-circle"></i></h4>
                </div>
                <div className="login-form-container">
                    <form id="login-form" onSubmit={loginSubmit}>
                        <div className="login-input ">
                            <div className="login-input-icon">
                                <i className="bi bi-person-circle"></i>
                            </div>
                            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="login-input">
                            <div className="login-input-icon">
                                <i className="bi bi-lock"></i>
                            </div>
                            <input 
                            type={showPass ? "text" : "password" } 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} />
                            {password &&
                            <div className="pass-eye">
                            {!showPass? 
                            <i onClick={()=> setShowPass(true)} class="bi bi-eye-fill"></i> 
                            : 
                            <i onClick={()=> setShowPass(false)} class="bi bi-eye-slash-fill"></i>} 
                            </div>
                            }
                        </div>
                        <div id="err">{errMsg && <p>{errMsg}</p>}</div>
                        <button type="submit" className="login-btn">{loading ? <div className="follow-loader" ><SmallLoader /></div> : 'LOGIN'}</button>
                    </form>
                    <div className="signup-forget">
                        <Link to='/signup'><button>Sign Up</button></Link>
                        <Link to="/password/reset" >Forgot password?</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Login;