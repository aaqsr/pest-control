import { BugsContext } from '../context/bugContext'
import { APP_URL } from '../global'
import { useBugsContext } from '../hooks/useBugsContext'

const BugDetails = ({ bug }: any) => {
  const { dispatch } = useBugsContext()

  const handleClick = async () => {
    const response = await fetch(APP_URL + '/api/bugs/' + bug._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_BUG', payload: json})
    }
  }

  const bugLevelHandler = (lvl: number) => {
    switch (lvl) {
      case 0:
        return lvl + " - " + "Not Important";
      case 1:
        return lvl + " - " + "Important";
      case 2:
        return lvl + " - " + "Urgent";
      case 3:
        return lvl + " - " + "Catastrophic";
    }
  }

  return (
    <div className="workout-details">
      <h4>{bug.title}</h4>
      <p><strong>Level: </strong>{bugLevelHandler(bug.bug_level)}</p>
      {/* <p><strong>Assigned to: </strong>{ bug.assigned_to }</p> */}
      <p><strong>Description: </strong>{bug.description}</p>
      {/* <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> */}
      {/* <span className="material-symbols-outlined" onClick={handleClick}>Delete</span> */}
      <div className='align-right'>
        <button className="bug-del-button nav-button" onClick={handleClick}>Delete</button>
      </div>
    </div>
  )
}

export default BugDetails