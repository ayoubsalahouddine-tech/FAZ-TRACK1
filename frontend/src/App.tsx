import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Packages from './pages/Packages'
import Trips from './pages/Trips'
import Trucks from './pages/Trucks'
import Drivers from './pages/Drivers'
import Cashbox from './pages/Cashbox'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/colis" element={<Packages />} />
          <Route path="/voyages" element={<Trips />} />
          <Route path="/camions" element={<Trucks />} />
          <Route path="/chauffeurs" element={<Drivers />} />
          <Route path="/caisse" element={<Cashbox />} />
          <Route path="/rapports" element={<Reports />} />
          <Route path="/parametres" element={<Settings />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
