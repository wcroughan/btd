const api_root = "/api/v1/";
// const no_auth_routes = ["test"].map(v => api_root + v);
const LOGIN_TIMEOUT_DAYS = 30;
var ObjectID = require('mongodb').ObjectID;

module.exports = function (db) {
    const createUser = async function (email, hpw) {
        console.log("creating new user")
        newUserDetail = { email, hpw };
        const user = await db.collection("users").insertOne(newUserDetail);
        console.log(user);

        const dayentry = {
            id: "day_default",
            userid: user.insertedId,
            items: [
                {
                    id: 0,
                    text: "Start a todo list",
                    isDone: true
                },
                {
                    id: 1,
                    text: "Tap an item to mark it as completed",
                    isDone: false
                },
                {
                    id: 2,
                    text: "Edit the default list by clicking the ellipses to the right of the list title",
                    isDone: false
                },
            ]
        };
        const weekentry = {
            id: "week_default",
            userid: user.insertedId,
            items: [
                {
                    id: 0,
                    text: "Skip leg day",
                    isDone: false
                },
            ]
        }
        await db.collection("lists").insertMany([dayentry, weekentry]);
    };

    return async function (req, res, next) {
        req.authenticated = false;
        if (req.method === "GET" && !req.url.includes(api_root)) {
            //No auth required
            next();
            return;
        }

        if (req.method === "GET" && req.url.includes(api_root + "checktkn")) {
            const authDetail = { _id: ObjectID(req.query.tkn) };
            const authres = await db.collection("auth").findOne(authDetail);
            if (authres === null || new Date() > authres.expireDate) {
                // console.log("no auth found for tkn", authDetail, authres);
                console.log("check token failed")
                res.json({ 'success': true, 'authenticated': false });
                return;
            } else {
                // console.log("auth found for tkn", authDetail, authres);
                res.json({ 'success': true, 'authenticated': true });
                return
            }
        }

        if (req.method === "GET" && req.url.includes(api_root + "createUser")) {
            const email = req.query.email;
            const hpw = req.query.hpw;
            if (email === undefined || hpw === undefined) {
                console.log("missing necessary signup info");
                return;
            }
            uniqueDetail = { email };
            const existingUser = await db.collection("users").findOne(uniqueDetail);
            // console.log("createuser: findone returned", existingUser);
            if (existingUser !== null) {
                // console.log("user already exists");
                res.send({ 'error': "User already exists" });
            } else {
                await createUser(email, hpw);
                res.status(200).json({ "success": true });
            }
            return;

        }

        if (req.method === "GET" && req.url.includes(api_root + "login")) {
            const email = req.query.email;
            const hpw = req.query.hpw;
            if (email === undefined || hpw === undefined) {
                console.log("missing necessary signup info");
                return;
            }
            userDetail = { email, hpw };
            const existingUser = await db.collection("users").findOne(userDetail);
            // console.log("login: findone returned", existingUser);
            if (existingUser !== null) {
                // console.log("user exists");
                const expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + LOGIN_TIMEOUT_DAYS);
                const authDoc = {
                    uid: existingUser._id,
                    expireDate
                }
                const inres = await db.collection("auth").insertOne(authDoc);
                console.log("logged in user with email", email, "auth", inres.insertedId);
                res.send({ 'success': true, auth_token: inres.insertedId, expireDate });
            } else {
                console.log("login failure");
                res.send({ 'success': false });
            }

            return;
        }

        //not logging in, creating a new user, or doing something that doesn't require auth.
        //check auth token and pass on info to next function
        if (req.query.auth_token === undefined) {
            console.log("Needs auth, but no auth_token present", req.query)
            res.send({ 'error': "Needs auth, but no auth_token present" });
            return;
        }

        const authDetail = { _id: ObjectID(req.query.auth_token) };
        const authres = await db.collection("auth").findOne(authDetail);
        if (authres !== null) {
            if (new Date() < authres.expireDate) {
                // console.log("auth success:", authres);
                console.log("auth success");
                req.authenticated = true;
                req.uid = authres.uid;
                next();
            } else {
                console.log("Auth expired:", authres);
                res.send({ 'error': "auth expired" });
            }
        } else {
            console.log("Auth was null", authDetail)
        }
    }
}
