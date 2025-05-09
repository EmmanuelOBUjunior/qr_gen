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
  const [qrCode,setQrCode] = useState<string>('')
  const generateVCard = async(contact:ContactInfo)=>{
      return `BEGIN:VCARD VERSION:3.0 FN:${contact.name} TEL:${contact.phone} EMAIL:${contact.email} ${contact.organization ? `ORG:${contact.organization}\n`: ''}  END:VCARD`
  }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try{
      const vCard = await generateVCard(contactInfo)
      const qrCode = await QRCode.toDataURL(vCard)
      setQrCode(qrCode)
    }catch(error){
      console.log("Failed to generate QR code",error)
    }
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>ContactForm</form>
  )
}

export default ContactForm