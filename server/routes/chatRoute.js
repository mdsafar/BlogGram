import express from 'express'
import { verifyUser } from '../Middlewares/authMiddleware.js'
import { deleteChat, getChats, getMyInbox } from '../Controllers/chatController.js'

const router = express.Router()

router.route('/direct/inbox').get(verifyUser,getMyInbox)
router.route('/direct/:roomId').get(verifyUser,getChats)
router.route('/direct/d/:roomId/:chatId').delete(verifyUser,deleteChat)


export default router