export default function PrivacyPolicyPage() {
    return (
      <div className="container mx-auto px-6 py-16 text-lightGray">
        <h1 className="text-4xl font-bold text-center text-teal mb-8">Privacy Policy</h1>
        <div className="max-w-3xl mx-auto text-lightGray space-y-6">
          <p>
            At <span className="text-teal font-bold">Jake&apos;s Shop</span>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data.
          </p>
          <h2 className="text-2xl font-bold text-lightGray">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, and payment details when you use our services or interact with our website.
          </p>
          <h2 className="text-2xl font-bold text-lightGray">How We Use Your Information</h2>
          <p>
            Your information is used to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Process your orders and payments.</li>
            <li>Provide customer support.</li>
            <li>Send updates and promotional offers.</li>
          </ul>
          <h2 className="text-2xl font-bold text-lightGray">Data Security</h2>
          <p>
            We implement appropriate measures to secure your personal information from unauthorized access, alteration, or disclosure.
          </p>
          <p>
            For any questions regarding this Privacy Policy, feel free to contact us at <span className="text-teal">support@jakes-shop.com</span>.
          </p>
        </div>
      </div>
    );
  }
  