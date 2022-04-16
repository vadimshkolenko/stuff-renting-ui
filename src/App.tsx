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
        <Route
          path="/"
          element={
            <RequireAuth>
              <div>Test</div>
            </RequireAuth>
          }
        />
        <Route
          path="/create-ad"
          element={
            <RequireAuth>
              <div>Create add</div>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/confirm/:verificationToken" element={<Confirmation />} />
      </Routes>
    </Router>
  )
}

export default App
