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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormInput,
  CAlert,
  CFormTextarea,
  CModalFooter,
  CCardText,
  CFormSelect,
  CCardImage,
  CImage,
  CAvatar,
  CCarousel,
  CCarouselItem,
} from '@coreui/react'

import {
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
} from '../../axios/axiosPackageTrip'
import { getDestination } from '../../axios/axiosDestination'

import { cilTrash, cilBurn, cilNotes, cilFlightTakeoff, cilImage, cilCursor } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Rating } from 'react-simple-star-rating'

const PackageTrip = () => {
  // GET ALL PACKAGE TRIP
  const [packageTrip, setPackageTrip] = useState([])
  useEffect(() => {
    getPackageTrip((res) => setPackageTrip(res))
  }, [])

  //tambah destination
  const [formAdd, setFormAdd] = useState({
    name: '',
    description: '',
    price: 0,
    rating: 0,
  })

  // Alert ( Image tidak boleh kosong )
  const [msg, setMsg] = useState(false)

  const [img, setImg] = useState()
  const [preview, setPreview] = useState('')

  const loadImage = (e) => {
    setImg(e.target.files[0])
    setPreview(URL.createObjectURL(e.target.files[0]))
  }

  const submitAdd = () => {
    if (img) {
      const formData = new FormData()
      formData.append('img', img)
      formData.append('name', formAdd.name)
      formData.append('description', formAdd.description)
      formData.append('price', formAdd.price)
      formData.append('rating', formAdd.rating)

      // console.log(formData)
      addPackageTrip(formData)
    } else {
      setMsg(true)
    }
  }

  // ADD DESTINATION --PACKAGE TRIP--

  const [idPackTrip, setIdPackTrip] = useState([])
  // console.log(idPackTrip)
  const [formDataDestiPack, setFormDataDestiPack] = useState({
    destinationId: 0,
  })
  // console.log(idPackTrip)

  const btnAddDestiTrip = () => {
    addPackDestination(idPackTrip, formDataDestiPack)
  }

  // GET ALL DESTINATION

  const [destinations, setDestinations] = useState([])
  useEffect(() => {
    getDestination((res) => setDestinations(res))
  }, [])

  // GET Image PACKAGE TRIP By id
  const [getPackTripImg, setPackTripImg] = useState([])

  const btnImg = (id) => {
    getImgPackageTripId(id, (res) => {
      setPackTripImg(res)
    })
  }

  // ADD IMAGE PACKAGE TRIP BY ID

  const [idImg, setIdImg] = useState([])
  const [imgPackageTripId, setImgPackageTripId] = useState([])
  const [previewImgPackageTrip, setPreviewImgPackageTrip] = useState('')

  const loadImagePackageTrip = (e) => {
    setImgPackageTripId(e.target.files[0])
    setPreviewImgPackageTrip(URL.createObjectURL(e.target.files[0]))
  }

  const btnAddImg = () => {
    const formDataImg = new FormData()
    formDataImg.append('img', imgPackageTripId)
    addImgPackageTrip(idImg, formDataImg)
  }

  // edit PACKAGE TRIP
  const [ptId, setPtId] = useState()
  const [formEdit, setFormEdit] = useState({})
  // console.log(formEdit)

  const btnEdit = (id) => {
    getPackageTripById(id, (res) => {
      setPtId(id)
      setFormEdit({
        name: res.name,
        price: res.price,
        description: res.description,
      })
    })
  }
  // console.log(formEdit)

  const submitEdit = () => {
    // console.log(formEdit)
    updPackageTrip(ptId, formEdit)
  }
  // console.log(catId)

  // MODAL
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Package Trip</strong>
        </CCardHeader>
        <CCardBody>
          {/* BUTTON ADD PACKAGE TRIP */}
          <CButton onClick={() => (setVisible(!visible), setMsg(false))}>
            Add New Package Trip
          </CButton>

          {/* MODAL ADD PACKAGE TRIP */}
          <CModal scrollable size="xl" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader onClose={() => setVisible(false)}>
              <CModalTitle>Add New Package Trip</CModalTitle>
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
                  placeholder="Insert Package Trip Name..."
                />

                {/* Description */}
                <CFormLabel htmlFor="exampleFormControlInput1">Price</CFormLabel>
                <CFormInput
                  type="text"
                  onChange={(e) => setFormAdd({ ...formAdd, price: e.target.value })}
                  required
                  className="form-control"
                  id="price"
                  placeholder="Insert Price..."
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
        {/* PackageTrip Table */}
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>
                <CIcon icon={cilFlightTakeoff} />
              </CTableHeaderCell>
              <CTableHeaderCell>Package Trip</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>

              <CTableHeaderCell>
                <CIcon icon={cilCursor} /> Destination
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          {/* ISI TABLE */}
          <CTableBody>
            {packageTrip.map((pt, index) => (
              <CTableRow v-for="item in tableItems" key={pt.id}>
                {/* ID */}
                <CTableDataCell>
                  <CAvatar size="xl">
                    <CCarousel controls>
                      {pt.images.map((image, index) => (
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
                  <strong>{pt.name}</strong>
                  <div>
                    <Rating initialValue={pt.rating} readonly size="20px" />
                  </div>

                  <div className="small text-medium-emphasis">
                    <span>Price : {pt.price}</span>
                  </div>
                </CTableDataCell>

                {/* DESCRIPTION */}
                <CTableDataCell className="text-center">
                  <CCard style={{ width: '18rem' }}>
                    <CCardBody>
                      <CCardText>
                        <div>{pt.description}</div>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CTableDataCell>

                {/* DESTINATION */}
                <CTableDataCell>
                  <CTable align="middle" className="mb-0 border" hover responsive>
                    {/* <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>Name</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead> */}
                    <CTableBody>
                      {pt.destinations.map((ptDest, index) => (
                        <CTableRow v-for="item in tableItems" key={ptDest.id}>
                          <CTableDataCell>
                            <div>{ptDest.destination.name} </div>
                          </CTableDataCell>
                          {/* Delete */}
                          <CTableDataCell>
                            <CButton
                              color="danger"
                              size="sm"
                              variant="outline"
                              shape="rounded-pill"
                              onClick={() => delDestPack(ptDest.id)}
                            >
                              <CIcon icon={cilTrash}></CIcon>
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CTableDataCell>

                {/* ACTION */}
                <CTableDataCell className="text-center">
                  {/* BUTTON ADD Destination */}

                  <CButton
                    color="primary"
                    variant="outline"
                    shape="rounded-pill"
                    onClick={() => (setVisible2(!visible), setIdPackTrip(pt.id))}
                  >
                    + <CIcon icon={cilCursor} />
                  </CButton>

                  {/* MODAL ADD DESTINATION */}

                  <CModal size="xl" visible={visible2} onClose={() => setVisible2(false)}>
                    <CModalHeader onClose={() => setVisible2(false)}>
                      <CModalTitle>Add Destination</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CFormSelect
                        id="inputGroupSelect01"
                        onChange={(e) =>
                          setFormDataDestiPack({
                            ...formDataDestiPack,
                            destinationId: e.target.value,
                          })
                        }
                        required
                      >
                        <option hidden>Choose Destination...</option>
                        {destinations.map((dest, index) => (
                          <option key={dest.id} value={dest.id}>
                            {dest.name}
                          </option>
                        ))}
                      </CFormSelect>
                      <CModalBody>
                        <CButton color="primary" onClick={() => btnAddDestiTrip()}>
                          Add Destinations
                        </CButton>
                      </CModalBody>

                      <CModalBody></CModalBody>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible2(false)}>
                        Close
                      </CButton>
                    </CModalFooter>
                  </CModal>

                  {/* BUTTON ADD IMAGE */}
                  {/* ADD IMAGE */}
                  <a> </a>
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="rounded-pill"
                    onClick={() => (btnImg(pt.id), setVisible3(!visible), setIdImg(pt.id))}
                  >
                    + <CIcon icon={cilImage}></CIcon>
                  </CButton>

                  <CModal
                    scrollable
                    size="xl"
                    visible={visible3}
                    onClose={() => setVisible3(false)}
                  >
                    <CModalHeader onClose={() => setVisible3(false)}>
                      <CModalTitle>Image</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CModalBody>
                        {/* BUTTON PILIH FILE */}
                        <CFormInput
                          type="file"
                          id="inputGroupFile01"
                          onChange={(e) => loadImagePackageTrip(e)}
                          required
                        />

                        {previewImgPackageTrip ? (
                          <div className="col-auto">
                            <img
                              src={previewImgPackageTrip}
                              height="300px"
                              className="preview-gambar"
                            />
                          </div>
                        ) : (
                          ''
                        )}

                        <CModalBody>
                          {/* BUTTON ADD IMAGE */}
                          <CModalBody>
                            <CButton color="primary" onClick={() => btnAddImg(pt.id)}>
                              Add Image
                            </CButton>
                          </CModalBody>

                          {/* CARD IMAGE */}
                          <CRow className="align-items-start">
                            {getPackTripImg.map((ptImg, index) => (
                              <CCard key={index} style={{ width: '18rem' }}>
                                <CCardImage
                                  orientation="top"
                                  height={200}
                                  src={'https://api-bali-journey.herokuapp.com/' + ptImg.img}
                                />
                                <CCardBody>
                                  <CButton
                                    color="danger"
                                    onClick={() => delImgPackageTrip(ptImg.id)}
                                  >
                                    <CIcon icon={cilTrash}></CIcon>
                                  </CButton>
                                </CCardBody>
                              </CCard>
                            ))}
                          </CRow>
                        </CModalBody>
                      </CModalBody>
                    </CModalBody>
                  </CModal>

                  {/* EDIT */}
                  <div>
                    <br></br>
                    <CButton
                      color="dark"
                      shape="rounded-pill"
                      onClick={() => (btnEdit(pt.id), setVisible4(!visible))}
                    >
                      <CIcon icon={cilNotes}></CIcon>
                    </CButton>
                    <a> </a>

                    {/* MODAL EDIT */}
                    <CModal
                      scrollable
                      size="xl"
                      visible={visible4}
                      onClose={() => setVisible4(false)}
                    >
                      <CModalHeader onClose={() => setVisible4(false)}>
                        <CModalTitle>Edit Package Trip</CModalTitle>
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

                          {/* PRICE */}
                          <CFormLabel htmlFor="exampleFormControlInput1">Price</CFormLabel>
                          <CFormInput
                            type="text"
                            value={formEdit.price}
                            className="form-control"
                            id="price"
                            onChange={(e) => setFormEdit({ price: e.target.value })}
                          />

                          {/* DESCRIPTION */}
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
                        <CButton color="secondary" onClick={() => setVisible4(false)}>
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
                      onClick={() => delPackageTrip(pt.id)}
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

export default PackageTrip
