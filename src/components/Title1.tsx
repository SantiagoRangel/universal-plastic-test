interface Title1Props {
  text: string
}

export default function Title1({ text }: Title1Props) {
  return (
    <div className="text-center text-indigo-950 text-xl font-semibold">
      {text}
    </div>
  )
}
