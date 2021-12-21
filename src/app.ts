import config from "@utils/config"  // Initialize config
import "@utils/init_database"       // Initialize database
import "@utils/init_passport"       // Initialize passport
import express from "express"
import log from "@libs/log"
import root_router from "@routes"
import log_middleware from '@middlewares/logger'
import errorhandler_middleware from '@middlewares/errorhandler'
import passport from "passport"
import session from "express-session"

const app = express()
app.use(express.json())
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: config.session.maxAge,
        httpOnly: true,
        secure: config.session.secure
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(log_middleware())
app.use("/", root_router)
app.use(errorhandler_middleware())

app.listen(config.server_port, "localhost", () => {
    log.info("Server started on port", config.server_port)
})