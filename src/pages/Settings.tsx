import MainLayout from '../layouts/MainLayout'

const Settings = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Paramètres</h1>
        <div className="space-y-6">
          {[
            {
              title: 'Profil',
              description: 'Gérer vos informations personnelles',
            },
            {
              title: 'Sécurité',
              description: 'Gérer les accès et les permissions',
            },
            {
              title: 'Notifications',
              description: 'Configurer vos préférences de notifications',
            },
            {
              title: 'Intégrations',
              description: 'Gérer les intégrations externes',
            },
          ].map((setting) => (
            <div
              key={setting.title}
              className="flex items-center justify-between rounded-lg bg-white p-6 shadow"
            >
              <div>
                <h3 className="font-bold text-gray-900">{setting.title}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {setting.description}
                </p>
              </div>
              <button className="rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800">
                Configurer
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default Settings
