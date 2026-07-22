import { Bell, ChevronDown } from 'lucide-react'

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Breadcrumb/Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Bienvenue</h2>
          <p className="text-sm text-gray-500">Gestion complète de votre transport</p>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute right-1 top-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500" />
          </button>

          {/* User menu */}
          <div className="flex items-center gap-3 rounded-lg px-4 py-2 hover:bg-gray-100">
            <div className="h-10 w-10 rounded-full bg-primary-700" />
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@faztrack.com</p>
            </div>
            <ChevronDown size={18} className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
