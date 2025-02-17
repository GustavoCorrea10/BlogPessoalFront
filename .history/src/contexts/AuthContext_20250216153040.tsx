import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"


//CRIANDO UMA INTERFACE COM O NOME AuthContextProps
//ESSA INTERFACE DEFINE QUAIS INFORMAÇÕES ESTARÃO NO CONTEXTO DE AUTENTICAÇÃO
//PENSE NISSO COMO UM "CONTRATO" QUE GARANTE QUE O CONTEXTO SEMPRE TERA CERTAS PROPIEDADES
interface AuthContextProps {
    usuario: UsuarioLogin // usuario é um objeto que guarda as informações sobre o usuario(como nome, email, token, etc...)
    handleLogout(): void //função que não retorna nada, provavelmente é uma função que remove os dados do usuario e desloga ele
    handleLogin(usuario: UsuarioLogin): Promise<void>  // Declara a função handleLogin, que recebe um usuário do tipo UsuarioLogin e retorna uma Promise assíncrona sem valor (void).
    isLoading: boolean // mostra um indicador de carregamento enquanto o login acontece
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            alert("O Usuário foi autenticado com sucesso!")
        } catch (error) {
            alert("Os Dados do usuário estão inconsistentes!")
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}