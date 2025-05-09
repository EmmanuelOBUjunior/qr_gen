import {useState} from 'react'
import  QRCode  from 'qrcode'

const PDFUploader = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      setFile(e.target.files[0])
    }
  }
  return (
    <div>PDFUploader</div>
  )
}

export default PDFUploader