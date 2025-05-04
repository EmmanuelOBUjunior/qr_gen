import { useState } from "react"

type QRType = 'pdf'| 'url'|'contact'
export default function Home(){
  const [selectedType, setSelectType] = useState<QRType>('url')
  return(
    <main className="miin-h-screen p-8">

    </main>
  )
}