export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h1 className="text-white text-2xl font-bold mb-3">FileShare</h1>
          <p className="text-sm">
            Secure and fast file sharing platform. Upload, store and share files
            instantly.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-white font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Upload</li>
            <li className="hover:text-white cursor-pointer">My Files</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-white font-semibold mb-3">Resources</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms of Service
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold mb-3">Contact</h2>
          <p className="text-sm">support@fileshare.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
        © {new Date().getFullYear()} FileShare. All rights reserved.
      </div>
    </footer>
  );
}
