function nameToUpperCase(req, res, next) {
    let name = req.body.name;
    if (name) {
        req.body.name = name.toUpperCase()
        next();
    } else {
        res
        .status(400)
        .json({ error: "Please Enter A Name"})
        next();
    }
}

module.exports = nameToUpperCase;