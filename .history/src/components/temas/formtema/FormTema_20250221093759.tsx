import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {
    //navegar entre rotas

    const navigate = useNavigate();

    //vai armazenar um tema de cada vez
    const [tema, setTema] = useState<Tema>({} as Tema)

    //pega o carregamento
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //pega os atributos de usuario e a função handleLogout
    const { usuario, handleLogout } = useContext(AuthContext)

    //armazena o token
    const token = usuario.token 

    //page a variavel que vai ser passada na URL
    const { id } = useParams<{ id: string }>();




    //função buscarPorId que recebe um ID como parametro
    async function buscarPorId(id: string) {
        try {
            await buscar(`/tema/${id}`, setTema, {//chamamos a função buscar e passamos a URL com o ID, e autorizamos com o token
                headers: { Authorization: token }// o tema que foi pegado pelo id, vai ir para o setTema, que tem a funçao de atualizar a variavel tema, com o tema especifico
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {// se receber um erro 403, chamamos a função hadleLogout para deslogar o usuario
                handleLogout()
            }
        }
    }


     //fica de olho no token
    //se não tiver o token, ele dá um alerta e manda para a pagina inicial, usando o navgate
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])


    //obersava o ID, se o ID existir, ele chama a função buscaPorId
    //qundo o ID existe, a função buscaPorId(id) busca um tema na API pelo ID e atualiza  o estado (setTema)
    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])



    //atualizar o estado do tema atravez do evento no imput
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })
    }

    //função que retorna para a pagina /temas
    function retornar() {
        navigate("/temas")
    }



    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault() // evita que o formulario reinicie a pagina toda ao ser enviado
        setIsLoading(true)


          //aqui ele faz:
         //Se id existir → Significa que já existe um tema, então ele atualiza usando a função atualizar().
        //Se id não existir → Significa que é um novo tema, então ele cria usando a função cadastrar().
        if (id !== undefined) {
             try {
                await atualizar(`/tema`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                alert('O Tema foi atualizado com sucesso!')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao atualizar o tema.')
                }

            }
        } else {
            try {
                await cadastrar(`/tema`, tema, setTema, {
                    headers: { 'Authorization': token }
                })
                toast.success('O tema foi cadastrado com sucesso!', {
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
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    alert('Erro ao cadastrar o tema.')
                }

            }
        }

        setIsLoading(false) // depois da requisição, ele para de usar o simbolo de carregar
        retornar() //e retorna para /temas, que está na função retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Tema' : 'Editar Tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;