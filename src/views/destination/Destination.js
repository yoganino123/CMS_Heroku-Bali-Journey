import React, { useState, useEffect } from 'react'

import {
  getDestination,
  getDestinationById,
  addDestination,
  delDestination,
  updDestination,
  getImgDestiId,
  addImgDestination,
  delImgDestination,
} from '../../axios/axiosDestination'
import { getCategories } from '../../axios/axiosCategory'
import { Rating } from 'react-simple-star-rating'

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
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CAlert,
  CCardImage,
  CCardText,
  CCarousel,
  CCarouselItem,
  CImage,
  CAvatar,
} from '@coreui/react'
import { cilTrash, cilBurn, cilNotes, cilCursor, cilImage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const Destination = () => {
  // ! bagian tampil destination
  // tampilkan destination
  const [destination, setDestination] = useState([])
  useEffect(() => {
    getDestination((res) => setDestination(res))
  }, [])
  // console.log(destination)

  //tambah destination
  const [formAdd, setFormAdd] = useState({
    name: '',
    categoryId: 0,
    description: '',
    address: '',
    open_day: '',
    open_time: '',
    map_link: '',
  })

  // Alert ( Image tidak boleh kosong )
  const [msg, setMsg] = useState(false)

  const submitAdd = () => {
    if (img) {
      const formData = new FormData()
      formData.append('img', img)
      formData.append('name', formAdd.name)
      formData.append('categoryId', formAdd.categoryId)
      formData.append('description', formAdd.description)
      formData.append('address', formAdd.address)
      formData.append('open_day', formAdd.open_day)
      formData.append('open_time', formAdd.open_time)
      formData.append('map_link', formAdd.map_link)
      // console.log(formData)
      addDestination(formData)
    } else {
      setMsg(true)
    }
  }

  // ! bagian edit destination
  // edit destination
  const [catId, setCatId] = useState()
  const [formEdit, setFormEdit] = useState({})
  // console.log(formEdit)

  const btnEdit = (id) => {
    getDestinationById(id, (res) => {
      setCatId(id)
      setFormEdit({
        name: res.name,
        categoryId: res.categoryId,
        description: res.description,
        address: res.address,
        open_day: res.open_day,
        open_time: res.open_time,
        map_link: res.map_link,
        img: res.img,
      })
    })
  }

  const submitEdit = () => {
    // console.log(formEdit)
    updDestination(catId, formEdit)
  }
  // console.log(catId)

  const [img, setImg] = useState()
  const [preview, setPreview] = useState('')

  const loadImage = (e) => {
    setImg(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  // Modal
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible4, setVisible4] = useState(false)

  // ! bagian tampil category
  // tampilkan category
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories((res) => setCategories(res))
  }, [])
  // console.log(categories)

  // GET Image Destination By id
  const [getDestiImg, setDestiImg] = useState([])

  const btnImg = (id) => {
    getImgDestiId(id, (res) => {
      setDestiImg(res)
    })
  }
  // console.log(getDestiImg)

  // ADD IMAGE DESTINATION BY ID

  const [idImg, setIdImg] = useState([])
  const [imgDestiId, setImgDestiId] = useState([])
  const [previewImgDesti, setPreviewImgDesti] = useState('')

  const loadImageDesti = (e) => {
    setImgDestiId(e.target.files[0])
    setPreviewImgDesti(URL.createObjectURL(e.target.files[0]))
  }

  const btnAddImg = () => {
    const formDataImg = new FormData()
    formDataImg.append('img', imgDestiId)
    addImgDestination(idImg, formDataImg)
  }
  // console.log(btnAddImg)
  // Alert ( Image tidak boleh kosong )

  // console.log(idImg)

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Destination</strong>
        </CCardHeader>

        {/* Button Add Destination */}
        <CCardBody>
          <CButton onClick={() => (setVisible(!visible), setMsg(false))}>
            Add New Destination
          </CButton>

          {/* MODAL ADD DESTINATION */}
          <CModal scrollable size="xl" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Add New Destination</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {/* ALERT */}
              {msg ? (
                <CAlert color="danger" className="d-flex align-items-center">
                  <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
                  <div>Image cannot be empty</div>
                </CAlert>
              ) : (
                ''
              )}
              <CForm>
                {/* Name */}
                <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, name: e.target.value })}
                  required
                  className="form-control"
                  id="name"
                  placeholder="Insert Destination Name..."
                />

                {/* Category */}
                <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                <CFormSelect
                  id="inputGroupSelect01"
                  onChange={(e) => setFormAdd({ ...formAdd, categoryId: e.target.value })}
                  required
                >
                  <option hidden>Choose Category...</option>
                  {categories.map((cat, index) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </CFormSelect>

                {/* Address */}
                <CFormLabel htmlFor="exampleFormControlInput1">Address</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, address: e.target.value })}
                  required
                  className="form-control"
                  id="address"
                  placeholder="Insert Address..."
                />

                {/* Open Day */}
                <CFormLabel htmlFor="exampleFormControlInput1">Open Day</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, open_day: e.target.value })}
                  required
                  className="form-control"
                  id="open_day"
                  placeholder="Insert Open Day..."
                />

                {/* Open Time */}
                <CFormLabel htmlFor="exampleFormControlInput1">Open Time</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, open_time: e.target.value })}
                  required
                  className="form-control"
                  id="open_time"
                  placeholder="Insert Open Time..."
                />

                {/* Maps Link */}
                <CFormLabel htmlFor="exampleFormControlInput1">Map Link</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, map_link: e.target.value })}
                  required
                  className="form-control"
                  id="map_link"
                  placeholder="Insert Map Link..."
                />

                {/* Description */}
                <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                <CFormTextarea
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, description: e.target.value })}
                  required
                  className="form-control"
                  id="description"
                  placeholder="Insert Description..."
                />

                {/* Image */}
                <CFormLabel htmlFor="exampleFormControlInput1">Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="inputGroupFile01"
                  onChange={(e) => loadImage(e)}
                  required
                />
                {preview ? (
                  <div className="col-auto">
                    <img src={preview} height="300px" className="preview-gambar" />
                  </div>
                ) : (
                  ''
                )}
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

        {/* Destination Table */}
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>
                <CIcon icon={cilCursor} />
              </CTableHeaderCell>
              <CTableHeaderCell>Destination</CTableHeaderCell>
              <CTableHeaderCell>Category</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          {/* ISI TABLE DESTINATION */}
          <CTableBody>
            {destination.map((dest, index) => (
              <CTableRow v-for="item in tableItems" key={dest.id}>
                {/* ID */}
                <CTableDataCell>
                  <CAvatar size="xl">
                    <CCarousel controls>
                      {dest.images.map((image, index) => (
                        <CCarouselItem key={image.id}>
                          <CImage
                            height={50}
                            className="d-block w-100"
                            src={'https://api-bali-journey.herokuapp.com/' + image.img}
                          />
                        </CCarouselItem>
                      ))}
                    </CCarousel>
                  </CAvatar>
                </CTableDataCell>

                {/* NAME */}
                <CTableDataCell>
                  <strong>{dest.name}</strong>
                  <div className="small text-medium-emphasis">
                    <Rating initialValue={dest.rating} readonly size="20px" />
                  </div>
                  <div className="small text-medium-emphasis">
                    <span>{dest.open_day}</span>
                  </div>
                  <div className="small text-medium-emphasis">
                    <span>{dest.open_time}</span>
                  </div>
                </CTableDataCell>

                {/* DESTINATION */}
                <CTableDataCell>
                  <div>{dest.category.name}</div>
                </CTableDataCell>

                {/* ADDRESS */}
                <CTableDataCell>
                  <div>{dest.address}</div>
                  <div className="small text-medium-emphasis">
                    <a href={dest.map_link}>{dest.map_link}</a>
                  </div>
                </CTableDataCell>

                {/* DESCRIPTION */}
                <CTableDataCell>
                  {/* DESCRIPTION */}
                  <CTableDataCell>
                    <CCard style={{ width: '18rem' }}>
                      <CCardBody>
                        <CCardText>
                          <div>{dest.description}</div>
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CTableDataCell>
                </CTableDataCell>

                {/* ACTION */}
                <CTableDataCell className="text-center">
                  {/* ADD IMAGE */}
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="rounded-pill"
                    onClick={() => (btnImg(dest.id), setVisible4(!visible), setIdImg(dest.id))}
                  >
                    + <CIcon icon={cilImage} />
                  </CButton>

                  {/* MODAL ADD IMAGE */}
                  <CModal
                    scrollable
                    size="xl"
                    visible={visible4}
                    onClose={() => setVisible4(false)}
                  >
                    <CModalHeader onClose={() => setVisible4(false)}>
                      <CModalTitle>Image</CModalTitle>
                    </CModalHeader>

                    <CModalBody>
                      <CModalBody>
                        {/* BUTTON PILIH FILE */}
                        <CFormInput
                          type="file"
                          id="inputGroupFile01"
                          onChange={(e) => loadImageDesti(e)}
                          required
                        />
                        {previewImgDesti ? (
                          <div className="col-auto">
                            <img src={previewImgDesti} height="300px" className="preview-gambar" />
                          </div>
                        ) : (
                          ''
                        )}
                        <CModalBody>
                          {/* BUTTON ADD IMAGE */}
                          <CButton color="primary" onClick={() => btnAddImg(dest.id)}>
                            Add Image
                          </CButton>
                        </CModalBody>
                      </CModalBody>

                      {/* CARD IMAGE */}
                      <CRow className="align-items-start">
                        {getDestiImg.map((destImg, index) => (
                          <CCard key={index} style={{ width: '18rem' }}>
                            <CCardImage
                              orientation="top"
                              height={200}
                              src={'https://api-bali-journey.herokuapp.com/' + destImg.img}
                            />
                            <CCardBody>
                              <CButton color="danger" onClick={() => delImgDestination(destImg.id)}>
                                <CIcon icon={cilTrash}></CIcon>
                              </CButton>
                            </CCardBody>
                          </CCard>
                        ))}
                      </CRow>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible4(false)}>
                        Close
                      </CButton>
                    </CModalFooter>
                  </CModal>

                  {/* EDIT BUTTON */}
                  <div>
                    <br></br>

                    <CButton
                      color="dark"
                      shape="rounded-pill"
                      onClick={() => (btnEdit(dest.id), setVisible2(!visible))}
                    >
                      <CIcon icon={cilNotes}></CIcon>
                    </CButton>
                    <a> </a>

                    {/* MODAL EDIT */}
                    <CModal
                      scrollable
                      size="xl"
                      visible={visible2}
                      onClose={() => setVisible2(false)}
                    >
                      <CModalHeader onClose={() => setVisible2(false)}>
                        <CModalTitle>Edit Destination </CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        <CForm>
                          {/* NAME */}
                          <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                          <CFormInput
                            type="text"
                            value={formEdit.name}
                            className="form-control"
                            id="name"
                            onChange={(e) => setFormEdit({ name: e.target.value })}
                          />

                          {/* CATEGORY */}

                          <CFormLabel htmlFor="exampleFormControlInput1">Category</CFormLabel>
                          <CFormSelect
                            id="inputGroupSelect01"
                            onChange={(e) => setFormEdit({ categoryId: e.target.value })}
                            required
                          >
                            <option hidden>Category</option>
                            {categories.map((cat, index) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </CFormSelect>

                          {/* ADDRESS */}
                          <CFormLabel htmlFor="exampleFormControlInput1">Address</CFormLabel>
                          <CFormInput
                            type="text"
                            value={formEdit.address}
                            className="form-control"
                            id="address"
                            onChange={(e) => setFormEdit({ address: e.target.value })}
                          />

                          {/* OPEN DAY */}
                          <CFormLabel htmlFor="exampleFormControlInput1">Open Day</CFormLabel>
                          <CFormInput
                            type="text"
                            value={formEdit.open_day}
                            className="form-control"
                            id="open_day"
                            onChange={(e) => setFormEdit({ open_day: e.target.value })}
                          />

                          {/* OPEN TIME */}
                          <CFormLabel htmlFor="exampleFormControlInput1">Open Time</CFormLabel>
                          <CFormInput
                            type="text"
                            value={formEdit.open_time}
                            className="form-control"
                            id="open_time"
                            onChange={(e) => setFormEdit({ open_time: e.target.value })}
                          />

                          {/* MAP LINK */}
                          <CFormLabel htmlFor="exampleFormControlInput1">Map Link</CFormLabel>
                          <CFormInput
                            type="text"
                            value={formEdit.map_link}
                            className="form-control"
                            id="map_link"
                            onChange={(e) => setFormEdit({ map_link: e.target.value })}
                          />

                          {/* DESCRIPTION  */}

                          <CFormLabel htmlFor="exampleFormControlInput1">Description</CFormLabel>
                          <CFormTextarea
                            type="text"
                            value={formEdit.description}
                            className="form-control"
                            id="description"
                            onChange={(e) => setFormEdit({ description: e.target.value })}
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
                    <CButton
                      color="danger"
                      shape="rounded-pill"
                      onClick={() => delDestination(dest.id)}
                    >
                      <CIcon icon={cilTrash}></CIcon>
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </CRow>
  )
}

export default Destination
