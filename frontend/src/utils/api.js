let Axios = require('axios');

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
    let res = await get({ path: path, filter: filter});
    return res.data;
}

export { get, post, fetch }