import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import CardTemas from "../cardtemas/CardTemas";
import { buscar } from "../../../services/Service";

function ListaTemas() {

    //navegar entre rotas
    const navigate = useNavigate();

    //aqui  vai ser um array de temas
    const [temas, setTemas] = useState<Tema[]>([])

    //usando o AuthContext para ter acesso a  handleLogout = desloga o usuario
    const { usuario, handleLogout } = useContext(AuthContext)
    //guarda o token do usuario na variavel token
    const token = usuario.token

    async function buscarTemas() {
        try {
            await buscar('/tema', setTemas, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])


    //recupera o array
    useEffect(() => {
     buscarTemas()    
    }, [temas.length])
    
    return (
        <>
        {temas.length === 0 && (
            <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
        />
        )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {temas.map((tema) => (
                            <CardTemas key={tema.id} item={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaTemas;