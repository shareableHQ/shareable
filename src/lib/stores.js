import { writable } from "svelte/store";
import supabase from "$lib/db";

// State
export const user = writable(supabase.auth.user() || false);
// Layout
export const sidebar = writable(false)
// Tags
export const tagStore = writable(true)
export const loading = writable(false)