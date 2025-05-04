import { useState } from "react"

type QRType = 'pdf'| 'url'|'contact'
export default function Home(){
  const [selectedType, setSelectType] = useState<QRType>('url')
  return(
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auo">
        <h1 className="text-4xl font-bold text-center mbb-8">
          QR Code Generator
        </h1>
      </div>
    </main>
  )
}