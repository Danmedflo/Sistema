import { supabase } from '../services/supabaseClient';

export const getTransacciones = async () => {
  const { data, error } = await supabase
    .from('transacciones')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) throw error;
  return data;
};

export const addTransaccion = async (transaccion) => {
  const { error } = await supabase
    .from('transacciones')
    .insert([transaccion]);

  if (error) throw error;
};