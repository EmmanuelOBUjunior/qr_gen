import { useState } from "react";
import QRCode from "qrcode";

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
          className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
};

export default URLInput;
