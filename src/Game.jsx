import {Link} from "react-router";

function Game({game}){
    return(
        <>
            <div
                className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h2>
                <div>
                    <Link to={`/games/${game.id}`}>Show Game</Link>
                </div>
            </div>
        </>
    )
}

export default Game;