module.exports = {
    getTest(req, res, next) {
        res.status(200).json({
            body: "new new test :D"
        })
    }
}
