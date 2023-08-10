import { useContext } from "react"
import { AppContext } from "../App"
import AreaSelector from "./AreaSelector/AreaSelector"
import WeatherCity from "./WeatherCity/WeatherCity"
import NavBar from "./NavBar"

export default function Main() {
  const { page } = useContext(AppContext)

  return (
    <div className="mt-10 pl-4 pr-4 flex justify-center">
      {page === 1 ? <AreaSelector /> : <WeatherCity />}
      <div className="fixed bottom-0 w-full">
        <NavBar></NavBar>
      </div>
    </div>
  )
}
