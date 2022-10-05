import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Product
const Category = React.lazy(() => import('./views/category/Category'))
const Destination = React.lazy(() => import('./views/destination/Destination'))
const PackageTrip = React.lazy(() => import('./views/packageTrip/PackageTrip'))

// Review
const ReviewDestination = React.lazy(() => import('./views/review/ReviewDestination'))
const ReviewPackageTrip = React.lazy(() => import('./views/review/ReviewPackageTrip'))

// User
const User = React.lazy(() => import('./views/user/User'))

// Profile
const Profile = React.lazy(() => import('./views/profile/Profile'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />

          <Route path="admin/*" name="HomeAdmin" element={<DefaultLayout />} />
          {/* <Route path="admin/dashboard" name="Dashboards" element={<Dashboard />} />
          <Route path="admin/category" name="Category" element={<Category />} />
          <Route path="admin/destination" name="Destination" element={<Destination />} />
          <Route path="admin/package-trip" name="package-trip" element={<PackageTrip />} />
          <Route
            path="admin/review/destination"
            name="review/destination"
            element={<ReviewDestination />}
          />
          <Route
            path="admin/review/package-trip"
            name="review/package-trip"
            element={<ReviewPackageTrip />}
          />
          <Route path="admin/user" name="user" element={<User />} />
          <Route path="admin/profile" name="profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
