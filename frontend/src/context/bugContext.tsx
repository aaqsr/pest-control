import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext(null);

export const bugsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_BUG':
      return { 
        bugs: action.payload 
      }
    case 'CREATE_BUG':
      return { 
        bugs: [action.payload, ...state.workouts] 
      }
    case 'DELETE_BUG':
      return { 
        bugs: state.bugs.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const WorkoutsContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(bugsReducer, { 
    bugs: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}