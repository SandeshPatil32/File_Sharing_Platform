export function InfoSection() {
  return (
    <div className="bg-gray-100 text-center py-20 px-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-12">How It Works</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xs">
          <div className="text-5xl mb-4">📤</div>
          <h3 className="text-lg font-semibold text-blue-700">
            1. Generate Code
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Upload your files and get a secure code.
          </p>
        </div>

        <div className="hidden md:block text-3xl text-gray-400">➜</div>

        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xs">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-lg font-semibold text-blue-700">2. Share Code</h3>
          <p className="text-gray-500 text-sm mt-2">
            Send the code to your recipient.
          </p>
        </div>

        <div className="hidden md:block text-3xl text-gray-400">➜</div>

        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xs">
          <div className="text-5xl mb-4">📥</div>
          <h3 className="text-lg font-semibold text-blue-700">
            3. Receive Files
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Enter the code and download the files.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-blue-700 mt-20 mb-12">
        Why Choose FileXChange?
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="text-lg font-semibold text-blue-700">
            Fast Transfers
          </h3>
          <p className="text-gray-500 text-sm mt-2">High-speed & reliable.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="text-lg font-semibold text-blue-700">
            End-to-End Encryption
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Your files are fully protected.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-lg font-semibold text-blue-700">Easy to Use</h3>
          <p className="text-gray-500 text-sm mt-2">
            Simple and intuitive interface.
          </p>
        </div>
      </div>
    </div>
  );
}
