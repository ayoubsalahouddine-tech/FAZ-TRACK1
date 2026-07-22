import MainLayout from '../layouts/MainLayout'

const Dashboard = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Stats Cards */}
          {[
            { title: 'Total Colis', value: '1,234', change: '+12%' },
            { title: 'Voyages Actifs', value: '45', change: '+5%' },
            { title: 'Camions Disponibles', value: '28', change: '+2%' },
            { title: 'Chauffeurs', value: '52', change: '+8%' },
          ].map((stat) => (
            <div key={stat.title} className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm text-green-600">{stat.change} ce mois</p>
            </div>
          ))}
        </div>

        {/* Additional sections */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Activité Récente</h2>
            <p className="text-gray-600">Aucune activité récente</p>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Actions Rapides</h2>
            <div className="space-y-2">
              <button className="w-full rounded-lg bg-primary-700 py-2 text-white hover:bg-primary-800">
                Nouveau Colis
              </button>
              <button className="w-full rounded-lg bg-gray-200 py-2 text-gray-900 hover:bg-gray-300">
                Nouveau Voyage
              </button>
              <button className="w-full rounded-lg bg-gray-200 py-2 text-gray-900 hover:bg-gray-300">
                Ajouter Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
