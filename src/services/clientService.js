import { supabase } from '../lib/supabase';
// Convert snake_case from DB to camelCase
const transformClient = (data) => ({
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    city: data.city,
    country: data.country,
    type: data.type,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
});
export const clientService = {
    // Get all clients with optional search
    async getClients(search) {
        let query = supabase.from('clients').select('*');
        if (search) {
            query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,phone.ilike.%${search}%,email.ilike.%${search}%`);
        }
        const { data, error } = await query.order('created_at', {
            ascending: false,
        });
        if (error)
            throw error;
        return (data || []).map(transformClient);
    },
    // Get single client by ID
    async getClientById(id) {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw error;
        return data ? transformClient(data) : null;
    },
    // Create new client
    async createClient(input) {
        const { data, error } = await supabase
            .from('clients')
            .insert([
            {
                first_name: input.firstName,
                last_name: input.lastName,
                phone: input.phone,
                email: input.email || null,
                address: input.address,
                city: input.city,
                country: input.country,
                type: input.type,
            },
        ])
            .select()
            .single();
        if (error)
            throw error;
        return transformClient(data);
    },
    // Update client
    async updateClient(id, input) {
        const { data, error } = await supabase
            .from('clients')
            .update({
            first_name: input.firstName,
            last_name: input.lastName,
            phone: input.phone,
            email: input.email || null,
            address: input.address,
            city: input.city,
            country: input.country,
            type: input.type,
        })
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return transformClient(data);
    },
    // Delete client
    async deleteClient(id) {
        const { error } = await supabase.from('clients').delete().eq('id', id);
        if (error)
            throw error;
    },
    // Get clients by type
    async getClientsByType(type) {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .or(`type.eq.${type},type.eq.both`)
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return (data || []).map(transformClient);
    },
};
