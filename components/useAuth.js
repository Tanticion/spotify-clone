import { useState, useEffect } from "react";
import axios from "axios";
const Auth = (code) => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() =>{
        axios.post(`http://localhost:3000/api/hello`, {
            code
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
        })

    },[code])

    useEffect(() => {
        const internal = setInterval(() =>{
            axios.post(`http://localhost:3000/api/refresh`, {
                refreshToken
            }).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
                
            })
    

        }, (expiresIn - 60) * 1000)
        return() => clearInterval(internal)

       
    },[refreshToken,expiresIn])
    return accessToken

}

export default Auth;