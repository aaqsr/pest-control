import { createContext, useReducer } from 'react'

export const BugsContext = createContext(null);

export const bugsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_BUG':
      return { 
        bugs: action.payload 
      }
    case 'CREATE_BUG':
      return { 
        bugs: [action.payload, ...state.bugs] 
      }
    case 'DELETE_BUG':
      return { 
        bugs: state.bugs.filter(function (w: any) { return w._id !== action.payload._id }) 
      }
    default:
      return state;
  }
}

export const BugsContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(bugsReducer, {
    bugs: null
  });
  
  return (
    <BugsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </BugsContext.Provider>
  )
}