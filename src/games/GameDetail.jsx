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
        deleteGame(game.id).then(() => {
            navigate('/games');
        });
    }

    async function toggleFavorite() {
        try {
            const response = await fetch(`http://145.24.223.147:8000/games/${id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log('Favorite updated:', data);

            setGame(prevGame => ({
                ...prevGame,
                favorite: data.favorite
            }));

        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    }

    return(
        <>
            {game ? (
                <article
                    className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:shadow-2xl">

                    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
                        <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{game.title}</h1>
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700">Description:</h2>
                                    <p className="text-gray-600">{game.description}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700">Genre:</h2>
                                    <p className="text-gray-600">{game.genre}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700">Producer:</h2>
                                    <p className="text-gray-600">{game.producer}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700">Release Date:</h2>
                                    <p className="text-gray-600">{game.release_date}</p>
                                </div>
                                <button
                                    onClick={toggleFavorite}
                                    className={`mt-2 px-4 py-2 rounded ${
                                        game.favorite ? 'bg-red-500' : 'bg-gray-300'
                                    } text-white`}
                                >
                                    {game.favorite ? '❤️ Unfavorite' : '🤍 Like'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-6">
                        <Link
                            to={`/games/${game.id}/edit`}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                        >
                            Edit Game
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                        >
                            Delete Game
                        </button>
                    </div>
                </article>
            ) : (<p className="text-red-500">No game found.</p>)}
        </>
    )
}

export default GameDetail;