import { useState } from "react";

export default function Help() {
  const [open, setOpen] = useState(null);

  const faqs = [
  {
    q: "How does file sharing work?",
    a: "You upload a file and the system generates a unique 6-digit code. Share this code with the recipient. They enter the code to securely download the file. No public links are exposed."
  },
  {
    q: "Is my file secure?",
    a: "Yes. Files are encrypted during upload and transfer. Access is restricted using a one-time code, and files are automatically deleted after download or expiry."
  },
  {
    q: "Do I need an account?",
    a: "No, you can share files instantly without signing up. However, creating an account allows you to track uploads, increase file size limits, and manage your files."
  },
  {
    q: "What is file expiry?",
    a: "Each file has a limited lifetime. It will either expire after a certain time (e.g., 24 hours) or immediately after it is downloaded once, depending on your settings."
  },
  {
    q: "What is the maximum file size?",
    a: "Free users can upload files up to a limited size (e.g., 50MB). Pro users get higher limits, and enterprise users can transfer large files without restrictions."
  },
  {
    q: "Can I download a file multiple times?",
    a: "By default, files are designed for one-time download for security reasons. However, premium users may enable multiple downloads if needed."
  },
  {
    q: "What happens if I enter the wrong code?",
    a: "You will not be able to access the file. The system ensures that only the correct code grants access, preventing unauthorized downloads."
  },
  {
    q: "Are files stored permanently?",
    a: "No. Files are temporarily stored and automatically deleted after expiry or download. This reduces storage cost and improves privacy."
  },
  {
    q: "Can I share files with multiple people?",
    a: "Yes, you can share the same code with multiple users, but access may be limited depending on download settings (single-use or multiple-use)."
  },
  {
    q: "Is there a history of my uploads?",
    a: "Only registered users can view upload history and manage previously shared files. Guests do not have access to file history."
  },
  {
    q: "What file types are supported?",
    a: "You can upload most common file types including images, videos, documents, and compressed files. Restricted or harmful file types may be blocked."
  },
  {
    q: "What happens if my upload fails?",
    a: "If your upload fails due to network issues, you can retry. Large files may require a stable connection for successful transfer."
  },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-purple-700 to-indigo-600 px-6 py-20 text-white">
      <h1 className="text-4xl font-bold text-center mb-12">Help & FAQs</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg p-4 rounded-lg border border-white/20 cursor-pointer"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <h2 className="font-semibold">{item.q}</h2>

            {open === i && <p className="text-gray-300 mt-2">{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
