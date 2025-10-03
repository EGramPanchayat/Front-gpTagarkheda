import React from "react";

const ContactSection = () => (
  <section id="contact" className="py-20  bg-blue-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 mb-10 relative">संपर्क</h2>
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Contact Info */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start">
            <h5 className="text-xl font-extrabold mb-2 flex items-center gap-2 text-left">
              {/* Location SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
              पत्ता
            </h5>
            <p className="text-gray-700 text-left">ग्रामपंचायत गोमेवाडी,<br/>तालुका आटपाडी,<br/>जिल्हा सांगली,<br/>महाराष्ट्र - 415 306.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start">
            <h5 className="text-xl font-extrabold mb-2 flex items-center gap-2 text-left">
              {/* Contact SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1" />
                <rect x="3" y="8" width="18" height="13" rx="2" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
              </svg>
              संपर्क
            </h5>
            <p className="text-gray-700 mb-1 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 4h16v16H4z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <a href="mailto:gpgomewadi@gmail.com" className="text-blue-600 font-semibold">grampanchayatgomewadi@gmail.com</a>
            </p>
            
          </div>
        </div>
        {/* Map */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            {/* Gomewadi, Tal Atpadi, Dist Sangli */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.217234234234!2d74.9631234!3d17.425678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1234567890abc%3A0xabcdef1234567890!2sGomewadi%2C%20Atpadi%2C%20Sangli%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="text-center text-sm text-gray-700 mt-1">Gomewadi, तालुका आतपाडी, जिल्हा सांगली</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
