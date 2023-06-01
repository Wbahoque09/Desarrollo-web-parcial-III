import { createContext, useContext } from "react"
import { AuthStore } from "../../../Data/Store/AuthStore"

type AuthContextValue = {
    authStore: AuthStore
}

export const authContext = createContext<AuthContextValue>({} as AuthContextValue);


export const useAuthContext = () => useContext(authContext);