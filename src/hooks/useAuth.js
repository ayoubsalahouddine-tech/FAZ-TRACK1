import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
/**
 * Custom hook for Supabase authentication state.
 * Provides current user, session, and loading state.
 */
export function useAuth() {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Get the initial session
        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setIsLoading(false);
        });
        // Listen for auth state changes
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, currentSession) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setIsLoading(false);
        });
        return () => subscription.unsubscribe();
    }, []);
    return { user, session, isLoading };
}
