import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';

function Login() {

    const navigate = useNavigate(); // useNavigate passa todas as suas funcionalidades para o navigate, que serve para navegar entre rotas

    //uma variavel chamada usuario, que é um objeto(guarda nome, id e toke...)
   //handleLogin faz a autenticação do usuario e armazena os dados
   //isLoading indica o sinal que esta carregando 
   //useContext(AuthContext) = estamos usando o AuthContext para acessar alguns dados
   //entre eles, o handleLogin e o isLoading
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)




//variavel chamada usuarioLogin que é do tipo UsuarioLogin
//setUsuarioLogin: É a função que vai atualizar os dados do usuarioLogin
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
        //{} é um objeto vazio
        //o as está indicando que esse objeto vazio, tem ser no mesmo formato 
        //que está la em UsuarioLogin
    )




//observa a variavel usuario
//se o token for diferente de vazio, ou seja, tem o token
//ele navenga ate a /home
    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])





//aqui chamamos o evento ChangeEvent<HTMLInputElement que fica de olho quando o input sofrer uma alteração
// ( no caso ele vai conter informações que vão ser digitadas)
//esse evento fica gravado na variavel "e"
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({  //função usada para atualizar os dados de usuarioLogin
            ...usuarioLogin, // aqui, ele pega todos os campos que tem no usuarioLogin, mas todos vem vazio(ex: usuario, senha, foto, token...)
            [e.target.name]: e.target.value // e para pegar pegar os valore só do input usuario e senha ele usa o target

            //ex: ele pega o evento que diz que o imput sofreu alteração(no caso foi digitado alguma coisa nele) mas qual input que foi digitado?
            //para saber qual o input pegar, usamos o target, ele pega todos os input que tem nessa pasta
            //agora para ele saber qual é o de usuario e qual é o de senha, passamos o parametro "name"
            //cada input tem um parametro chamado "name", só que cada um vem especifico, exemplo:
            //input de usuario:  <input name="usuario">
            //input de senha:  <input name="senha">


        })
    }





    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }





    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 
                    h-screen place-items-center font-bold ">
                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}>
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2">
                                    
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}

export default Login;
