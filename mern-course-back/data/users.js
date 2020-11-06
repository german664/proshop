import bcrypt from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "German Mora",
        email: "german@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "Paola Di Toro",
        email: "paola@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
]

export default users