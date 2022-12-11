import bcrypt from 'bcryptjs'

export const login = async ({email, password} = {}) => {
    const user = {email, password};
    
    try {
        const res = await fetch('http://localhost:9000/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
        });

        return await res.json();
    } catch (err) {
        throw new Error(`Can't login. ${err}`);
    }
};

export const logout = async ()  => {
    try {
        const res = await fetch(`${process.env.BEOURGUEST_APP_API_URL}/users/logout`, {
            method: 'GET',
            credentials: 'include'
        });

        return await res.json();
    } catch (err) {
        console.log(err);
    }
}

export const getLoggedInUser = async ()  => {
    try {
        const res = await fetch(`http://localhost:9000/users/login/users/user`, {
            method: 'GET',
            credentials: 'include'
        });

        return await res.json();
    } catch (err) {
        throw new Error("Please login to continue");
    }
}