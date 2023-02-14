export const getLoggedInUser = async ()  => {
    try {
        const res = await fetch('http://'+process.env.REACT_APP_BASE_URL+'/users/user', {
            method: 'GET',
            credentials: 'include'
        });

        return await res.json();
    } catch (err) {
        throw new Error("Please login to continue");
    }
}