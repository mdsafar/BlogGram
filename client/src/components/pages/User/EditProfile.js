import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./EditProfile.css"
import { getUserProfile, updateProfile } from "../../../actions/userAction"
import SmallLoader from "../../layout/SmallLoader/SmallLoader"
import Loader from "../../layout/Loader/Loader"
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants"
import ChangePassword from "./ChangePassword"
import Header from "../../layout/Header/Header"

const EditProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { updateLoading, isUpdated, user, loading } = useSelector((state) => state.profile)
    const [showChangePass, setShowChangePass] = useState(false)
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');


    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])


    const editProfileSubmit = (e) => {
        e.preventDefault();

        const userData = {
            fullname: fullname,
            username: username,
            bio: bio,
            avatar: image
        }

        dispatch(updateProfile(userData))
    }


    const handleRemoveImage = () => {
        setImage('remove')
        setImagePreview("https://i.pinimg.com/736x/85/76/b9/8576b9b3558132762f387f216b9495e9.jpg")
    }


    const userImagesChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                setImage(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };


    useEffect(() => {
        if (user) {
            setFullname(user.fullname)
            setUsername(user.username)
            setBio(user.bio)
            setImagePreview(user.avatar.url)
        }

        if (isUpdated) {
            navigate('/profile')
            dispatch({ type: UPDATE_PROFILE_RESET })
        }


    }, [user, isUpdated, navigate, dispatch])


    function closeChangePassword() {
        setShowChangePass(false)
    }



    return <>
        <Header />
        {loading ? (
            <Loader />
        ) : (
            <section className="editProfile">
                <div className="editProfile-container">
                    <div className="editProfile-top">
                        <div>
                            <img src={imagePreview} alt="" />
                        </div>
                        <div>
                            {user?.avatar.public_id !== "default_img" ? (
                                <>
                                    <input type="file" id="file-input" name="file-input" onChange={userImagesChange} />
                                    <label for="file-input">Change Photo</label>
                                    <button onClick={handleRemoveImage}>Remove Photo</button>
                                </>

                            ) : (
                                <>
                                    <input type="file" id="file-input" name="file-input" onChange={userImagesChange} />
                                    <label for="file-input">Upload Photo</label>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="edit-form">
                        <form
                            onSubmit={editProfileSubmit}
                        >
                            <div>
                                <h4>Name</h4>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="name"
                                    required
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                            </div>
                            <div>
                                <h4>Username</h4>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <h4>Bio</h4>
                                <textarea
                                    name="bio"
                                    placeholder="Bio"
                                    rows="4"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <h2 onClick={() => setShowChangePass(true)}>Change Password?</h2>
                            </div>

                            <button type="submit">
                                {updateLoading ? <div className="follow-loader" ><SmallLoader /></div> : 'Update'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        )}
        {showChangePass && <ChangePassword closeChangePassword={closeChangePassword} />}
    </>

}

export default EditProfile