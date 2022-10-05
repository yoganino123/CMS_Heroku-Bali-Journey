import React, { useState, useEffect } from 'react'

import { CRow, CCol, CWidgetStatsF, CLink } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilArrowRight, cilCursor, cilFlightTakeoff, cilGroup, cilPuzzle } from '@coreui/icons'
import { getUser } from '../../axios/axiosUser'
import { getDestination } from '../../axios/axiosDestination'
import { getPackageTrip } from '../../axios/axiosPackageTrip'
import { getCategories } from '../../axios/axiosCategory'

const WidgetsDropdown = () => {
  // ! bagian tampil category
  // tampilkan category
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories((res) => setCategories(res))
  }, [])
  // ! bagian tampil USER
  // tampilkan USER
  const [user, setUser] = useState([])
  useEffect(() => {
    getUser((res) => setUser(res))
  }, [])

  // ! bagian tampil destination
  // tampilkan destination
  const [destination, setDestination] = useState([])
  useEffect(() => {
    getDestination((res) => setDestination(res))
  }, [])

  // GET ALL PACKAGE TRIP
  const [packageTrip, setPackageTrip] = useState([])
  useEffect(() => {
    getPackageTrip((res) => setPackageTrip(res))
  }, [])
  return (
    <CRow>
      {/* Category */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="secondary"
          footer={
            <CLink
              className="font-weight-bold font-xs text-medium-emphasis"
              href="http://localhost:3001/admin/category"
              rel="noopener norefferer"
              target="_blank"
            >
              View more
              <CIcon icon={cilArrowRight} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilPuzzle} height={24} />}
          title="Category"
          value={categories.length}
        />
      </CCol>
      {/* Destination */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="primary"
          footer={
            <CLink
              className="font-weight-bold font-xs text-medium-emphasis"
              href="http://localhost:3001/admin/destination"
              rel="noopener norefferer"
              target="_blank"
            >
              View more
              <CIcon icon={cilArrowRight} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilCursor} height={24} />}
          title="Destination"
          value={destination.length}
        />
      </CCol>

      {/* Package Trip */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="info"
          footer={
            <CLink
              className="font-weight-bold font-xs text-medium-emphasis"
              href="http://localhost:3001/admin/package-trip"
              rel="noopener norefferer"
              target="_blank"
            >
              View more
              <CIcon icon={cilArrowRight} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilFlightTakeoff} height={24} />}
          title="Package Trip"
          value={packageTrip.length}
        />
      </CCol>
      {/* USER */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsF
          className="mb-3"
          color="warning"
          footer={
            <CLink
              className="font-weight-bold font-xs text-medium-emphasis"
              href="http://localhost:3001/admin/user"
              rel="noopener norefferer"
              target="_blank"
            >
              View more
              <CIcon icon={cilArrowRight} className="float-end" width={16} />
            </CLink>
          }
          icon={<CIcon icon={cilGroup} height={24} />}
          title="User"
          value={user.length}
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
