import axios from 'axios'

const mainAPI = axios.create({
    baseURL: "http://services.franciscosantos.net"
})


export default mainAPI