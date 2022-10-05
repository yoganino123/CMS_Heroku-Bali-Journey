import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'https://api-bali-journey.herokuapp.com/'

const getUser = async (callback) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let result = await axios({
      method: 'GET',
      headers: { access_token },
      url: URL + '/admin/users',
    })
    callback(result.data)
  } catch (error) {
    console.log(error.response.data)
  }
}

const getUserById = async (id, cb) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let result = await axios({
      method: 'GET',
      headers: { access_token },
      url: `${URL}/admin/users/${id}`,
    })
    cb(result.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const updUser = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'PUT',
      headers: { access_token },
      url: `${URL}/admin/users/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const addUser = async (form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'POST',
      headers: { access_token },
      url: `${URL}/admin/users`,
      data: form,
    })
    Swal.fire('Create', 'Create Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

export { getUser, getUserById, updUser, addUser }
