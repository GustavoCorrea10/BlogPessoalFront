import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"


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
    //useState é para definir o estado de usuario, então usuario tem que seguir os padrões de UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({

        id: 0,          // Inicializa o id como 0 (ainda não há um usuário autenticado)
        nome: "",       // Inicializa o nome do usuário como uma string vazia
        usuario: "",    // Inicializa o nome de usuário como uma string vazia
        senha: "",      // Inicializa a senha como uma string vazia
        foto: "",       // Inicializa a foto como uma string vazia
        token: ""       // Inicializa o token como uma string vazia
    })


    //isLoading é o nome da variavel
    //setIsLoading é a função usada para atualizar o estado de isLoading
    //useState(false) indica o estado inicial da variavel
    const [isLoading, setIsLoading] = useState(false)



    //async indica que é uma função assincrona
    //essa função recebe um objeto usuarioLogin do tipo UsuarioLogin
    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true) // indica que o isLoading está como true, e que o processo de login está em andamento

        

        try {
            // aqui chamamos a função login()e passamos a rota, e depois passamos o usuarioLogin(que agora tem USUARIO E SENHA)
            //o USUARIO e SENHA são passados para o "setUsuario", que guarda essa informação
            //e o setUsuario vai lá na variavel usuario, e adiciona as informações de USUARIO e SENHA e cria o resto automatico(id, token...)
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            toast.error('Os dados do usuario estão inconsistentes!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                
        }
        setIsLoading(false) // apos o processo o isLoading volta a ser falso, indicando que o processo terminou
    }




//handleLogout tem a função de limpar os dados do usuario
    function handleLogout() {
        //limpa os dados do usuario
        setUsuario({
         id: 0,         // O ID do usuário é resetado para 0 (geralmente um valor que indica "não autenticado").
        nome: "",      // O nome do usuário é limpo.
        usuario: "",   // O nome de usuário também é limpo.
        senha: "",     // A senha do usuário é limpa (por segurança, isso deve ser feito).
        foto: "",      // A foto do perfil é apagada.
        token: ""      // O token de autenticação é removido, o que é muito importante para encerrar a sessão.
        })
    }


    //<AuthContext.Provider> é onde define o que vai ser compartilhado com os outros componentes.
    //Aqui, ele está compartilhando o estado do usuário, as funções de login e logout, e o estado de carregamento.
    //value={{}} dentro do value voce coloca tudo o que quer que os outros componentes possam acessar

    //{children}  Esse é o espaço onde o conteúdo que for passado dentro do componente AuthContext.Provider será mostrado. 
    // Ou seja, se você colocar algum componente ou JSX dentro do AuthContext.Provider, isso será renderizado no lugar de {children}

    //usamos o <AuthContext.Provider> no App.tsx para envolver todos os componentes, esses componentes serão mostrados na tela e ficam no lugar de children
    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}