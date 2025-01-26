import Note from "./Note.jsx";
import {useEffect, useState} from "react";

function Notes(){
    const [notes,setNotes] = useState([])
    const showNotes = notes.map((note) => (<Note key={note.id} note={note}/>))

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    async function fetchNotes() {
        try {
            const response = await fetch(`https://notes.basboot.nl/notes?page=${currentPage}&limit=${itemsPerPage}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data)
            setNotes(data.items);
            setTotalPages(data.pagination.totalPages || 1);
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [currentPage, itemsPerPage]);

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
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Notes</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {showNotes}
                </div>
            </div>
            <div className="flex justify-between items-center mt-6">
                <button onClick={firstPage}
                        disabled={currentPage === 1}
                        className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}                > first
                </button>
                <button
                    onClick={previousPage}
                    disabled={currentPage === 1}
                    className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Previous
                </button>

                <p>
                    Page {currentPage} of {totalPages}
                </p>

                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Next
                </button>
                <button onClick={lastPage}
                        disabled={currentPage === totalPages}
                        className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        }`}                > last
                </button>
            </div>
        </>
    )
}

export default Notes;