import {Link} from "react-router";

function Note({note}){
    return(
        <>
            <div
                className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{note.title}</h2>
                <div>
                    <Link to={`/notes/${note.id}`}>Show Note</Link>
                </div>
            </div>
        </>
    )
}

export default Note;