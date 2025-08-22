import axios from "axios";

const apiServices = axios.create({
    baseURL: "http://10.100.13.44:3057/api/",
    //  baseURL: "http://172.16.239.190:3057/api/",
   withCredentials:true,
   headers: {
    "Content-Type": "application/json",  
}
});

export default apiServices;

