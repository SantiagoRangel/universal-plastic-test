import { createContext, useState } from "react"
import Main from "./components/Main"
interface AppContextType {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const AppContext = createContext<AppContextType>({
  page: 1,
  setPage: () => {},
})

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1)

  return (
    <>
      <AppContext.Provider value={{ page, setPage }}>
        <Main />
      </AppContext.Provider>
    </>
  )
}

export default App
