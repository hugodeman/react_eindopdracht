import {createBrowserRouter, RouterProvider} from 'react-router';

import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Notes from "./Notes.jsx";
import CreateNote from "./CreateNote.jsx";
import NoteDetail from "./NoteDetail.jsx";
import EditNote from "./EditNote.jsx";

const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/notes',
            element:<Notes/>
        },
        {
            path:'/notes/create',
            element:<CreateNote/>
        },
        {
            path:'/notes/:id',
            element:<NoteDetail/>
        },
        {
            path:'/notes/:id/edit',
            element:<EditNote/>

        }
    ]
}]);

function App() {

    return(
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App
