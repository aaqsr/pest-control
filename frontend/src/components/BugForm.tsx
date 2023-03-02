import { useState } from 'react'
import { APP_URL } from '../global';
import { useBugsContext } from '../hooks/useBugsContext'

const BugForm = () => {
    const { dispatch } = useBugsContext();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [lvl, setLvl] = useState(0);
    const [assn, setAssn] = useState('');

    const [error, setError]: any = useState(null);
    const [emptyFields, setEmptyFields]: any = useState([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const bug = { title, desc, lvl, assn };

        const response = await fetch(APP_URL + '/api/bugs', {
            method: 'POST',
            body: JSON.stringify(bug),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setEmptyFields([]);
            setError(null);
            setTitle('');
            setDesc('');
            setAssn('');
            setLvl(0);
            dispatch({ type: 'CREATE_BUG', payload: json })
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Bug</h3>

            <label>Bug Name:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Bug Level:</label>
            <select
                onChange={(e) => setLvl(parseInt(e.target.value, 10))}
                value={lvl}
                className={emptyFields.includes('reps') ? 'error' : ''}
            >
                <option value={0}>0: Not Important</option>
                <option value={1}>1: Important</option>
                <option value={2}>2: Urgent</option>
                <option value={3}>3: Catastrophic</option>
            </select>

            <label>Assigned To:</label>
            <input
                type="text"
                onChange={(e) => setAssn(e.target.value)}
                value={assn}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Bug</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BugForm;