interface Title2Props {
  text: string
}

export default function Title2({ text }: Title2Props) {
  return (
    <div className="Location text-indigo-950 text-base font-semibold">
      {text}
    </div>
  )
}
