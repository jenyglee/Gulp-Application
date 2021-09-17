import axios from "axios";
const login = async (member) => {
    try {
        const response = await axios({
            method: "POST",
            url: "http://192.168.0.21:login",
            data: member,
        });
        console.log(response);
    } catch (error) {
        throw error;
    }
};

export { login };
