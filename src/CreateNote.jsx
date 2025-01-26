import {useState} from 'react';
import {useNavigate} from "react-router";


function CreateNote(){
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        author: ''
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

        await createNote(formData);

        setFormData({
            title: '',
            body: '',
            author: '',
        });
    };

    async function createNote(note) {
        try {
            const response = await fetch('https://notes.basboot.nl/notes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });

            const data = await response.json();
            console.log(data);
            navigate('/notes')
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
                    <label htmlFor="body">Beschrijving:</label>
                    <input
                        type="text"
                        id="body"
                        name="body"
                        value={formData.body}
                        onChange={handleInputChange}
                        className={'bg-[#AAAAAA] opacity-50'}

                    />
                </div>
                <div>
                    <label htmlFor="author">author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className={'bg-[#AAAAAA] opacity-50'}

                    />
                </div>
                <button type="submit"   className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
                    Verzenden
                </button>
            </form>
        </>
    )
}

export default CreateNote;