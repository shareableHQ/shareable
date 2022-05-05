import { writable } from "svelte/store";
import supabase from "$lib/db";

// State
export const user = writable(supabase.auth.user() || false);
// Layout
export const sidebar = writable(false)