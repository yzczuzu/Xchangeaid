import axios from 'axios'

export const register = newUser => {
    return axios
    .post('http://localhost:8080/users/Register', {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        birthday: newUser.birthday
    })
    .then(res => {
        console.log("Registered")
    })
}

export const login = user => {
    return axios
    .post('http://localhost:8080/users/Login',{
        email: user.email,
        password: user.password
    })
    .then(res => {
        console.log("login")
        localStorage.setItem('usertoken',res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}