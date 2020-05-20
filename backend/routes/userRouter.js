import express from "express"
const userRouter = express.Router();

let user = require('../controllers/userController')

userRouter.post("/signup", user.create_user);
userRouter.get("/myinfo", user.read_user);
userRouter.put("/myinfo", user.update_user);
userRouter.delete("/myinfo", user.delete_user);

userRouter.get("/login", user.login);
userRouter.get("/duplicate", user.duplicate);

userRouter.get("/stylistlist", user.stylist_list);
userRouter.get("/search", user.search);
export default userRouter;