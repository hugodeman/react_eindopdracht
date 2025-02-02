import Game from "./Game.jsx";
import {useEffect, useState} from "react";

function Games(){
    const [games,setGames] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState('all');

    const filteredGames = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
        && (filter === "favorites" ? game.favorite : true)
    );

    const showFilteredGames = filteredGames.map((game) => (<Game key={game.id} game={game}/>))

    const [totalPages, setTotalPages] = useState(1);
    const [paginationLinks, setPaginationLinks] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const BASE_URL = 'http://145.24.223.147:8000/games';

    async function fetchGames() {
        try {
            const response = await fetch(`${BASE_URL}?page=${currentPage}&limit=10`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data)
            setGames(data.items);
            setPaginationLinks(data.pagination._links || {});
            setCurrentPage(data.pagination.currentPage );
            setTotalPages(data.pagination.totalPages );
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    useEffect(() => {
        fetchGames();
    }, [currentPage]);

    function previousPage(){
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function nextPage(){
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    function lastPage(){
        setCurrentPage(totalPages)
    }

    function firstPage() {
        setCurrentPage(1)
    }

    return(
        <>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Games</h1>
                <div className={"flex flex-row justify-around"}>
                    <button
                        onClick={() => setFilter(filter === "favorites" ? "all" : "favorites")}
                        className={filter === "favorites" ? "bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg" : "bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg"}
                    >
                        {filter === "favorites" ? "Toon alle games" : "Toon favorieten"}
                    </button>
                    <input
                        type="text"
                        placeholder="Zoek een game..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg mb-4 w-1/2"
                    />
                </div>
                <br/><br/>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {showFilteredGames}
                </div>

            </div>
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => firstPage()}
                    disabled={!paginationLinks.previous}
                    className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                        !paginationLinks.previous ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    First
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!paginationLinks.previous}
                    className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                        !paginationLinks.previous ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Previous
                </button>

                <p>
                    Page {currentPage} of {totalPages}
                </p>

                <button
                    onClick={() => nextPage() }
                    disabled={!paginationLinks.next}
                    className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                        !paginationLinks.next ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Next
                </button>
                <button
                    onClick={() => lastPage()}
                    disabled={!paginationLinks.next}
                    className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                        !paginationLinks.next ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Last
                </button>
            </div>
        </>
    )
}

export default Games;