import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

function NoteDetail () {
    const params = useParams();
    const id = params.id
    const [note,setNote] = useState(null);
    const navigate = useNavigate();

    async function fetchNote() {
        try {
            const response = await fetch(`https://notes.basboot.nl/notes/${id}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data)
            setNote(data);
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    useEffect(() => {
        fetchNote()
    },[id])

    async function deleteNote() {
        try {
            const response = await fetch(`https://notes.basboot.nl/notes/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            console.log(data)
            navigate('/notes')
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    const handleDelete = () => {
        deleteNote(note.id);
    }

    return(
        <>
            {note ? (
                <article
                    className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h2>
                    <p className="text-gray-600 mb-4">{note.body}</p>
                    <small className="text-gray-500 block">By {note.author}</small>
                    <div>
                        <Link to={`/notes/${note.id}/edit`}>Edit Note</Link>
                    </div>
                    <button onClick={handleDelete}>
                        Delete note
                    </button>
                </article>
            ):  (<p className="text-red-500">No note found.</p>)}
        </>
    )
}

export default NoteDetail;