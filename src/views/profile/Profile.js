import React, { useState, useEffect } from 'react'
import {
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardImage,
  CCardTitle,
  CCardText,
  CImage,
  CCardFooter,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormInput,
  CModalFooter,
} from '@coreui/react'

import { getProfile, updProfile, updPhotoProfile } from '../../axios/axiosProfile'

const Profile = () => {
  // ! bagian tampil PROFILE
  // tampilkan PROFILE
  const [profile, setProfile] = useState([])
  useEffect(() => {
    getProfile((res) => setProfile(res))
  }, [])
  // console.log(profile)

  // ! bagian edit destination
  // edit destination

  const [formEdit, setFormEdit] = useState({})
  // console.log(formEdit)
  useEffect(() => {
    getProfile((res) =>
      setFormEdit({
        name: res.name,
        email: res.email,
        password: res.password,
      }),
    )
  }, [])
  // const btnEdit = () => {
  //   getProfile((res) => {
  //     setFormEdit({
  //       name: res.name,
  //       email: res.email,
  //       password: res.password,
  //     })
  //   })
  // }

  const submitEdit = () => {
    // console.log(formEdit)
    updProfile(formEdit)
  }
  // console.log(formEdit)

  //tambah category
  const [formAdd, setFormAdd] = useState({
    name: '',
  })

  const [visible, setVisible] = useState(false)

  const [previewImgDesti, setPreviewImgDesti] = useState('')
  const [imgDestiId, setImgDestiId] = useState([])

  const loadImageDesti = (e) => {
    setImgDestiId(e.target.files[0])
    setPreviewImgDesti(URL.createObjectURL(e.target.files[0]))
  }

  const btnAddImg = () => {
    const formDataImg = new FormData()
    formDataImg.append('img', imgDestiId)
    updPhotoProfile(formDataImg)
  }

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Profile</strong>
        </CCardHeader>
        <CCardBody>
          <div className="clearfix">
            <CImage
              align="center"
              rounded
              src={'https://api-bali-journey.herokuapp.com/' + profile.img}
              width="200"
              height="200"
            />
          </div>
        </CCardBody>
        <CCardBody className="text-center">
          <CCardTitle className="text-center">{profile.name}</CCardTitle>
          <CCardText className="text-center">{profile.email}</CCardText>
          <CCardText className="text-center">Level : {profile.level}</CCardText>
          <CButton onClick={() => setVisible(!visible)}>Edit Profile</CButton>

          {/* MODAL EDIT */}
          <CModal scrollable size="xl" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Edit Profile </CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CCard>
                  {/* <CCardBody>
                    <div className="clearfix">
                      <CImage
                        align="center"
                        rounded
                        src={'http://localhost:3000/' + profile.img}
                        width="200"
                        height="200"
                      />
                    </div>
                  </CCardBody> */}
                  <CCardBody className="text-center">
                    {previewImgDesti ? (
                      <div className="col-auto">
                        <img src={previewImgDesti} height="200px" className="preview-gambar" />
                      </div>
                    ) : (
                      <div className="col-auto">
                        <img
                          src={'https://api-bali-journey.herokuapp.com/' + profile.img}
                          height="200px"
                          className="preview-gambar"
                        />
                      </div>
                    )}
                    <CCardBody>
                      <div className="col-auto ">
                        <CFormInput
                          type="file"
                          id="inputGroupFile01"
                          onChange={(e) => loadImageDesti(e)}
                          required
                        />
                      </div>
                    </CCardBody>
                  </CCardBody>
                </CCard>

                {/* NAME */}
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput
                  type="text"
                  value={formEdit.name}
                  className="form-control"
                  id="name"
                  onChange={(e) => setFormEdit({ ...formEdit, name: e.target.value })}
                />

                {/* Email */}
                <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                <CFormInput
                  type="text"
                  value={formEdit.email}
                  className="form-control"
                  id="email"
                  onChange={(e) => setFormEdit({ ...formEdit, email: e.target.value })}
                />

                {/* Password */}
                <CFormLabel htmlFor="exampleFormControlInput1">Password</CFormLabel>
                <CFormInput
                  type="password"
                  placeholder="Edit password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setFormEdit({ ...formEdit, password: e.target.value })}
                />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" type="submit" onClick={() => (submitEdit(), btnAddImg())}>
                Submit
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </CRow>
  )
}

export default Profile
