let Axios = require('axios');

const API = () => {
    const get = async({path, table, search}) => {
        try {
            let res = await Axios.get(`${path}?table=${table}&search=${search ?? '*'}`);
            return res
        } catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
        }
    }

    const post = async({path, params}) => {
        try {
            let res = await Axios.post(`${path}`, params);
            return res
        } catch (err) {
			if(err.response.status === 500) {
				console.log('Server problem');
			} else {
				console.log(err.response.data.msg);
			}
        }
    }
    return{ get, post }
};

export default API();