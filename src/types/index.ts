export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'driver' | 'accountant'
  createdAt: Date
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  createdAt: Date
}

export interface Package {
  id: string
  clientId: string
  origin: string
  destination: string
  weight: number
  description: string
  status: 'pending' | 'in_transit' | 'delivered'
  createdAt: Date
}

export interface Trip {
  id: string
  driverId: string
  truckId: string
  startDate: Date
  endDate?: Date
  status: 'planned' | 'active' | 'completed'
  packages: string[]
  createdAt: Date
}

export interface Truck {
  id: string
  licensePlate: string
  model: string
  year: number
  capacity: number
  status: 'available' | 'in_use' | 'maintenance'
  createdAt: Date
}

export interface Driver {
  id: string
  name: string
  email: string
  phone: string
  licenseNumber: string
  status: 'active' | 'inactive'
  createdAt: Date
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  date: Date
  category: string
  createdAt: Date
}
