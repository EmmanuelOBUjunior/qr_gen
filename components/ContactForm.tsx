import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

interface ContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization?: string;
}

const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organization: "",
  });
  const [qrCode, setQrCode] = useState<string>("");
  const generateVCard = (contact: ContactInfo) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${contact.firstName}
LN:${contact.lastName}
TEL:${contact.phone}
EMAIL:${contact.email}
${contact.organization ? `ORG:${contact.organization}\n` : ""}END:VCARD`;
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
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={contactInfo.firstName}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, firstName: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={contactInfo.firstName}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, firstName: e.target.value })
          }
        />
      </div>
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
          className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={contactInfo.email}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, email: e.target.value })
          }
        />
      </div>
      <div>
        <label
          htmlFor="organization"
          className="block text-sm font-medium text-gray-700"
        >
          Organization (Optional)
        </label>
        <input
          type="text"
          id="organization"
          className="p-2 mt-1 block w-full rounded border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={contactInfo.organization}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, organization: e.target.value })
          }
        />
      </div>
      <button className="mt-2 w-full bg-blue-500 rounded text-white py-2 px-4 hover:bg-blue-600">
        Generate QR Code
      </button>

      {qrCode && (
        <div className="text-center">
          <Image
            width={250}
            height={250}
            src={qrCode}
            alt="QR Code"
            className="mx-auto"
          />
          <a
            className="mt-2 inline-block text-blue-500 hover:text-blue-600"
            download="contact-qr-code.png"
            href={qrCode}
          >
            Download QR Code
          </a>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
