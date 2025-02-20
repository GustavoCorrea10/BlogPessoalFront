import axios from "axios";

//o axios serve para fazer requisições HTTP
//o CREATE serve para completar a URL automaticamente, exemplo:
//ele pegar a URL: https://projetoguiablogpessoal.onrender.com e completa a URL 
//com a barra: /tema, /postagem, /usuario
const api = axios.create({
    baseURL: 'https://projetoguiablogpessoal.onrender.com'  //BaseURL: serve para definir um enreço base fixo
})



//async: função assincrona, ou seja, lida com operações que demoram um pouco
//url → 'https://minhaapi.com/usuarios' → O endereço da API para cadastrar o usuário.
//dados → { nome: 'Ana', email: 'ana@email.com' } → Informações do novo usuário.
//setDados: Uma função que será usada para atualizar os dados depois que a API responder.4
//await significa que o código vai esperar a resposta da API antes de continua

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)  //Ele faz uma requisição HTTP do tipo POST para a URL especificada, enviando os dados para o servidor.
    setDados(resposta.data)

    //setDados é uma função que foi definida ou passada como parâmetro para atualizar o estado
    //resposta é a variável onde armazenamos o retorno da API (a resposta que o servidor nos deu).
    //data: data é uma propriedade da variavle resposta. 
    //Quando a API responde, ela envia um objeto, e a propriedade data geralmente contém as informações principais retornadas pela API.
}





//async: função assincrona, ou seja, lida com operações que demoram um pouco
//url → 'https://minhaapi.com/usuarios' → O endereço da API para cadastrar o usuário.
//dados → { nome: 'Ana', email: 'ana@email.com' } → Informações do novo usuário.
//setDados: Uma função que será usada para atualizar os dados depois que a API responder.4
//setDados é uma função que foi definida ou passada como parâmetro para atualizar o estado

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)

//resposta é a variável onde armazenamos o retorno da API (a resposta que o servidor nos deu).
//data: data é uma propriedade da variavel resposta. 
//Quando a API responde, ela envia um objeto, e a propriedade data geralmente contém as informações principais retornadas pela API.

}






//async: função assincrona, ou seja, lida com operações que demoram um pouco
//url → 'https://minhaapi.com/usuarios' → O endereço da API para cadastrar o usuário.
//setDados: Uma função que será usada para atualizar os dados depois que a API responder.4
//header: Object = será usado para incluir o token de autenticação na requisição.
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)

//resposta é a variável onde armazenamos o retorno da API (a resposta que o servidor nos deu).

}





export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}





export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}






export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}