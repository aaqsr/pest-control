import { useEffect } from "react"
import { useBugsContext } from "../hooks/useBugsContext" 

// components
import BugDetails from "../components/BugDetails"
import { APP_URL } from "../global"
// import BugForm from "../components/BugForm"

const Home = () => {
  const { bugs, dispatch } = useBugsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
        const response = await fetch(APP_URL + '/api/bugs/');
        const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_BUG', payload: json})
      }
    }
    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
              {bugs?.map((bug: any) => (
                  <BugDetails bug={bug} key={bug._id} />
                ))}
      </div>
      {/* <BugForm /> */}
    </div>
  )
}

export default Home