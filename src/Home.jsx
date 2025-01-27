import {Link} from "react-router";

function Home(){
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">
                    Welkom bij mijn website van mijn favoriete games 🎮
                </h1>
                <p className="text-lg md:text-xl font-light">
                    Ontdek de coolste games die ik graag speel!
                </p>
                <div className={"flex justify-center"}>
                    <div className="mt-4 px-6 py-3 bg-white text-blue-500 font-semibold rounded-2xl shadow-lg hover:bg-gray-100 transition duration-300 w-1/2">
                        <Link to={`/games`}>Bekijk Games</Link>
                    </div>
                </div>
        </div>
</div>
)
}

export default Home;