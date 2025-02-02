import {useState} from 'react';
import {useNavigate} from "react-router";


function CreateGame(){
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        producer: '',
        release_date: ''
    });

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

        await createGame(formData);

        setFormData({
            title: '',
            description: '',
            genre: '',
            producer: '',
            release_date: ''
        });
    };

    async function createGame(game) {
        try {
            const response = await fetch('http://145.24.223.147:8000/games', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(game)
            });

            const data = await response.json();
            console.log(data);
            navigate('/games')
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

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

export default CreateGame;