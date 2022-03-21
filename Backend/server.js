require('dotenv').config();
const express = require("express");
var cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

const cors = require('cors')
const jwt = require('jsonwebtoken');

const authRouter = require('./routers/auth-route.js');
const groupRouter = require('./routers/group-route.js');
const notesRouter = require('./routers/notes-route.js');
const subjectsRouter = require('./routers/subjects-route.js');
const scheduleRouter = require('./routers/schedule-route.js');

const authMiddlware = require('./middleware/auth-middleware.js');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', authMiddlware.authenticateToken, groupRouter);
app.use('/api', authMiddlware.authenticateToken, notesRouter);
app.use('/api', authMiddlware.authenticateToken, subjectsRouter);
app.use('/api', authMiddlware.authenticateToken, scheduleRouter);

app.listen(port);
