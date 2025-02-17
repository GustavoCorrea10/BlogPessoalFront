import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"


//CRIANDO UMA INTERFACE COM O NOME AuthContextProps
//ESSA INTERFACE DEFINE QUAIS INFORMAÇÕES ESTARÃO NO CONTEXTO DE AUTENTICAÇÃO
//PENSE NISSO COMO UM "CONTRATO" QUE GARANTE QUE O CONTEXTO SEMPRE TERA CERTAS PROPIEDADES
interface AuthContextProps {
    usuario: UsuarioLogin // usuario é um objeto que guarda as informações sobre o usuario(como nome, email, token, etc...)
    handleLogout(): void //função que não retorna nada, provavelmente é uma função que remove os dados do usuario e desloga ele
    handleLogin(usuario: UsuarioLogin): Promise<void> // Declara a função handleLogin, que recebe um usuário do tipo UsuarioLogin e retorna uma Promise assíncrona sem valor (void).
    isLoading: boolean // mostra um indicador de carregamento enquanto o login acontece
}

interface AuthProviderProps { // Declara uma interface chamada AuthProviderProps
    children: ReactNode // "children" são os itens (como componentes ou texto) que você coloca dentro da 'caixa' AuthProvider.
}

export const AuthContext = createContext({} as AuthContextProps) // Cria uma 'caixa' (AuthContext) vazia para armazenar informações de autenticação, e 'as' define o tipo como AuthContextProps.



// Função AuthProvider, que recebe 'children' como parâmetro e o tipo AuthProviderProps
export function AuthProvider({ children }: AuthProviderProps) {

     // 'usuario' é a variavel que vai ter que seguir o padrão do objeto usuarioLogin
     // setUsuario' é a função que atualiza esse estado
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        
        id: 0,          // Inicializa o id como 0 (ainda não há um usuário autenticado)
        nome: "",       // Inicializa o nome do usuário como uma string vazia
        usuario: "",    // Inicializa o nome de usuário como uma string vazia
        senha: "",      // Inicializa a senha como uma string vazia
        foto: "",       // Inicializa a foto como uma string vazia
        token: ""       // Inicializa o token como uma string vazia
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