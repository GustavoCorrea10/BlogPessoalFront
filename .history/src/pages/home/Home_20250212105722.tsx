
function Home() {
    return (
        <div className="grid grid-cols-12">
            <div className="h-screen bg-red-300 col-span-1">Servidores</div>
            <div className="h-screen bg-green-300 col-span-3">Canais do Servidor</div>
            <div className="h-screen bg-yellow-300 col-span-5">Feed</div>
            <div className="h-screen bg-blue-300 col-span-3">Usuarios</div>
        </div> 
    )
}

export default Home