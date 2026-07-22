import MainLayout from '../layouts/MainLayout'

const Reports = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Rapports</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Rapport de Livraison',
              description: 'Suivi complet des colis livrés',
            },
            {
              title: 'Rapport Financier',
              description: 'Vue d\'ensemble des revenus et dépenses',
            },
            {
              title: 'Rapport de Performance',
              description: 'Analyse de performance des chauffeurs',
            },
            {
              title: 'Rapport de Parc',
              description: 'État du parc automobile',
            },
          ].map((report) => (
            <div
              key={report.title}
              className="cursor-pointer rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
            >
              <h3 className="font-bold text-gray-900">{report.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{report.description}</p>
              <button className="mt-4 text-sm font-medium text-primary-700 hover:text-primary-800">
                Voir Rapport →
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default Reports
