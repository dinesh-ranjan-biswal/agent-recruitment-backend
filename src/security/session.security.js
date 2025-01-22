import session from 'express-session';


const sessionCustom = session({
    secret:process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week (in milliseconds)
    }
});

export default sessionCustom;
