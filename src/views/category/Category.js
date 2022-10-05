import React, { useState, useEffect } from 'react'

import {
  getCategories,
  getCategoryById,
  addCategory,
  delCategory,
  updCategory,
} from '../../axios/axiosCategory'

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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CForm,
} from '@coreui/react'
import { cilNotes, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Category = () => {
  // ! bagian tampil category
  // tampilkan category
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories((res) => setCategories(res))
  }, [])
  // console.log(categories)

  //tambah category
  const [formAdd, setFormAdd] = useState({
    name: '',
  })
  const submitAdd = () => {
    addCategory(formAdd)
  }

  // ! bagian edit category
  // edit category
  const [catId, setCatId] = useState()
  const [formEdit, setFormEdit] = useState({})

  const btnEdit = (id) => {
    getCategoryById(id, (res) => {
      setCatId(id)
      setFormEdit({ name: res.name })
    })
  }

  const submitEdit = () => {
    // console.log(formEdit)
    updCategory(catId, formEdit)
  }
  // console.log(formAdd)
  // console.log(formEdit)
  // console.log(catId)

  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Category</strong>
        </CCardHeader>

        {/* Button Add Category */}
        <CCardBody>
          <CButton onClick={() => setVisible(!visible)}>Add New Category</CButton>
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Add New Category</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, name: e.target.value })}
                  required
                  className="form-control"
                  id="name"
                  placeholder="Insert Category Name..."
                />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={() => submitAdd()}>
                Add
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>

        {/* Category Table */}
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>No</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Category Name</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          {/* ISI TABLE CATEGORY */}
          <CTableBody>
            {categories.map((cat, index) => (
              <CTableRow v-for="item in tableItems" key={cat.id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <strong>{cat.name}</strong>
                </CTableDataCell>

                {/* ACTION */}
                <CTableDataCell className="text-center">
                  <CButton
                    color="dark"
                    shape="rounded-pill"
                    onClick={() => (btnEdit(cat.id), setVisible2(!visible))}
                  >
                    <CIcon icon={cilNotes}></CIcon>
                  </CButton>
                  <a> </a>
                  <CModal visible={visible2} onClose={() => setVisible2(false)}>
                    <CModalHeader onClose={() => setVisible2(false)}>
                      <CModalTitle>Edit Category </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CForm>
                        <CFormInput
                          type="text"
                          value={formEdit.name}
                          className="form-control"
                          id="name"
                          onChange={(e) => setFormEdit({ name: e.target.value })}
                        />
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

                  {/* Button Delete */}
                  <CButton color="danger" shape="rounded-pill" onClick={() => delCategory(cat.id)}>
                    <CIcon icon={cilTrash}></CIcon>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </CRow>
  )
}

export default Category
