import { BugsContext } from "../context/bugContext"
import { useContext } from "react"

export const useBugsContext: any = () => {
  const context = useContext(BugsContext)

  if(!context) {
    throw Error('useBugsContext must be used inside a WorkoutsContextProvider')
  }

  return context
}