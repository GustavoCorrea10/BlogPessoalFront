
function Home() {
    return (
        <div className="border-4 border-[#dc143c p-8 m-8 flex items-center justify-center">


            {/* Gerenciar textos */}
            <div className="w-[250px]">
                <h1> Feiticeira Escarlate</h1>
                <p>Mais Poderosa que o mago supremo</p>
            </div>
             {/* Gerenciar uma imagem */}
            <div className="w-[250px]">
                <img src="https://upload.wikimedia.org/wikipedia/pt/9/91/Feiticeira_Escarlate.jpg"/>
            </div>
        </div> 
    )
}

export default Home