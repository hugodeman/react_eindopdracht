import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

function GameDetail () {
    const params = useParams();
    const id = params.id
    const [game,setGame] = useState(null);
    const navigate = useNavigate();

    async function fetchGame() {
        try {
            const response = await fetch(`http://145.24.223.147:8000/games/${id}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data)
            setGame(data);
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    useEffect(() => {
        fetchGame()
    },[id])

    async function deleteGame() {
        try {
            const response = await fetch(`http://145.24.223.147:8000/games/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data)
            navigate('/games')
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    const handleDelete = () => {
        deleteGame(game.id);
    }

    return(
        <>
            {game ? (
                <article
                    className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h2>
                    <p className="text-gray-600 mb-4">{game.description}</p>
                    <p className="text-gray-600 mb-4">{game.genre}</p>
                    <p className="text-gray-600 mb-4">{game.producer}</p>
                    <small className="text-gray-500 block">By {game.release_date}</small>
                    <div>
                        <Link to={`/games/${game.id}/edit`}>Edit game</Link>
                    </div>
                    <button onClick={handleDelete}>
                        Delete game
                    </button>
                </article>
            ) : (<p className="text-red-500">No game found.</p>)}
        </>
    )
}

export default GameDetail;