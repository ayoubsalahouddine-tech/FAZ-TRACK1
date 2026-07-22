import MainLayout from '../layouts/MainLayout'

const Trucks = () => {
  return (
    <MainLayout>
      <div>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Camions</h1>
          <button className="rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800">
            + Ajouter Camion
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-gray-600">Aucun camion pour le moment</p>
        </div>
      </div>
    </MainLayout>
  )
}

export default Trucks
