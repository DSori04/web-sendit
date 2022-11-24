import axios from 'axios'

export async function axiosRequest({method, endpoint, data}){
    await axios({
        method: method,
        url: `http://localhost:5000${endpoint}`,
        data: data,
    }).then(
        (res) => {
            return res
        }
    ).catch(
        (err) => {
            return err
        }
    )
}
