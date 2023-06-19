import  express  from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import router from "./routes/index.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use("/api", routes)

app.get("/", (_req, res) => {
    res.send("Hello there megha - API")
})

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    })

})

export default app;
// http://localhost:4000/api/v1/auth/login
// http://localhost:4000/api/v1/auth/logout