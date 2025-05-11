import { useState } from "react";
import QRCode from "qrcode";

const PDFUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please select a PDF file");
        setFile(null);
      }
    }
  };
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      //Generate QR Code with the file URL
      const qrDataURL = await QRCode.toDataURL(data.fileUrl);
      setQrCode(qrDataURL);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleUpload} disabled={!file || uploading}>
        Upload and Generate QR Code
      </button>
    </div>
  );
};

export default PDFUploader;
