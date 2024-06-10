import { writable } from "svelte/store"

export const authenticated = writable(false)

// Function to load authentication status from localStorage
export function loadAuthStatus() {
    const storedAuth = localStorage.getItem('authenticated');
    if (storedAuth) {
        authenticated.set(JSON.parse(storedAuth));
    }
}

// Function to save authentication status to localStorage
export function saveAuthStatus(status) {
    localStorage.setItem('authenticated', JSON.stringify(status));
    authenticated.set(status);
}
