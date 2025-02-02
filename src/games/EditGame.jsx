import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";

function EditGame() {
    const params = useParams();
    const id = params.id

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        producer: '',
        release_date: ''
    });
    const navigate = useNavigate()

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

            // placeholders
            setFormData({
                title: data.title || '',
                description: data.description || '',
                genre: data.genre || '',
                producer: data.producer || '',
                release_date: data.release_date || ''
            });
        } catch (error) {
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    useEffect(() => {
        fetchGame()
    },[id])

    async function editGame (){
        try {
            const response = await fetch(`http://145.24.223.147:8000/games/${id}`,{
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data)
            navigate('/games')
        } catch (error){
            console.error('Fout bij het ophalen van het product:', error);
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Formulier verzonden:', formData);

        await editGame()
    };

    return (
        <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
            <h1 className="font-bold text-3xl text-center mb-6">Create</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beschrijving:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="producer" className="block text-sm font-medium text-gray-700">Producer:</label>
                    <input
                        type="text"
                        id="producer"
                        name="producer"
                        value={formData.producer}
                        onChange={handleInputChange}
                        className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="release_date" className="block text-sm font-medium text-gray-700">Release Date:</label>
                    <input
                        type="text"
                        id="release_date"
                        name="release_date"
                        value={formData.release_date}
                        onChange={handleInputChange}
                        className="w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                >
                    Verzenden
                </button>
            </form>
        </div>
    );
}

export default EditGame;