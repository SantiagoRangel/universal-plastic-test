import { weatherApiResponse } from "../../interfaces/interfaces"
import Label from "../Label"
import { Progress } from "../shade/progress"

interface WeatherCardProps {
  data: weatherApiResponse
  cityName: string
}

export default function WeatherCard({ data, cityName }: WeatherCardProps) {
  const sunrise = new Date((data.sys.sunrise + data.timezone) * 1000)
  const sunset = new Date((data.sys.sunset + data.timezone) * 1000)

  const openGoogleMaps = () => {
    const url = `https://maps.google.com/?q=${data.coord.lon},${data.coord.lat}`
    window.open(url, "_blank")
  }

  const kelvinToCelsius = (temp: number): string => {
    return (temp - 273.15).toFixed(2)
  }
  return (
    <div className="w-full h-62 p-4 rounded-lg border border-sky-400 ">
      <div className="flex  gap-3">
        <div className="w-12 h-12 border-gray border-2 rounded-full">
          <img
            className="w-9 mt-1 ml-1"
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          />
        </div>
        <div>
          <Label text="WEATHER" />
          <p>{data.weather[0].main} </p>
        </div>
        <div>
          <Label text="DESCRIPTION" />
          <p>{data.weather[0].description} </p>
        </div>
      </div>
      <div className="w-ful mt-3 h-px border border-sky-200"></div>
      <div className="flex gap-8 mt-3">
        <div>
          <Label text="SUNSET" />
          <p>{`${sunset.getHours()}:${sunset.getMinutes()}`} </p>
        </div>
        <div>
          <Label text="SUNRISE" />
          <p>{`${sunrise.getHours()}:${sunrise.getMinutes()}`} </p>
        </div>
        <div>
          <Label text="LOCATION " />
          <div
            className="flex gap-1 hover:cursor-pointer"
            onClick={() => {
              openGoogleMaps()
            }}
          >
            <img className="w-4" src="/map-pin-black.svg" />
            <p> {cityName}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-5 mt-3">
        <div>
          <Label text="TEMPERATURE" />
          <p>{kelvinToCelsius(data.main.temp)} </p>
        </div>
        <div>
          <Label text="FEELS LIKE" />
          <p>{kelvinToCelsius(data.main.feels_like)} </p>
        </div>
        <div>
          <Label text="LOCATION " />
          <div
            className="flex gap-1 hover:cursor-pointer"
            onClick={() => {
              openGoogleMaps()
            }}
          >
            <img className="w-4" src="/map-pin-black.svg" />
            <p> {cityName}</p>
          </div>
        </div>
      </div>
      <div className="mt-2 ">
        <p className="text-xs text-right text-gray-500">
          {data.main.humidity}% humidity
        </p>
        <Progress className="mt-1" value={data.main.humidity} />
      </div>
    </div>
  )
}
