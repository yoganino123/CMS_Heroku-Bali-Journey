import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'https://api-bali-journey.herokuapp.com'

const getDestination = async (callback) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let dataDestination = await axios({
      method: 'GET',
      headers: { access_token },
      url: URL + '/admin/destinations',
    })
    callback(dataDestination.data)
  } catch (error) {
    console.log(error.response.data)
  }
}

const getDestinationById = async (id, cb) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let dataDestination = await axios({
      method: 'GET',
      headers: { access_token },
      url: `${URL}/admin/destinations/${id}`,
    })
    cb(dataDestination.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const addDestination = async (form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'POST',
      headers: { access_token },
      url: `${URL}/admin/destinations`,
      data: form,
    })
    Swal.fire('Create', 'Create Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const delDestination = async (id) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'DELETE',
      headers: { access_token },
      url: `${URL}/admin/destinations/${id}`,
    })
    Swal.fire('Delete', 'Delete Success', 'success')
    window.location.reload(false)
  } catch (err) {
    console.log(err.response.data)
  }
}

const getImgDestiId = async (id, cb) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let result = await axios({
      method: 'GET',
      headers: { access_token },
      url: `${URL}/admin/destinations/img/${id}`,
    })
    cb(result.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const updDestination = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'PUT',
      headers: { access_token },
      url: `${URL}/admin/destinations/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const addImgDestination = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'POST',
      headers: { access_token },
      url: `${URL}/admin/destinations/img/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const delImgDestination = async (id) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'DELETE',
      headers: { access_token },
      url: `${URL}/admin/destinations/img/${id}`,
    })
    Swal.fire('Delete', 'Delete Success', 'success')
    window.location.reload(false)
  } catch (err) {
    console.log(err.response.data)
  }
}

export {
  getDestinationById,
  getDestination,
  addDestination,
  delDestination,
  updDestination,
  getImgDestiId,
  addImgDestination,
  delImgDestination,
}
