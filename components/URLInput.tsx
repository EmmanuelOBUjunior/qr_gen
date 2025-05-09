import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const URLInput = () => {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const generateQRCode = async () => {
    try {
      if (!url) {
        setError("Please enter a URL");
        return;
      }
      const qrDataURL = await QRCode.toDataURL(url);
      setQrCode(qrDataURL);
      setError("");
    } catch (error) {
      setError("Failed to generate QR code. Please try again later");
      console.error(error);
    }
  };
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700"
        >
          Enter URL
        </label>
        <input
          type="url"
          id="url"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      <button
        onClick={generateQRCode}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Generate QR Code
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {qrCode && <div className="text-center">
        <Image src={qrCode} alt="QR Code" className="mx-auto" width={100} height={100}/><a className="mt-2 inline-block text-blue-500 hover:text-blue-600 hover:cursor-pointer" download='qr-code.png' href={qrCode}>Download QR Code</a>
        </div>}
    </div>
  );
};

export default URLInput;
