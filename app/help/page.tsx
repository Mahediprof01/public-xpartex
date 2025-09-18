export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">How do I place an order?</h3>
                  <p className="text-gray-600 text-sm">
                    Browse products, add to cart, and proceed to checkout. You can also request quotes for bulk orders.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">What is MOQ?</h3>
                  <p className="text-gray-600 text-sm">
                    MOQ stands for Minimum Order Quantity - the smallest amount you can order from a supplier.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">How do I become a supplier?</h3>
                  <p className="text-gray-600 text-sm">
                    Click on "Become a Supplier" in the header and fill out the registration form.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Email Support</h3>
                  <p className="text-gray-600 text-sm">support@Xpartex.com</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Phone Support</h3>
                  <p className="text-gray-600 text-sm">+880 1234-567890</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Live Chat</h3>
                  <button className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white px-4 py-2 text-sm hover:from-sky-600 hover:to-cyan-500 transition-colors">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
