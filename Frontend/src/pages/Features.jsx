export default function Features() {
  const features = [
    {
      title: "End-to-End Encryption",
      desc: "Your files are secured with strong encryption ensuring complete privacy.",
    },
    {
      title: "6-Digit Secure Code",
      desc: "Share files using a temporary code without exposing sensitive links.",
    },
    {
      title: "Fast File Transfer",
      desc: "Optimized upload and download speeds with minimal latency.",
    },
    {
      title: "No Login Required",
      desc: "Quick sharing without mandatory account creation.",
    },
    {
      title: "Auto Expiry",
      desc: "Files are deleted automatically after download or expiration time.",
    },
    {
      title: "Cross Platform",
      desc: "Access from mobile, tablet, or desktop seamlessly.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-purple-700 to-indigo-600 px-6 py-20 text-white">
      <h1 className="text-4xl font-bold text-center mb-12">
        Powerful Features
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-300">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
