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

export async function updateTransaction(id, updates, userId) {
  const { data, error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  return { data, error };
}

export async function deleteTransaction(id, userId) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  return { error };
}