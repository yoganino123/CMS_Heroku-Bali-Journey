import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'https://api-bali-journey.herokuapp.com/'

const getCategories = async (callback) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let dataCategories = await axios({
      method: 'GET',
      headers: { access_token },
      url: URL + '/admin/categories',
    })
    callback(dataCategories.data)
  } catch (error) {
    console.log(error.response.data)
  }
}

const getCategoryById = async (id, cb) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let dataCategory = await axios({
      method: 'GET',
      headers: { access_token },
      url: `${URL}/admin/categories/${id}`,
    })
    cb(dataCategory.data)
  } catch (err) {
    console.log(err.response.data)
  }
}

const addCategory = async (form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'POST',
      headers: { access_token },
      url: `${URL}/admin/categories`,
      data: form,
    })
    Swal.fire('Create', 'Create Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

const delCategory = async (id) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'DELETE',
      headers: { access_token },
      url: `${URL}/admin/categories/${id}`,
    })
    Swal.fire('Delete', 'Delete Success', 'success')
    window.location.reload(false)
  } catch (err) {
    console.log(err.response.data)
  }
}

const updCategory = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'PUT',
      headers: { access_token },
      url: `${URL}/admin/categories/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

export { getCategories, getCategoryById, addCategory, delCategory, updCategory }
