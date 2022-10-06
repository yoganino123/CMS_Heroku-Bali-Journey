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
  CTableBody,
  CTableDataCell,
  CAvatar,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormSelect,
  CModalFooter,
  CFormInput,
} from '@coreui/react'
import { getUser, getUserById, updUser, addUser } from '../../axios/axiosUser'
import CIcon from '@coreui/icons-react'
import { cilNotes, cilPeople, cilTrash } from '@coreui/icons'

const User = () => {
  // ! bagian tampil USER
  // tampilkan USER
  const [user, setUser] = useState([])
  useEffect(() => {
    getUser((res) => setUser(res))
  }, [])

  //tambah user
  const [formAdd, setFormAdd] = useState({
    name: '',
    email: '',
    password: '',
  })
  const submitAdd = () => {
    addUser(formAdd)
  }

  // ! bagian edit USER
  // edit USER
  const [userId, setUserId] = useState()
  const [formEdit, setFormEdit] = useState({})
  // console.log(formEdit)

  const btnEdit = (id) => {
    getUserById(id, (res) => {
      setUserId(id)
      setFormEdit({
        level: res.level,
        status: res.status,
      })
    })
  }

  const submitEdit = () => {
    // console.log(formEdit)
    updUser(userId, formEdit)
  }
  // Modal
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>User</strong>
        </CCardHeader>
        {/* Button Add New User */}
        <CCardBody>
          <CButton onClick={() => setVisible3(!visible)}>Add New User</CButton>
          <CModal visible={visible3} onClose={() => setVisible3(false)}>
            <CModalHeader onClose={() => setVisible3(false)}>
              <CModalTitle>Add New user</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, name: e.target.value })}
                  required
                  className="form-control"
                  id="name"
                  placeholder="Insert Name..."
                />
                <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, email: e.target.value })}
                  required
                  className="form-control"
                  id="email"
                  placeholder="Insert Email..."
                />
                <CFormLabel htmlFor="exampleFormControlInput1">Password</CFormLabel>
                <CFormInput
                  type="password"
                  onChange={(e) => setFormAdd({ ...formAdd, password: e.target.value })}
                  required
                  className="form-control"
                  id="password"
                  placeholder="Insert Password..."
                />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible3(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={() => submitAdd()}>
                Add
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
        {/* User Table */}
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell>User</CTableHeaderCell>
              <CTableHeaderCell>Level</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          {/* ISI TABLE DESTINATION */}
          <CTableBody>
            {user.map((usr, index) => (
              <CTableRow v-for="item in tableItems" key={usr.id}>
                {/* NO */}
                <CTableDataCell>
                  <CAvatar
                    size="md"
                    src={'https://api-bali-journey.herokuapp.com/' + usr.img}
                    status={usr.status === 'active' ? 'success' : 'danger'}
                  />
                </CTableDataCell>
                {/* USER */}
                <CTableDataCell>
                  <strong>{usr.name}</strong>
                  <div className="small text-medium-emphasis">
                    <span>{usr.email}</span>
                  </div>
                  <div className="small text-medium-emphasis">
                    <span>{usr.status}</span>
                  </div>
                </CTableDataCell>
                {/* LEVEL */}
                <CTableDataCell>
                  <div>{usr.level}</div>
                </CTableDataCell>
                {/* ACTION */}
                <CTableDataCell className="text-center">
                  {/* BUTTON EDIT LEVEL */}
                  <CButton
                    color="dark"
                    shape="rounded-pill"
                    onClick={() => (btnEdit(usr.id), setVisible(!visible))}
                  >
                    <CIcon icon={cilNotes}></CIcon> Level
                  </CButton>

                  <CModal visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader onClose={() => setVisible(false)}>
                      <CModalTitle>Edit User Level</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CForm>
                        <CFormLabel htmlFor="exampleFormControlInput1">Level</CFormLabel>
                        <CFormSelect
                          id="inputGroupSelect01"
                          onChange={(e) => setFormEdit({ level: e.target.value })}
                          required
                        >
                          <option hidden value={formEdit.level}>
                            {formEdit.level}
                          </option>
                          <option value={'user'}>user</option>
                          <option value={'admin'}>admin</option>
                        </CFormSelect>
                      </CForm>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                      </CButton>
                      <CButton color="primary" type="submit" onClick={() => submitEdit()}>
                        Submit
                      </CButton>
                    </CModalFooter>
                  </CModal>
                  <a> </a>
                  <CButton
                    color="primary"
                    shape="rounded-pill"
                    onClick={() => (btnEdit(usr.id), setVisible2(!visible))}
                  >
                    <CIcon icon={cilNotes}></CIcon> Status
                  </CButton>
                  <CModal visible={visible2} onClose={() => setVisible2(false)}>
                    <CModalHeader onClose={() => setVisible2(false)}>
                      <CModalTitle>Edit User Status</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CForm>
                        <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                        <CFormSelect
                          id="inputGroupSelect01"
                          onChange={(e) => setFormEdit({ status: e.target.value })}
                          required
                        >
                          <option hidden value={formEdit.status}>
                            {formEdit.status}
                          </option>
                          <option value={'active'}>Active</option>
                          <option value={'inactive'}>In Active</option>
                          <option value={'blocked'}>Blocked</option>
                        </CFormSelect>
                      </CForm>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible2(false)}>
                        Close
                      </CButton>
                      <CButton color="primary" type="submit" onClick={() => submitEdit()}>
                        Submit
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </CRow>
  )
}

export default User
