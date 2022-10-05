import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const URL = 'http://localhost:3000'

const login = async (form, cb) => {
  try {
    let result = await axios({
      method: 'POST',
      url: URL + '/home/login',
      data: form,
    })
    // console.log(result.data)
    if (result.data.level === 'admin') {
      const access_token = result.data.accessToken
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('level', result.data.level)
      Swal.fire({
        title: 'Login',
        text: 'Login Success',
        icon: 'success',
        confirmButtonText: 'Oke',
      }).then(async (result) => {
        if (result.isConfirmed) {
          cb(result.data)
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: `Forbidden`,
        text: `Error, please login using an admin account!`,
      })
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: `Error Status ${error.response.status}`,
      text: `Email and Password didn't match`,
    })
  }
}

export { login }
