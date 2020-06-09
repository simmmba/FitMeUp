import express from "express"
const messageRouter = express.Router();

let message = require("../controllers/messageController")

messageRouter.get('', message.get_detail)
messageRouter.get('/received', message.get_received_list)
messageRouter.get('/sent', message.get_sent_list)
messageRouter.post('', message.send_message)
// messageRouter.put('/', )
// messageRouter.delete('/', )


export default messageRouter