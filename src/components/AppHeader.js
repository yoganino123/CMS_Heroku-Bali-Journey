import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { getProfile } from '../axios/axiosProfile'

import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // ! bagian tampil PROFILE
  // tampilkan PROFILE
  const [profile, setProfile] = useState([])
  useEffect(() => {
    getProfile((res) => setProfile(res))
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {/* <CNavLink to="admin/dashboard" component={NavLink}> */}
            Bali Journey App Dashboard
            {/* </CNavLink> */}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <strong>{profile.name}</strong>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader