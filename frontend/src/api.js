let Axios = require('axios');

const API = () => {
    const get = async({path, filter}) => {
        try {
            let res = await Axios.get(`${path}${filter ? `?filter=${filter}`:''}`);
            return res;
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }

    const post = async({path, params}) => {
        try {
            let res = await Axios.post(`${path}`, params);
            return res;
        } catch (err) {
            console.log(err.response.data.msg);
        }
    }

    const fetch = async(path, filter) => {
        let res = await get({ path: path, filter: filter ?? null });
        return res.data;
    }

    return{ get, post, fetch }
};

export default API();