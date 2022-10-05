import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'https://api-bali-journey.herokuapp.com/'

const getPackageTrip = async (callback) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let dataDestination = await axios({
      method: 'GET',
      headers: { access_token },
      url: URL + '/admin/packageTrips',
    })
    callback(dataDestination.data)
  } catch (error) {
    console.log(error.response.data)
  }
}

const addPackageTrip = async (form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'POST',
      headers: { access_token },
      url: `${URL}/admin/packageTrips`,
      data: form,
    })
    Swal.fire('Create', 'Create Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const addPackDestination = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'POST',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const delDestPack = async (id) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'DELETE',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/dest/${id}`,
    })
    Swal.fire('Delete', 'Delete Success', 'success')
    window.location.reload(false)
  } catch (err) {
    console.log(err.response.data)
  }
}

const addImgPackageTrip = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'POST',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/img/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}
const getImgPackageTripId = async (id, cb) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let result = await axios({
      method: 'GET',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/img/${id}`,
    })
    cb(result.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const delImgPackageTrip = async (id) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'DELETE',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/img/${id}`,
    })
    Swal.fire('Delete', 'Delete Success', 'success')
    window.location.reload(false)
  } catch (err) {
    console.log(err.response.data)
  }
}

const getPackageTripById = async (id, cb) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let dataDestination = await axios({
      method: 'GET',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/${id}`,
    })
    cb(dataDestination.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const updPackageTrip = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'PUT',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const delPackageTrip = async (id) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'DELETE',
      headers: { access_token },
      url: `${URL}/admin/packageTrips/${id}`,
    })
    Swal.fire('Delete', 'Delete Success', 'success')
    window.location.reload(false)
  } catch (err) {
    console.log(err.response.data)
  }
}

export {
  getPackageTrip,
  addPackageTrip,
  addPackDestination,
  delDestPack,
  addImgPackageTrip,
  getImgPackageTripId,
  delImgPackageTrip,
  getPackageTripById,
  updPackageTrip,
  delPackageTrip,
}
