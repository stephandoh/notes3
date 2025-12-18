import axios from 'axios'
const baseURL = `${import.meta.env.VITE_API_URL}/api/notes`

const getAll = () => {
    return axios.get(baseURL).then(res => res.data)
}

const create = newObject =>{
    return axios.post(baseURL, newObject).then(res => res.data)
}

const update = (id, updatedObject) => {
    return axios.put(`${baseURL}/${id}`, updatedObject).then(res => res.data)
}

export default { getAll, create, update }