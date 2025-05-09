import { useState } from "react";
import QRCode from "qrcode";

interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  organization?: string;
}

const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
    organization: "",
  });
  const [qrCode, setQrCode] = useState<string>("");
  const generateVCard = async (contact: ContactInfo) => {
    return `BEGIN:VCARD VERSION:3.0 FN:${contact.name} TEL:${
      contact.phone
    } EMAIL:${contact.email} ${
      contact.organization ? `ORG:${contact.organization}\n` : ""
    }  END:VCARD`;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const vCard = await generateVCard(contactInfo);
      const qrCode = await QRCode.toDataURL(vCard);
      setQrCode(qrCode);
    } catch (error) {
      console.log("Failed to generate QR code", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 p-2 w-full border rounded-md"
          value={contactInfo.name}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, name: e.target.value })
          }
        />
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="mt-1 p-2 w-full border rounded-md"
            value={contactInfo.phone}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({...contactInfo, email: e.target.value })
            }
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
