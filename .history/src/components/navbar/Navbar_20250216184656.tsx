import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    // O hook "useNavigate()" é importado do React Router e é usado para navegar entre diferentes páginas ou rotas da aplicação.
    //para não usar ele, passamos as suas funções para o navigate
    //agora o navigate tem todas as funções do useNavigate
    const navigate = useNavigate();



//handleLogout remove a informações do usuario
//useContext  é um hook usado para acessar o valor de um contexto
//AuthContext é o contexto
//esse codigo, desconecta o usuario
    const { handleLogout } = useContext(AuthContext)





    function logout() {

        handleLogout()   // 1. Chama a função 'handleLogout' para realizar o logout (limpar os dados do usuário)
        alert('O Usuário foi desconectado com sucesso!') // 2. Exibe uma mensagem de alerta informando que o usuário foi desconectado
        navigate('/')  // 3. Redireciona o usuário para a página inicial ('/')
    }
    
    return (
        <>
            <div className='w-full bg-indigo-900 text-white
                flex justify-center py-4'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        Postagens
                        Temas
                        Cadastrar tema
                        Perfil
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar