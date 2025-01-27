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
        event.preventDefault(); // Voorkomt pagina-herladen
        console.log('Formulier verzonden:', formData);

        await editGame()
    };

    return (
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

export default EditGame;