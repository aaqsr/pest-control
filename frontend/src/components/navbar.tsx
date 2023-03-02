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
                    <h1 className='nav-h1'>Pest Control</h1>
                </Link>
                <nav>
                    {user ?
                        (<div>
                            <span style={{ fontWeight: 700, margin: '1em' }}>{user.name}</span>
                            <button className="nav-button" onClick={handleLogOutButtonClick}>Log out</button>
                        </div>) :
                        (<div>
                            <Link className="nav-button" to="/login">Login</Link>
                            <Link className="nav-button" to="/signup">Signup</Link>
                        </div>)}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;