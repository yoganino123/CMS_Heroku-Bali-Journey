import React, { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilFlightTakeoff, cilLockLocked, cilUser } from '@coreui/icons'
import { login } from 'src/axios/axiosLogin'

const Login = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  // useEffect(() => {
  //   if (cookies !== undefined) {
  //     let parsing = JSON.parse(cookies)
  //     if (parsing.level === 'admin') {
  //       navigate('/admin')
  //     } else {
  //       navigate('/')
  //     }
  //   }
  // }, [cookies])
  console.log(form)

  const submitHandler = () => {
    // loginUser(form, (result) => {
    //   if (result.level === 'user') {
    //     navigate('/user')
    //   } else if (result.level === 'admin') {
    //     navigate('/admin')
    //   } else {
    //     navigate('/login')
    //   }
    // })
    login(form, () => {
      navigate('/admin/dashboard')
    })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to admin account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      {/* EMAIL */}
                      <CFormInput
                        placeholder="Email"
                        autoComplete="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      {/* PASSWORD */}
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {/* LOGIN BUTTON */}
                        <CButton color="primary" className="px-4" onClick={() => submitHandler()}>
                          {' '}
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <CIcon icon={cilFlightTakeoff} height={70} />
                  </div>
                  <div>
                    <br></br>
                    <h2>Welcome to</h2>
                    <h2>Bali Journey App</h2>
                    <h2>Dashboard</h2>
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p> */}
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
