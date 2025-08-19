import axios from 'axios';

const AapiServices = axios.create({
   baseURL: 'http://10.100.13.44:3057/api/user/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AapiServices;