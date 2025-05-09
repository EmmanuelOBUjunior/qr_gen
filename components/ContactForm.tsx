import {useState} from 'react'
import QRCode from 'qrcode'

interface ContactInfo{
  name:string;
  phone: string;
  email: string;
  organization?: string;
}

const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    phone: '',
    email: '',
    organization: ''
  })
  const [qrCode setQrCode] = useState<string>('')
  return (
    <div>ContactForm</div>
  )
}

export default ContactForm