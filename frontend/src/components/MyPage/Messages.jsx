import React, {useState, useEffect} from "react";
import axios from "axios";
import './MyPageMain.scss'

const Messages = () => {

    const loginUser = window.sessionStorage.getItem('user')

    const [messageList, setMessageList] = useState([])
    const [messageType, setMessageType] = useState(true)

    useEffect(() => {
        get_received_message()
    }, [])

    const get_received_message = () => {
        setMessageType(true)
        axios.get(`${process.env.REACT_APP_URL}/message/received?id=` + 1)
            .then(res => {
                setMessageList(res.data.messages)
                console.log(res.data.messages)
            }).catch(err => {
            console.log(err)
        })
    }

    const get_sent_message = () => {
        setMessageType(false)
        axios.get(`${process.env.REACT_APP_URL}/message/sent?id=` + 1)
            .then(res => {
                setMessageList(res.data.messages)
                console.log(res.data.messages)
            }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <div className="center">
                <div className="selectBtn" onClick={get_received_message}>받은 메시지</div>
                <div className="selectBtn" onClick={get_sent_message}>보낸 메시지</div>
            </div>
            <div>
                {messageList.map(m => {
                    return (
                        <div className="center" key={m.id}>
                            <div className="message center">
                                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cbdef037365169.573db7853cebb.jpg" alt={"Profile Image"} className="smallProfile"/>
                                <div className="">
                                    {m.readed?(<div>읽음</div>):(<div>안 읽음</div>)}
                                    {messageType?(<div>{m.source.nickname}님의 메시지</div>):(<div>{m.target.nickname}님에게 메시지</div>)}
                                    <div>{m.createdAt}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Messages