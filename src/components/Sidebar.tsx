import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Package,
  Truck,
  Navigation,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de Bord', path: '/dashboard' },
    { icon: Users, label: 'Clients', path: '/clients' },
    { icon: Package, label: 'Colis', path: '/colis' },
    { icon: Navigation, label: 'Voyages', path: '/voyages' },
    { icon: Truck, label: 'Camions', path: '/camions' },
    { icon: Users, label: 'Chauffeurs', path: '/chauffeurs' },
    { icon: DollarSign, label: 'Caisse', path: '/caisse' },
    { icon: BarChart3, label: 'Rapports', path: '/rapports' },
    { icon: Settings, label: 'Paramètres', path: '/parametres' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-primary-700 p-2 text-white lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-sidebar transform bg-gradient-to-b from-primary-700 to-primary-800 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="border-b border-primary-600 px-6 py-8">
          <h1 className="text-2xl font-bold">FAZ TRACK</h1>
          <p className="mt-1 text-sm text-primary-200">Gestion Transport</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                      active
                        ? 'bg-white text-primary-700'
                        : 'text-primary-100 hover:bg-primary-600'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-primary-600 p-4">
          <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-primary-100 transition-all hover:bg-primary-600">
            <LogOut size={20} />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}
    </>
  )
}

export default Sidebar
