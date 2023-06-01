import { useMemo } from "react"
import container from "../../../Data/Config/IocConfig"
import { AuthStore } from "../../../Data/Store/AuthStore"
import { IocStores } from "../../../Data/Config/iocTypeConfig"
import { authContext } from './AuthContext';

type AuthProviderProps = {
    children: JSX.Element | JSX.Element[]
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const store = useMemo(() => container.get<AuthStore>(IocStores.Auth), [])

    return (
        <authContext.Provider value={{authStore: store}}>
            {children}
        </authContext.Provider>
    )
}