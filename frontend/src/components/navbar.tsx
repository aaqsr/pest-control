import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogOut } from '../hooks/useLogOut'

const Navbar = () => {
    const { logout } = useLogOut();
    const { user }: any = useAuthContext();

    const handleLogOutButtonClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Pest Control</h1>
                </Link>
                <nav>
                    {user ?
                        (<div>
                            <span>{user?.name}</span>
                            <button onClick={handleLogOutButtonClick}>Log out</button>
                        </div>) :
                        (<div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar