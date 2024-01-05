import React from 'react'
import { useSelector } from 'react-redux'
import useLongPress from "./useLongPress"


const Messages = ({ chats, onSelect, isSelected }) => {
    const { user: loggedUser } = useSelector((state) => state.user)

    const msgSend = chats?.user === loggedUser?._id


    const onLongPress = () => {
        if (msgSend) {
            onSelect(chats._id);
        }
    };

    const onClick = () => {
        if (msgSend) {
            onSelect('')
        }
    }



    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };

    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);


    return (
        <div className={`${msgSend ? 'send-container' : 'receive-container'}`}>
            <div>
                <div {...longPressEvent}
                    className={`message ${msgSend ? 'message-send' : 'message-receive'}`}>
                    <p  >{chats.message}</p>
                    <div className="message-time">
                        <p>{chats.time}</p>
                    </div>
                </div>
          {isSelected && (
                    <div className="checkbox-wrapper-30" onClick={() => onSelect('')}>
                        <span className="checkbox">
                            <input type="checkbox" defaultChecked={true} />
                            <svg>
                                <use href="#checkbox-30" className="checkbox"></use>
                            </svg>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                            <symbol id="checkbox-30" viewBox="0 0 22 22">
                                <path fill="none" stroke="#2E8A99" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13 c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2" />
                            </symbol>
                        </svg>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Messages;