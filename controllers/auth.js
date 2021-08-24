
exports.register = (req, res) => {

    const { name, email, password } = req.body;

    res.send({
        message: 'Nice'
    })

}