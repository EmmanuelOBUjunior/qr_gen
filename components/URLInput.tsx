import { useState } from "react";

const URLInput = () => {
    const [url, setUrl] = useState("");
    const [qrCode, setQrCode] = useState('')
    const [error, setError] = useState('')
  return (
    <div>URLInput</div>
  )
}

export default URLInput