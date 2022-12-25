export const getLoggedInUser = async ()  => {
    try {
        const res = await fetch(`http://localhost:9000/users/user`, {
            method: 'GET',
            credentials: 'include'
        });

        return await res.json();
    } catch (err) {
        throw new Error("Please login to continue");
    }
}