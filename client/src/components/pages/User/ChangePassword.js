import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { changePassword } from "../../../actions/userAction";
import SmallLoader from "../../layout/SmallLoader/SmallLoader";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD_RESET } from "../../../constants/userConstants";


const ChangePassword = ({closeChangePassword}) => {
        
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {changeLoading,isChanged,changeError} = useSelector((state)=> state.profile)
    const [oldPass,setOldPass]= useState('')
    const [newPass,setNewPass]= useState('')
    const [confirmPass,setConfirmPass]= useState('')
    const [errMsg,setErrMsg] = useState('')
    const [showOldPass,setShowOldPass] = useState(false)
    const [showNewPass,setShowNewPass] = useState(false)
    const [showconfirmPass,setShowConfirmPass] = useState(false)

    const changePasswordSubmit = (e) => {
        e.preventDefault()
        if(newPass === confirmPass){
            dispatch(changePassword(oldPass,newPass))
        }else{
            setErrMsg('Passwords need to be same')
        }
    }

    useEffect(()=>{
       if(isChanged){
        closeChangePassword()
        dispatch({type:CHANGE_PASSWORD_RESET})
       }

       if(changeError){
        setErrMsg(changeError)
        dispatch({type:CHANGE_PASSWORD_RESET})
       }


    },[isChanged,navigate,closeChangePassword,dispatch,changeError])


    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };

    }, []);

    return (
        <div className="overlay">
            <div className="changePassword">
                <div className="changePassword-container edit-form">
                    <form onSubmit={changePasswordSubmit}>
                        <div id="changePassword-cancel">
                            <i onClick={closeChangePassword} className="bi bi-x-lg"></i>
                        </div>
                        <div>
                            <h4>Old Password</h4>
                            <input
                                name="oldPassword"
                                type={showOldPass ? "text" : "password" } 
                                placeholder="Old Password"
                                required
                                onChange={(e)=> setOldPass(e.target.value)}
                            />
                            {oldPass &&
                                <div className="changePass-eye">
                                    {!showOldPass ?
                                        <i onClick={() => setShowOldPass(true)} class="bi bi-eye-fill"></i>
                                        :
                                        <i onClick={() => setShowOldPass(false)} class="bi bi-eye-slash-fill"></i>}
                                </div>
                            }
                        </div>
                        <div>
                            <h4>New Password</h4>
                            <input
                                name="newPassword"
                                type={showNewPass ? "text" : "password" } 
                                placeholder="New Password"
                                required
                                onChange={(e)=> setNewPass(e.target.value)}
                            />
                            {newPass &&
                                <div className="changePass-eye">
                                    {!showNewPass ?
                                        <i onClick={() => setShowNewPass(true)} class="bi bi-eye-fill"></i>
                                        :
                                        <i onClick={() => setShowNewPass(false)} class="bi bi-eye-slash-fill"></i>}
                                </div>
                            }
                        </div>
                        <div>
                            <h4>Confirm Password</h4>
                            <input
                                name="confirmPassword"
                                type={showconfirmPass ? "text" : "password" } 
                                placeholder="Confirm Password"
                                onChange={(e)=> setConfirmPass(e.target.value)}
                            />
                            {confirmPass &&
                                <div className="changePass-eye">
                                    {!showconfirmPass ?
                                        <i onClick={() => setShowConfirmPass(true)} class="bi bi-eye-fill"></i>
                                        :
                                        <i onClick={() => setShowConfirmPass(false)} class="bi bi-eye-slash-fill"></i>}
                                </div>
                            }
                        </div>
                        <div id="err-msg">{errMsg && <p>{errMsg}</p>}</div>
                        <button type="submit">
                            {changeLoading ? <div className="follow-loader" ><SmallLoader /></div> : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default ChangePassword;