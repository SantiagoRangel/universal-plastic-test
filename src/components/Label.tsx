interface LabelProps {
  text: string
  color?: string
}

export default function Label({ text, color }: LabelProps) {
  const className = `Latitude ${
    color ? color : "text-slate-500"
  } text-xs uppercase`
  return <div className={className}>{text}</div>
}
