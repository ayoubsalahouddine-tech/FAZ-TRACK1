import MainLayout from '../layouts/MainLayout'

const Cashbox = () => {
  return (
    <MainLayout>
      <div>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Caisse</h1>
          <button className="rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800">
            + Nouvelle Transaction
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-600">Solde Total</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">0.00 DA</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-600">Revenus</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">0.00 DA</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-sm font-medium text-gray-600">Dépenses</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">0.00 DA</p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Cashbox
