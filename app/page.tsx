"use client";
import { useState } from "react";

type QRType = "pdf" | "url" | "contact";
export default function Home() {
  const [selectedType, setSelectedType] = useState<QRType>("url");
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          QR Code Generator
        </h1>
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedType("url")}
            className={`px-4 py-2 rounded ${
              selectedType === "url" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setSelectedType("pdf")}
            className={`px-4 py-2 rounded ${
              selectedType === "pdf" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            PDF
          </button>
          <button
          onClick={()=> setSelectedType("contact")}
            className={`px-4 py-2 rounded ${
              selectedType === "contact"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </main>
  );
}
