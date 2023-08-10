import Title1 from "../Title1"
import Title2 from "../Title2"
import { useState } from "react"
import CoordinatesInput from "./CoordinatesInput"
import { Slider } from "../Slider"
import MapArea from "./MapArea"

export default function AreaSelector() {
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [correctCoords, setCorrectCoords] = useState<boolean>(false)
  const [radius, setRadius] = useState<number>(1)

  return (
    <div className="lg:w-2/5 md:w-2/5 sm:w-full">
      <Title1 text={"Area selector"} />
      <CoordinatesInput
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setCorrectCoords={setCorrectCoords}
        correctCoords={correctCoords}
      />

      <div className="mt-4 flex justify-between">
        <Title2 text={"Area"} />
        <div className="w-16 text-slate-600 text-xs font-normal mt-2">
          max 20 km
        </div>
      </div>
      <div className="mt-3">
        <Slider
          defaultValue={[1]}
          max={20}
          step={1}
          onValueChange={(value) => {
            setRadius(value[0])
          }}
        />
      </div>
      <MapArea
        latitude={latitude}
        longitude={longitude}
        correctCoords={correctCoords}
        radius={radius * 1000}
      />
    </div>
  )
}
