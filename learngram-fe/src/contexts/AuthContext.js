import { createContext } from 'react';

const isTokenPresent = !!localStorage.getItem("learngram_access_key")

export const AuthContext = createContext({ authenticated: isTokenPresent });