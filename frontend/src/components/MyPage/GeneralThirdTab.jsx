import React, {useState, useEffect} from "react";
import axios from "axios";
import './MyPageMain.scss'
// import { usePagination } from "@material-ui/lab";
import Pagination from "@material-ui/lab/Pagination";

const GeneralThirdTab = () => {

    const loginUser = JSON.parse(window.sessionStorage.getItem('user'))

    const [messageList, setMessageList] = useState([])
    const [messageType, setMessageType] = useState(true)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        get_received_message()
    }, [])

    const get_received_message = () => {
        setMessageType(true)
        axios.get(`${process.env.REACT_APP_URL}/message/received?id=` + loginUser.id)
            .then(res => {
                setMessageList(res.data.messages)
                setCount(parseInt(res.data.messages.length / 5) + 1)
                setPage(1)
            }).catch(err => {
            console.log(err)
        })
    }

    const get_sent_message = () => {
        setMessageType(false)
        axios.get(`${process.env.REACT_APP_URL}/message/sent?id=` + loginUser.id)
            .then(res => {
                setMessageList(res.data.messages)
                setCount(parseInt(res.data.messages.length / 5) + 1)
                setPage(1)
            }).catch(err => {
            console.log(err)
        })
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="one_tab col-2">
            <div className="messageBox">
                <div className="center">
                    <div className="selectBtn" onClick={get_received_message}>받은 메시지</div>
                    <div className="selectBtn" onClick={get_sent_message}>보낸 메시지</div>
                </div>
                <div>
                    {messageList.slice((page-1)*5, page*5).map(m => {
                        if(m) {
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
                        }
                    })}
                </div>
            </div>
            <Pagination className="topMargin center" size={"small"} count={count} color={"secondary"} page={page} variant="outlined" shape="rounded" onChange={handleChange} />
        </div>
    )
}

export default GeneralThirdTab