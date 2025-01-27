import {Link, Outlet} from "react-router";

function Layout(){
    return (
        <>
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Games :Þ</h1>
                </div>
            </header>

            <nav className="bg-blue-500 text-white py-3 shadow-md">
                <div className="container mx-auto px-6 flex space-x-4">
                    <Link to="/" className="text-lg font-semibold hover:text-gray-300">
                        Home
                    </Link>
                    <Link to="/games" className="text-lg font-semibold hover:text-gray-300">
                        Games
                    </Link>
                    <Link to="/games/create" className="text-lg font-semibold hover:text-gray-300">
                        Create
                    </Link>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-6">
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;