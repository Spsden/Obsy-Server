const register = async(req,res)=> {
    res.send("regisrer route")

}

const login = async(req,res)=> {
    res.send("login route")

}

module.exports = {
    register,
    login
}