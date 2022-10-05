import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2022 Bali Journey Apps</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by: Team 3 Flutter Bootcamp #16 Code Academy</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
