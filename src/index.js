require("dotenv-safe").config();
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const app = express();
const passport = require('passport')
const discordStrategy = require("./routers/strategies/discordstrategy")
const session = require("express-session")

app.use(cookieParser());
app.use(express.json())



app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use(cors({ origin: '*' }))


app.use(passport.initialize())


const authRouter = require('./routers/auth');
const reportRouter = require('./routers/report');
const reportMainRouter = require('./routers/report_main');
const adminRouter = require('./routers/admin');


const verifyJwt = require("./middleware/commun");
const isTokenAdmin = require("./middleware/admin");





app.use("/auth", authRouter)
app.use("/report", verifyJwt, reportRouter)
app.use("/reportmain", verifyJwt, reportMainRouter)
app.use("/admin", isTokenAdmin, adminRouter)

app.listen(process.env.PORT, () => {
  console.log(`Conectado na porta ${process.env.PORT}`)
})

