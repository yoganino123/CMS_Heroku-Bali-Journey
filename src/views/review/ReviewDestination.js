import React, { useState, useEffect } from 'react'
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
  CAvatar,
  CCarousel,
  CCarouselItem,
  CImage,
  CCardImage,
  CCardText,
  CCardTitle,
  CCardSubtitle,
  CFormCheck,
  CAlert,
} from '@coreui/react'
import { getReviewDestination, updIsVioloation } from '../../axios/axiosReviewDestination'

const ReviewDestination = () => {
  // ! bagian tampil ReviewDestination
  // tampilkan ReviewDestination
  const [reviewDestination, setReviewDestination] = useState([])
  useEffect(() => {
    getReviewDestination((res) => setReviewDestination(res))
  }, [])

  // EDIT ISVIOLATION
  // const [formEdit, setFormEdit] = useState({})

  const btnEditTrue = (id) => {
    const FormEdit = {
      is_violation: true,
    }
    updIsVioloation(+id, FormEdit)
  }

  const btnEditFalse = (id) => {
    const FormEdit = {
      is_violation: false,
    }
    updIsVioloation(+id, FormEdit)
  }

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Review Destination</strong>
        </CCardHeader>
        <br></br>

        {/* ReviewDestination Table */}
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">User</CTableHeaderCell>
              <CTableHeaderCell>Review Destination</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {reviewDestination.map((revDest, index) => (
              <CTableRow v-for="item in tableItems" key={revDest.id}>
                {/* USER*/}
                <CTableDataCell className="text-center">
                  <CAvatar
                    size="xl"
                    src={'https://api-bali-journey.herokuapp.com/' + revDest.user.images}
                    status={revDest.user.status === 'active' ? 'success' : 'danger'}
                  />
                  <div>
                    <strong>{revDest.user.name}</strong>
                  </div>
                  <div className="small text-medium-emphasis">
                    <span>{revDest.user.email}</span>
                  </div>
                  <div className="small text-medium-emphasis">
                    <span>{revDest.user.status}</span>
                  </div>
                </CTableDataCell>

                {/* REVIEW */}
                <CTableDataCell className="text-center">
                  <CCard style={{ width: '18rem' }}>
                    <CCardBody>
                      <CCarousel controls>
                        {revDest.images.map((image, index) => (
                          <CCarouselItem key={image.id}>
                            <CImage
                              height={75}
                              className="d-block w-100"
                              src={'https://api-bali-journey.herokuapp.com/' + image.img}
                            />
                          </CCarouselItem>
                        ))}
                      </CCarousel>
                    </CCardBody>
                    <CCardBody>
                      <CCardTitle>{revDest.destination.name}</CCardTitle>
                      <CCardTitle>{revDest.is_violation}</CCardTitle>
                      <CCardText>
                        <Rating initialValue={revDest.rating} readonly size="20px" />
                      </CCardText>
                      <CCardText>{revDest.comment}</CCardText>
                    </CCardBody>
                  </CCard>
                </CTableDataCell>
                {/* ACTION */}
                <CTableDataCell>
                  {revDest.is_violation === true ? (
                    <CFormCheck
                      inline
                      id="inlineCheckbox1"
                      onClick={() => btnEditFalse(revDest.id)}
                      label="Comment is violation"
                      defaultChecked
                    />
                  ) : (
                    <CFormCheck
                      inline
                      id="inlineCheckbox1"
                      onClick={() => btnEditTrue(revDest.id)}
                      label="Comment is violation"
                    />
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </CRow>
  )
}

export default ReviewDestination
