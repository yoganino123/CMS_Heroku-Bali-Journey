import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'https://api-bali-journey.herokuapp.com'

const getReviewDestination = async (callback) => {
  try {
    const access_token = localStorage.getItem('access_token')
    let result = await axios({
      method: 'GET',
      headers: { access_token },
      url: URL + '/admin/reviews/destinations',
    })
    callback(result.data)
  } catch (error) {
    console.log(error.response.data)
  }
}
const updIsVioloation = async (id, form) => {
  try {
    const access_token = localStorage.getItem('access_token')
    await axios({
      method: 'PUT',
      headers: { access_token },
      url: `${URL}/admin/reviews/violations/${id}`,
      data: form,
    })
    Swal.fire('Update', 'Update Success', 'success')
    window.location.reload(true)
  } catch (err) {
    console.log(err.response.data)
  }
}

export { getReviewDestination, updIsVioloation }
