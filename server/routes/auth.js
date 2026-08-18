const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const UserSchema = require('../models/User');
const passport = require('passport');

const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhich isbuiltinreactappproject';

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    cb(null, id);
});

// Route 1: Registering A New User: POST: http://localhost:8181/api/auth/register
router.post('/register', [
    body('email', "Please Enter a Vaild Email").isEmail(),
    body('name', "Username should be at least 4 characters.").isLength({ min: 4 }),
    body('password', "Password Should Be At Least 8 Characters.").isLength({ min: 8 }),
    body('phone', "Phone Number Should Be 10 Digits.").isLength({ min: 10 }),
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    try {
        const checkMultipleUser1 = await UserSchema.findOne({ email: req.body.email });
        if (checkMultipleUser1) {
            return res.status(403).json({ error: "A User with this email address already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = await UserSchema.create({
            email: req.body.email,
            name: req.body.name,
            password: hash,
            phone: req.body.phone,
            role: req.body.role || "Doctor",
            createdAt: Date(),
        });

        const payload = {
            user: {
                id: newUser.id,
            }
        };
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({ authtoken });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }

});

// Route 2: Login User: POST: http://localhost:8181/api/auth/login
router.post('/login', [
    body('email', "Please Enter a Vaild Email").isEmail(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const theUser = await UserSchema.findOne({ email: req.body.email });
        req.session.email = req.body.email;

        if (theUser) {
            let checkHash = await bcrypt.compare(req.body.password, theUser.password);
            if (checkHash) {
                let payload = {
                    user: {
                        id: theUser.id
                    }
                };
                const authtoken = jwt.sign(payload, JWT_SECRET);
                return res.status(200).json({ authtoken });
            } else {
                return res.status(403).json({ error: "Invalid Credentials" });
            }
        } else {
            return res.status(403).json({ error: "Invalid Credentials" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;