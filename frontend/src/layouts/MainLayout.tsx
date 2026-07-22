import { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-0 flex-1 overflow-auto lg:ml-sidebar">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
