import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'http://localhost:3000'

const getProfile = async (callback) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let dataDestination = await axios({
      method: 'GET',
      headers: { access_token },
      url: URL + '/admin/profiles',
    })
    callback(dataDestination.data)
  } catch (error) {
    console.log(error.response.data)
  }
}

const updProfile = async (form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'PUT',
      headers: { access_token },
      url: `${URL}/admin/profiles`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const updPhotoProfile = async (form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'PUT',
      headers: { access_token },
      url: `${URL}/admin/profiles/img`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

export { getProfile, updProfile, updPhotoProfile }
