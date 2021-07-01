import { useState, useEffect } from "react"

export default function Timestamp() {
  const [date, setDate] = useState(() => new Date())

  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(timerID)
  })

  const datePart = `${date.getFullYear()}年 ${
    date.getMonth() + 1
  }月 ${date.getDate()}日`
  const timePart = date.toLocaleTimeString()
  const dateTime = `${datePart} ${timePart}`

  return <div>{dateTime}</div>
}
