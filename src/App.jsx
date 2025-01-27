import {createBrowserRouter, RouterProvider} from 'react-router';

import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Games from "./Games.jsx";
import CreateGame from "./CreateGame.jsx";
import GameDetail from "./GameDetail.jsx";
import EditGame from "./EditGame.jsx";

const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/games',
            element:<Games/>
        },
        {
            path:'/games/create',
            element:<CreateGame/>
        },
        {
            path:'/games/:id',
            element:<GameDetail/>
        },
        {
            path:'/games/:id/edit',
            element:<EditGame/>

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

// filters,
// patch,
// pagination,