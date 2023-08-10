import { useEffect, useRef, useState } from "react"
import * as L from "leaflet"

interface MapProps {
  latitude: string
  longitude: string
  correctCoords: boolean
  radius: number
}

const mapIcon = L.icon({
  iconUrl: "map-pin.svg",
  iconSize: [30, 30],
})

export default function MapArea({
  latitude,
  longitude,
  correctCoords,
  radius,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [lat, setLat] = useState<number>(0)
  const [long, setLong] = useState<number>(0)
  const [map, setMap] = useState<any>(undefined)
  const [lastMarker, setLastMarker] = useState<L.Marker | undefined>(undefined)
  const [lastArea, setLastArea] = useState<L.Circle | undefined>(undefined)

  const getUserCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const ulatitude = position.coords.latitude
          const ulongitude = position.coords.longitude
          setLat(ulatitude)
          setLong(ulongitude)
        }
      )
    } else {
      alert("Geolocation is not supported by this browser.")
      console.log("Geolocation is not supported by this browser.")
    }
  }

  const lookAt = (lat: number, long: number, init: boolean) => {
    if (correctCoords || init) {
      map.setView([lat, long], 13)
      map.removeLayer(lastArea)

      drawArea(lat, long)
      map.removeLayer(lastMarker)
      setLastMarker(
        L.marker([lat, long], {
          icon: mapIcon,
        }).addTo(map)
      )
    }
  }

  const drawArea = (lat: number, long: number) => {
    setLastArea(
      L.circle([lat, long], {
        color: "#42C3EE",
        fillColor: "#42C3EE",
        fillOpacity: 0.4,
        radius: radius,
        weight: 2,
      }).addTo(map)
    )
  }

  useEffect(() => {
    getUserCoordinates()
    if (mapRef.current) {
      const map: L.Map = L.map(mapRef.current).setView([41.9, 2.2], 13)
      setMap(map)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map)
      setLastMarker(L.marker([41.9, 2.2], { icon: mapIcon }).addTo(map))
      setLastArea(
        L.circle([41.9, 2.2], {
          color: "#42C3EE",
          fillColor: "#42C3EE",
          fillOpacity: 0.4,
          radius: radius,
          weight: 2,
        }).addTo(map)
      )

      return () => {
        map.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map) {
      console.log("lat long", lat, long)
      lookAt(lat, long, true)
    }
  }, [lat, long])

  useEffect(() => {
    if (map) {
      lookAt(parseFloat(latitude), parseFloat(longitude), false)
    }
  }, [latitude, longitude])

  useEffect(() => {
    lastArea?.setRadius(radius)
  }, [radius])

  return <div ref={mapRef} className="mt-5 w-full h-56" />
}
