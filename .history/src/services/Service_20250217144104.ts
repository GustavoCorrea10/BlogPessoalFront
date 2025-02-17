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
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados) // a mesma coisa que /usuario/cadastrar -> {nome, senha, email}
    setDados(resposta.data)
}






export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}






export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
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