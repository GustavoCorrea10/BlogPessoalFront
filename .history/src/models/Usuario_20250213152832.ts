import Postagem from "./Postagem";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  postagem?: Postagem | null;
}

//interface serve para tipar objetos
//o ? indica que aquele campo é opcional 
//ex:

let user: Usuario = {
id: 1,
nome: "Gustavo",
usuario: "gustavo@gustavo.com",
senha: "futebol11",
foto: "foto.png",
postagem: null

}