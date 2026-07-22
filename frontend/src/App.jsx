import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">

      {/* Navbar */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">
            CodeOrbit Contact Hub
          </h1>

          <div className="flex gap-6">
            <a
              href="#home"
              className="hover:text-blue-400 transition"
            >
              Home
            </a>

            <a
              href="#contact"
              className="hover:text-blue-400 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-slate-900 text-white py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-blue-400 font-semibold mb-4">
            WELCOME TO CODEORBIT CONTACT HUB
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's Connect and Start a Conversation
          </h2>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Have a question, suggestion, or want to get in touch?
            Send us a message and we'll get back to you.
          </p>

          <a
            href="#contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Contact Us
          </a>

        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <p className="text-blue-600 font-semibold mb-3">
              GET IN TOUCH
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              We'd Love to Hear From You
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Whether you have a question, feedback, or simply want to say
              hello, feel free to send us a message through the contact form.
            </p>

            <div className="space-y-4 text-gray-700">
              <p>
                📧 <strong>Email:</strong> contact@codeorbit.com
              </p>

              <p>
                📍 <strong>Location:</strong> India
              </p>

              <p>
                🕒 <strong>Response:</strong> We'll get back to you soon
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Send Us a Message
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>

            </form>

            {/* Success Message */}
            {success && (
              <div className="mt-5 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-5 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                {error}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 text-center py-6">
        <p>
          © 2026 CodeOrbit Contact Hub. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}

export default App;