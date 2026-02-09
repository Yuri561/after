import axios from "axios"

const URL = "http://127.0.0.1:8000"

export const RegisterUser = async (formData:any) => {
    return axios.post(`${URL}/register`, formData, {
        headers: {
            "Content-Type": "application/json"
        }
    })

}