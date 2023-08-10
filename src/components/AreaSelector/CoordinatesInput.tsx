import Title2 from "../Title2"
import Label from "../Label"
import { SetStateAction, useEffect, useState } from "react"

interface CoordinatesProps {
  setLatitude: React.Dispatch<SetStateAction<string>>
  setLongitude: React.Dispatch<SetStateAction<string>>
  setCorrectCoords: React.Dispatch<SetStateAction<boolean>>
  correctCoords: boolean
}

export default function CoordinatesInput({
  setLatitude,
  setLongitude,
  setCorrectCoords,
  correctCoords,
}: CoordinatesProps) {
  const [validLong, setValidLong] = useState<boolean>(false)
  const [validLat, setValidLat] = useState<boolean>(false)
  const [userInteraction, setUserInteraction] = useState<boolean>(false)

  const validateLatitude = (value: string) => {
    const latitudePattern =
      /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/
    return latitudePattern.test(value)
  }

  const validateLongitude = (value: string) => {
    const longitudePattern =
      /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
    return longitudePattern.test(value)
  }

  const handleInputChangeLatitude = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    !userInteraction && setUserInteraction(true)
    const input = event.target as HTMLInputElement
    const value = input.value
    const validation = validateLatitude(value)
    if (validation) {
      setLatitude(value)
      setValidLat(true)
    } else {
      setValidLat(false)
    }
  }

  const handleInputChangeLongitude = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    !userInteraction && setUserInteraction(true)
    const input = event.target as HTMLInputElement
    const value = input.value
    const validation = validateLongitude(value)
    if (validation) {
      setLongitude(value)
      setValidLong(true)
    } else {
      setValidLong(false)
    }
  }

  useEffect(() => {
    if (validLong && validLat) {
      // setValidCoords(true)
      setCorrectCoords(true)
    } else {
      // setValidCoords(false)
      setCorrectCoords(false)
    }
  }, [validLat, validLong])

  return (
    <div className="mt-4">
      <Title2 text={"Location"} />

      <div className="flex w-full mt-3">
        <div className="w-full">
          <Label text={"LATITUDE"} />
        </div>
        <div className="w-full ">
          <Label text={"LONGITUDE"} />
        </div>
      </div>
      <div className="w-full mt-2 flex">
        <input
          className={
            "flex w-full -mr-1 disabled:cursor-not-allowed focus:outline-none disabled:opacity-50 h-11 bg-sky-50 rounded-l-lg p-4 text-[#246B83] text-base font-normal"
          }
          onChange={handleInputChangeLatitude}
        ></input>
        <div className=" w-px h-7 mt-2   border border-sky-200"></div>
        <input
          className={
            "flex w-full disabled:cursor-not-allowed focus:outline-none disabled:opacity-50 h-11 bg-sky-50 rounded-r-lg p-4  text-[#246B83] text-base font-normal"
          }
          onChange={handleInputChangeLongitude}
        />
      </div>
      {!userInteraction || (userInteraction && correctCoords) ? (
        ""
      ) : (
        <div className="mt-2">
          <Label
            text={"Please enter valid coordinates"}
            color="text-rose-500"
          />
        </div>
      )}
    </div>
  )
}
