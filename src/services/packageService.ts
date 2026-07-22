import { supabase } from '../lib/supabase'
import { Package, PackageResponse } from '../types/package'
import { CreatePackageInput, UpdatePackageInput } from '../schemas/package'
import { generateTrackingNumber } from '../utils/packageUtils'

// Convert snake_case from DB to camelCase
const transformPackage = (data: PackageResponse): Package => ({
  id: data.id,
  trackingNumber: data.tracking_number,
  senderId: data.sender_id,
  senderName: data.sender_name,
  recipientId: data.recipient_id,
  recipientName: data.recipient_name,
  packageNature: data.package_nature,
  description: data.description,
  weight: data.weight,
  quantity: data.quantity,
  declaredValue: data.declared_value,
  transportPrice: data.transport_price,
  insurance: data.insurance,
  departureCity: data.departure_city,
  arrivalCity: data.arrival_city,
  observations: data.observations,
  status: data.status,
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
})

export const packageService = {
  // Get all packages with optional search and filters
  async getPackages(search?: string, status?: string) {
    let query = supabase.from('packages').select('*')

    if (search) {
      query = query.or(
        `tracking_number.ilike.%${search}%,sender_name.ilike.%${search}%,recipient_name.ilike.%${search}%,departure_city.ilike.%${search}%,arrival_city.ilike.%${search}%`
      )
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    })

    if (error) throw error
    return (data || []).map(transformPackage)
  },

  // Get single package by ID
  async getPackageById(id: string) {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data ? transformPackage(data) : null
  },

  // Get package by tracking number
  async getPackageByTrackingNumber(trackingNumber: string) {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single()

    if (error) throw error
    return data ? transformPackage(data) : null
  },

  // Create new package
  async createPackage(
    input: CreatePackageInput,
    senderName: string,
    recipientName: string
  ) {
    // Generate tracking number
    const trackingNumber = await generateTrackingNumber()

    const { data, error } = await supabase
      .from('packages')
      .insert([
        {
          tracking_number: trackingNumber,
          sender_id: input.senderId,
          sender_name: senderName,
          recipient_id: input.recipientId,
          recipient_name: recipientName,
          package_nature: input.packageNature,
          description: input.description,
          weight: input.weight,
          quantity: input.quantity,
          declared_value: input.declaredValue,
          transport_price: input.transportPrice,
          insurance: input.insurance,
          departure_city: input.departureCity,
          arrival_city: input.arrivalCity,
          observations: input.observations || null,
          status: input.status,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return transformPackage(data)
  },

  // Update package
  async updatePackage(id: string, input: UpdatePackageInput) {
    const { data, error } = await supabase
      .from('packages')
      .update({
        package_nature: input.packageNature,
        description: input.description,
        weight: input.weight,
        quantity: input.quantity,
        declared_value: input.declaredValue,
        transport_price: input.transportPrice,
        insurance: input.insurance,
        departure_city: input.departureCity,
        arrival_city: input.arrivalCity,
        observations: input.observations || null,
        status: input.status,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformPackage(data)
  },

  // Delete package
  async deletePackage(id: string) {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get packages by status
  async getPackagesByStatus(status: string) {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformPackage)
  },

  // Get packages by sender
  async getPackagesBySender(senderId: string) {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('sender_id', senderId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformPackage)
  },

  // Get packages by recipient
  async getPackagesByRecipient(recipientId: string) {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('recipient_id', recipientId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformPackage)
  },
}
