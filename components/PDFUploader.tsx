import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const PDFUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [qrCode, setQrCode] = useState<string | null>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a PDF file");
        setFile(null)
        return
      }
      if(selectedFile.size > MAX_FILE_SIZE){
        setError('File size must be less than 5MB')
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError("");
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
         <p className="text-sm text-gray-500 mt-2">Maximum file size: 5MB</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-2 px-4 rounded ${
          !file || uploading
         ? 'bg-gray-300 cursor-not-allowed': 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Upload and Generate QR Code
      </button>
      {qrCode && (
        <div className="text-center">
          <Image
            width={250}
            height={250}
            alt="PDF QR Code"
            src={qrCode}
            className="mx-auto"
          />
          <a href={qrCode} download='pdf-qr-Code.png' className="mt-2 inline-block text-blue-500 hover:text-blue-600">Download QR Code</a>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
