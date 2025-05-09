import { useState } from "react";
import QRCode from 'qrcode'

const URLInput = () => {
    const [url, setUrl] = useState("");
    const [qrCode, setQrCode] = useState('')
    const [error, setError] = useState('')

    const generateQRCode = async()=>{
      try{
        if(!url){
          setError('Please enter a URL')
          return
        }
        const qrDataURL = await QRCode.toDataURL(url);
        setQrCode(qrDataURL)
        setError('')
      }catch(error){
        setError('Failed to generate QR code. Please try again later')
        console.error(error)
      }
    }
  return (
    <div>URLInput</div>
  )
}

export default URLInput