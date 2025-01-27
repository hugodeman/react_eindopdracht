import {Link} from "react-router";

function Game({game}){
    return(
        <>
            <div
                className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl flex justify-center flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h2>
                <div
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md w-1/3 mt-4"
                >
                    <Link to={`/games/${game.id}`}>Show Game</Link>
                </div>
            </div>
        </>
    )
}

export default Game;