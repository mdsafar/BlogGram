import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signup, verifyEmail } from '../../../actions/userAction'
import { CLEAR_ERRORS } from '../../../constants/userConstants'
import SmallLoader from '../../layout/SmallLoader/SmallLoader'

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { success, error, loading } = useSelector((state) => state.user)
    const { error: otpErr, success: otpSuccess, loading: otpLoading } = useSelector((state) => state.otp)
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [otpBox, setOtpBox] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [otp, setOtp] = useState('')
    const [showPass,setShowPass] = useState(false)
    const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))


    function handleSignup(e) {
        e.preventDefault();
        const userData = {
            email,
            fullname,
            username,
            password
        }

        dispatch(signup(userData))
    }


    const handleVerifyEmail = (e) => {
        e.preventDefault();
        dispatch(verifyEmail(userFromLocalStorage?._id, otp))
    }

    useEffect(() => {
        if (error) {
            setErrMsg(error)
            dispatch({ type: CLEAR_ERRORS })
        }

        if (success) {
            setOtpBox(true)
        } else {
            setOtpBox(false)
        }

        if (otpSuccess) {
            navigate('/')
        }

    }, [success, navigate, error, dispatch, otpSuccess])


    return <>
        {!otpBox ? (
            <div className="login-container">
                <div className="signupform-box">
                    <div className="signup-header">
                        <h1>Hey, Welcome to BlogGram</h1>
                    </div>
                    <div className="login-form-container">
                        <form id="login-form" onSubmit={handleSignup}>
                            <div className="login-input ">
                                <div className="login-input-icon">
                                    <i className="bi bi-envelope-at"></i>
                                </div>
                                <input type="email" 
                                placeholder="Email" 
                                required 
                                onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="login-input">
                                <div className="login-input-icon">
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <input type="text" 
                                placeholder="Fullname" 
                                required 
                                onChange={(e) => setFullname(e.target.value)} />
                            </div>
                            <div className="login-input ">
                                <div className="login-input-icon">
                                    <i className="bi bi-person-circle"></i>
                                </div>
                                <input 
                                type="text" 
                                placeholder="Username" 
                                required 
                                onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="login-input ">
                                <div className="login-input-icon">
                                    <i className="bi bi-lock"></i>
                                </div>
                                <input 
                                type={showPass ? "text" : "password" } 
                                placeholder="Password" 
                                required 
                                onChange={(e) => setPassword(e.target.value)} />
                            {password &&
                            <div className="pass-eye">
                            {!showPass? <i onClick={()=> setShowPass(true)} class="bi bi-eye-fill"></i> : <i onClick={()=> setShowPass(false)} class="bi bi-eye-slash-fill"></i>} 
                            </div>
                            }
                            </div>
                            <div id="err">{errMsg && <p>{errMsg}</p>}</div>
                            <button type="submit" className="login-btn">{loading ? <div className="follow-loader" ><SmallLoader /></div> : 'SignUp'}</button>
                        </form>
                        <div className="signup-forget">
                            <Link to='/login'><button>Login</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="login-container">
                <div className="otp-box">
                    <div className="otp-header">
                        <p>{`Otp sented to ${userFromLocalStorage?.email}. Please verify `}</p>
                    </div>
                    <div className="login-form-container">
                        <form onSubmit={handleVerifyEmail}>
                            <div className="login-input ">
                                <div className="login-input-icon">
                                    <i className="bi bi-key-fill"></i>
                                </div>
                                <input type="number" placeholder="Otp" required onChange={(e) => setOtp(e.target.value)} />
                            </div>
                            <div id="err">{otpErr && <p>{otpErr}</p>}</div>
                            <button type="submit" className="login-btn">{otpLoading ? <div className='follow-loader'><SmallLoader /></div> : 'Verify'}</button>
                        </form>
                    </div>
                </div>
            </div>
        )}

    </>
}

export default SignUp