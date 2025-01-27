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
        event.preventDefault(); // Voorkomt pagina-herladen
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

    return(
        <>
            <h1 className={'font-bold text-2xl'}>Create</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={'bg-[#AAAAAA] opacity-50'}
                    />
                </div>
                <div>
                    <label htmlFor="description">Beschrijving:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={'bg-[#AAAAAA] opacity-50'}

                    />
                </div>
                <div>
                    <label htmlFor="genre">genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className={'bg-[#AAAAAA] opacity-50'}

                    />
                </div>
                <div>
                    <label htmlFor="producer">producer:</label>
                    <input
                        type="text"
                        id="producer"
                        name="producer"
                        value={formData.producer}
                        onChange={handleInputChange}
                        className={'bg-[#AAAAAA] opacity-50'}

                    />
                </div>
                <div>
                    <label htmlFor="release_date">release_date:</label>
                    <input
                        type="text"
                        id="release_date"
                        name="release_date"
                        value={formData.release_date}
                        onChange={handleInputChange}
                        className={'bg-[#AAAAAA] opacity-50'}

                    />
                </div>
                <button type="submit"
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
                    Verzenden
                </button>
            </form>
        </>
    )
}

export default CreateGame;