module.exports = {
    getTest(req, res, next) {
        res.status(200).json({
            body: process.env.MONGODB_URI.substring(0, 10)
        })
    }
}
