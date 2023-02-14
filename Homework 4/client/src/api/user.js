import axios from 'axios';

export const getLoggedInUser = async ()  => {
    try {
        const res = await axios({
            method: 'GET',
            url:process.env.REACT_APP_BASE_URL+'/users/user',
            withCredentials:true
        });
        console.log(res)
        return res['data']
    } catch (err) {
        throw new Error("Please login to continue");
    }
}