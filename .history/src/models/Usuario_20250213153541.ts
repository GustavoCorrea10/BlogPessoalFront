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
//exemplo:

// let user: Usuario = {
// id: 1,
// nome: "Gustavo",
// usuario: "gustavo@gustavo.com",
// senha: "futebol11",
// foto: "foto.png"


// }

// Nesse exemplo em cima, chamamos uma variavel do tipo 
// Usuario.
// Como é uma interface, ele é obrigado a herdar 
// tudo que tem em Usuario. Entao se usarmos o ? 
// mostramos que aquele campo é opcional.
//
// E se usarmos o | null é para indicar que aquele campo pode ser nulo