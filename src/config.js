import axios from "axios"

export const axiosInstance = axios.create({
    baseURL : 'https://bloggerashu.herokuapp.com/'
   // baseURL:'http://localhost:5000/'
})