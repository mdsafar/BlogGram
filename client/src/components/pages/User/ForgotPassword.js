import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword, forgotPasswordVerify } from '../../../actions/userAction'
import { CLEAR_ERRORS, RESET_PASSWORD_RESET } from '../../../constants/userConstants'
import SmallLoader from '../../layout/SmallLoader/SmallLoader'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { success, error, message, loading } = useSelector((state) => state.forgotPassword)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [mailErr, setMailErr] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showNewPass,setShowNewPass] = useState(false)
    const [showconfirmPass,setShowConfirmPass] = useState(false)

    function handleForgotPassword(e) {
        e.preventDefault();
        if (email !== '') {
            dispatch(forgotPassword(email))
        }

    }

    function handleForgotPassVerify(e) {
        e.preventDefault()
        if (newPass === confirmPass) {
            dispatch(forgotPasswordVerify(email, otp, newPass))
        } else {
            setErrMsg('Passwords need to be same')
        }
    }

    useEffect(() => {
        if (!message && error) {
            setMailErr(error)
            dispatch({ type: CLEAR_ERRORS })
        }

        if (message && error) {
            setErrMsg(error)
        }

        if (error === 'Token Expires') {
            setTimeout(() => {
                setMailErr('')
                setErrMsg('')
                setOtp('')
                setConfirmPass('')
                setNewPass('')
                dispatch({ type: RESET_PASSWORD_RESET });
            }, 2000);

        }

        if (success) {
            navigate('/login')
            dispatch({ type: RESET_PASSWORD_RESET })
        }

    }, [error, dispatch, navigate, success, message])



    return <>
        {message &&
            message === "OTP Sent" ? (
        <div className="login-container">
            <div className="loginform-box">
                <div className="otp-header">
                    <p>{`Otp sented to ${email}`}</p>
                </div>
                <div className="login-form-container">
                    <form onSubmit={handleForgotPassVerify}>
                        <div className="login-input">
                            <div className="login-input-icon">
                                <i className="bi bi-key-fill"></i>
                            </div>
                            <input type="number" placeholder="Otp" value={otp} required onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        <div className="login-input ">
                            <div className="login-input-icon">
                                <i className="bi bi-lock"></i>
                            </div>
                            <input 
                            type={showNewPass ? "text" : "password" } 
                            placeholder="New Password" 
                            value={newPass} required 
                            onChange={(e) => setNewPass(e.target.value)} />
                            {newPass &&
                                <div className="pass-eye">
                                    {!showNewPass ?
                                        <i onClick={() => setShowNewPass(true)} class="bi bi-eye-fill"></i>
                                        :
                                        <i onClick={() => setShowNewPass(false)} class="bi bi-eye-slash-fill"></i>}
                                </div>
                            }
                        </div>
                        <div className="login-input ">
                            <div className="login-input-icon">
                                <i className="bi bi-lock"></i>
                            </div>
                            <input 
                            type={showconfirmPass ? "text" : "password" } 
                            placeholder="Confirm Password" 
                            value={confirmPass} 
                            required onChange={(e) => setConfirmPass(e.target.value)} />
                            {confirmPass &&
                                <div className="pass-eye">
                                    {!showconfirmPass ?
                                        <i onClick={() => setShowConfirmPass(true)} class="bi bi-eye-fill"></i>
                                        :
                                        <i onClick={() => setShowConfirmPass(false)} class="bi bi-eye-slash-fill"></i>}
                                </div>
                            }
                        </div>
                        <div id="err">{errMsg && <p>{errMsg}</p>}</div>
                        <button type="submit" className="login-btn">{loading ? <div className="follow-loader" ><SmallLoader /></div> : 'Confirm'}</button>
                    </form>
                </div>
            </div>
        </div>
        ) : (
            <div className="login-container">
                <div className="loginform-box">
                    <div className="otp-header" style={{ margin: '10px' }} >
                        <p style={{ textAlign: "unset", fontSize: '15px' }}>Enter your email for otp to get back into your account.</p>
                    </div>
                    <div className="forgot-form-container">
                        <form id="login-form" onSubmit={handleForgotPassword}>
                            <div className="login-input ">
                                <div className="login-input-icon">
                                    <i className="bi bi-envelope-at"></i>
                                </div>
                                <input type="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div id="err">{mailErr && <p>{mailErr}</p>}</div>
                            <button type="submit" className="login-btn">Continue</button>
                        </form>
                        <div className="signup-forget">
                            <Link style={{ width: "100%" }} to='/login'>
                                <button style={{ width: "100%" }}>Go Back</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
}

export default ForgotPassword