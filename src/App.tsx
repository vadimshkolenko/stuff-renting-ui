import React, { FC } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { token } from './static'
import Header from './components/Header'
import Registration from './pages/Registration'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import AdForm from './pages/AdForm'
import AdsList from './pages/AdsList'
import AdDetail from './pages/AdDetail'
import Deals from './pages/Deals'
import Notifications from './pages/Notifications'
import SuccessPayment from './pages/SuccessPayment'
import { adsView } from './static'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  if (!localStorage.getItem(token)) {
    return <Navigate to="/login" replace />
  }
  return children
}

const App: FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<AdsList mode={adsView.ALL_ADS} />} />
        <Route
          path="/ads/:userId"
          element={<AdsList mode={adsView.USER_ADS} />}
        />
        <Route
          path="/favorite/:userId"
          element={
            <RequireAuth>
              <AdsList mode={adsView.FAVORITE_ADS} />
            </RequireAuth>
          }
        />
        <Route
          path="/create-ad"
          element={
            <RequireAuth>
              <AdForm />
            </RequireAuth>
          }
        />
        <Route
          path="/editAd/:adId"
          element={
            <RequireAuth>
              <AdForm />
            </RequireAuth>
          }
        />
        <Route
          path="/deals"
          element={
            <RequireAuth>
              <Deals />
            </RequireAuth>
          }
        />
        <Route
          path="/notifications"
          element={
            <RequireAuth>
              <Notifications />
            </RequireAuth>
          }
        />
        <Route
          path="/payment/success"
          element={
            <RequireAuth>
              <SuccessPayment />
            </RequireAuth>
          }
        />
        <Route path="/ad/:adId" element={<AdDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/confirm/:verificationToken" element={<Confirmation />} />
      </Routes>
    </Router>
  )
}

export default App
