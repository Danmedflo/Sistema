import { supabase } from "./supabaseClient";

export async function getTransactions(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  return { data, error };
}

export async function createTransaction(transaction) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .select();

  return { data, error };
}