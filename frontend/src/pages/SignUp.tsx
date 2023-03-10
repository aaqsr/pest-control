import { FormEvent, useState } from "react"
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { signup, error, isLoading } = useSignUp();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Don't refresh page

        await signup(name, email, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Name:</label>
            <input
                type="string"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Email address:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp;