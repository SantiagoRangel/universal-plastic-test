import { useEffect, useState } from "react"
import Title1 from "../Title1"
import CityInput from "./CityInput"
import WeatherCard from "./WeatherCard"
import { City, weatherApiResponse } from "../../interfaces/interfaces"

export default function WeatherCity() {
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined)
  const [apiData, setApiData] = useState<weatherApiResponse | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (selectedCity) {
        try {
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
            selectedCity.location.coordinates[0]
          }&lon=${selectedCity.location.coordinates[1]}&appid=${
            import.meta.env.VITE_API_KEY
          }`
          const response = await fetch(apiUrl)

          if (response.ok) {
            const jsonData = await response.json()
            setApiData(jsonData)
          } else {
            alert("Failed to fetch data")
            console.error("Failed to fetch data")
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    fetchData()
  }, [selectedCity])

  return (
    <div className="lg:w-2/5 md:w-full sm:w-full w-full">
      <Title1 text={"Weather city"} />
      <CityInput setSelectedCity={setSelectedCity} />
      {apiData && selectedCity ? (
        <div className="mt-4">
          <WeatherCard data={apiData} cityName={selectedCity.city} />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
