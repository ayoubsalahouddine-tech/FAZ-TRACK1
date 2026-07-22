import { supabase } from '../lib/supabase'
import { Customer, CustomerResponse } from '../types/customer'
import { CreateCustomerInput, UpdateCustomerInput } from '../schemas/customer'

// Convert snake_case from DB to camelCase
const transformCustomer = (data: CustomerResponse): Customer => ({
  id: data.id,
  firstName: data.first_name,
  lastName: data.last_name,
  email: data.email,
  phone: data.phone,
  businessName: data.business_name,
  taxId: data.tax_id,
  address: data.address,
  city: data.city,
  country: data.country,
  type: data.type,
  status: data.status,
  notes: data.notes,
  createdAt: new Date(data.created_at),
  updatedAt: new Date(data.updated_at),
})

export const customerService = {
  // Get all customers with optional search and filters
  async getCustomers(search?: string, status?: string, type?: string) {
    let query = supabase.from('customers').select('*')

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,business_name.ilike.%${search}%`
      )
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (type) {
      query = query.eq('type', type)
    }

    const { data, error } = await query.order('created_at', {
      ascending: false,
    })

    if (error) throw error
    return (data || []).map(transformCustomer)
  },

  // Get single customer by ID
  async getCustomerById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data ? transformCustomer(data) : null
  },

  // Create new customer
  async createCustomer(input: CreateCustomerInput) {
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          first_name: input.firstName,
          last_name: input.lastName,
          email: input.email,
          phone: input.phone,
          business_name: input.businessName || null,
          tax_id: input.taxId || null,
          address: input.address,
          city: input.city,
          country: input.country,
          type: input.type,
          status: input.status,
          notes: input.notes || null,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return transformCustomer(data)
  },

  // Update customer
  async updateCustomer(id: string, input: UpdateCustomerInput) {
    const { data, error } = await supabase
      .from('customers')
      .update({
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        phone: input.phone,
        business_name: input.businessName || null,
        tax_id: input.taxId || null,
        address: input.address,
        city: input.city,
        country: input.country,
        type: input.type,
        status: input.status,
        notes: input.notes || null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformCustomer(data)
  },

  // Delete customer
  async deleteCustomer(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get customers by type
  async getCustomersByType(type: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('type', type)
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformCustomer)
  },

  // Get customers by status
  async getCustomersByStatus(status: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformCustomer)
  },
}
