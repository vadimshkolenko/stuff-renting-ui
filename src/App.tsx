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
import AddCreationForm from './pages/AddCreationForm'
import AddsList from './pages/AddsList'
import AddDetail from './pages/AddDetail'
import Deals from './pages/Deals'
import Notifications from './pages/Notifications'
import SuccessPayment from './pages/SuccessPayment'

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
        <Route path="/" element={<AddsList />} />
        <Route
          path="/create-ad"
          element={
            <RequireAuth>
              <AddCreationForm />
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
        <Route path="/ad/:adId" element={<AddDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/confirm/:verificationToken" element={<Confirmation />} />
      </Routes>
    </Router>
  )
}

export default App
