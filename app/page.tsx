'use client'
import { useState } from "react"

type QRType = 'pdf'| 'url'|'contact'
export default function Home(){
  const [selectedType, setSelectType] = useState<QRType>('url')
  return(
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          QR Code Generator
        </h1>
        <div className="flex justify-center gap-4 mb-8">
          <button className={`px-4 py-2 rounded ${selectedType === 'url'? 'bg-blue-500 text-white': 'g-gray-200'}`}>URL</button>
        </div>
      </div>
    </main>
  )
}