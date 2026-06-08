export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      subtitle: "Perfect for basic usage",
      features: [
        "4 uploads only",
        "1000MB file limit",
        "24hr file expiry",
        "Basic security",
      ],
      button: "Current Plan",
      disabled: true,
    },

    {
      name: "Premium",
      price: "₹299/month",
      subtitle: "Best for regular users",
      features: [
        "Unlimited uploads",
        "5GB file limit",
        "One-time secure sharing",
        "Advanced encryption",
        "Priority speed",
        "Long-term storage",
      ],
      button: "Upgrade Now",
      highlight: true,
    },

    {
      name: "Enterprise",
      price: "Custom",
      subtitle: "For teams & companies",
      features: [
        "Unlimited everything",
        "Team dashboard",
        "Admin controls",
        "Dedicated support",
        "Custom integrations",
      ],
      button: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-900 to-black text-white px-6 py-20">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Upgrade Your Experience
        </h1>

        <p className="mt-5 text-gray-300 text-lg">
          Unlock premium file sharing features with faster, secure, and
          unlimited transfers.
        </p>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-3xl p-8 border transition-all duration-300 hover:scale-105 shadow-2xl ${
              plan.highlight
                ? "bg-linear-to-br from-purple-600 to-indigo-700 border-purple-400"
                : "bg-white/10 backdrop-blur-xl border-white/20"
            }`}
          >
            {/* POPULAR TAG */}
            {plan.highlight && (
              <div className="absolute -top-4 right-6 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </div>
            )}

            {/* PLAN NAME */}
            <h2 className="text-3xl font-bold">{plan.name}</h2>

            <p className="mt-2 text-gray-300">{plan.subtitle}</p>

            {/* PRICE */}
            <div className="mt-8">
              <span className="text-5xl font-extrabold">{plan.price}</span>
            </div>

            {/* FEATURES */}
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>

                  <span className="text-gray-100">{feature}</span>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              disabled={plan.disabled}
              className={`w-full mt-10 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                plan.disabled
                  ? "bg-gray-500 cursor-not-allowed"
                  : plan.highlight
                    ? "bg-white text-purple-700 hover:bg-gray-200 hover:scale-105"
                    : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      {/* PAYMENT METHODS */}
      <div className="max-w-4xl mx-auto mt-24">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">
          <h2 className="text-4xl font-bold text-center">Payment Methods</h2>

          <p className="text-center text-gray-300 mt-3">
            Secure and trusted payment options
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {/* UPI */}
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10 hover:scale-105 transition">
              <h3 className="text-2xl font-bold">UPI</h3>

              <p className="mt-3 text-gray-300">sandesh@upi</p>

              <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition">
                Pay with UPI
              </button>
            </div>

            {/* PAYTM */}
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10 hover:scale-105 transition">
              <h3 className="text-2xl font-bold">PhonePay</h3>

              <p className="mt-3 text-gray-300">+91 7264831073</p>

              <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition">
                Pay with Paytm
              </button>
            </div>

            {/* GOOGLE PAY */}
            <div className="bg-black/30 rounded-2xl p-6 border border-white/10 hover:scale-105 transition">
              <h3 className="text-2xl font-bold">GooglePay</h3>

              <p className="mt-3 text-gray-300">+91 7264831073</p>

              <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition">
                Pay with GPay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center mt-20 text-gray-400 text-sm">
        © 2026 FileShare • Secure cloud file sharing platform
      </div>
    </div>
  );
}
