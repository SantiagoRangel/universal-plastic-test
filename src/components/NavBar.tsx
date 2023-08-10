import React, { useContext } from "react"
import { AppContext } from "../App"

export default function NavBar() {
  const { page, setPage } = useContext(AppContext)

  return (
    <div className="border-t-2 p-5 h-24 w-full flex justify-evenly m-0 border-sky-200">
      {page === 1 ? (
        <div className="flex flex-col items-center">
          <img src="/disc.svg" className="w-6 hover:cursor-pointer " />

          <div className="Ellipse5 absolute bottom-10 w-1 h-1 bg-sky-400 rounded-full  " />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="/disc-light.svg"
            className="w-6 hover:cursor-pointer "
            onClick={() => {
              setPage(1)
            }}
          />
          <div className="Ellipse5 hidden bottom-10 w-1 h-1 bg-sky-400 rounded-full  " />
        </div>
      )}
      {page === 2 ? (
        <div className="flex flex-col items-center">
          <img src="/cloud.svg" className="w-6 hover:cursor-pointer " />

          <div className="Ellipse5 absolute bottom-10 w-1 h-1 bg-sky-400 rounded-full  " />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="/cloud-light.svg"
            className="w-6 hover:cursor-pointer "
            onClick={() => {
              setPage(2)
            }}
          />
          <div className="Ellipse5 hidden bottom-10 w-1 h-1 bg-sky-400 rounded-full  " />
        </div>
      )}
    </div>
  )
}
