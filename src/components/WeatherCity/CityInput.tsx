import Title2 from "../Title2"
import { ComboboxDemo } from "../shade/combobox"
import { City } from "../../interfaces/interfaces"

interface CityInputProps {
  setSelectedCity: React.Dispatch<React.SetStateAction<City | undefined>>
}
export default function CityInput({ setSelectedCity }: CityInputProps) {
  return (
    <div className="mt-4 w-full">
      <Title2 text={"City"} />
      <div className="w-full mt-2 flex">
        <ComboboxDemo setSelectedCity={setSelectedCity} />
      </div>
    </div>
  )
}
