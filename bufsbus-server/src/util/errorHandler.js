module.exports = (err, req, res, next) => {
    console.log('error!!\n' + err.stack);
    res.status(500).json({ error: err.stack });
}