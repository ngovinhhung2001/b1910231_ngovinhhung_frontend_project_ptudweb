import axios from "axios";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    credentials: true
};

export default (baseURL) => {
    return axios.create({
        baseURL,
        ...commonConfig,
    });
};