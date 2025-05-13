const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic placeholder
    alert('Your message has been sent successfully!');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Add other form fields similarly */}
              <button 
                type="submit" 
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Our Information</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-gray-600">+880 1234 567890 (Emergency)</p>
                <p className="text-gray-600">+880 9876 543210 (General)</p>
              </div>
              {/* Add other info similarly */}
            </div>

            <div className="mt-8">
              <h4 className="font-medium mb-2">Operating Hours</h4>
              <p className="text-gray-600">24/7 for emergency blood requests</p>
              <p className="text-gray-600">9:00 AM - 5:00 PM (General inquiries)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
