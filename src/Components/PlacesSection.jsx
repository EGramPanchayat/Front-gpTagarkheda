import React from "react";

const PlacesSection = () => (
  <section id="places" className="py-10 bg-white pt-17 md:pt-30 ">
    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
      <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 mb-10 relative">गावातील प्रसिद्ध स्थळे
        <span className="block w-24 h-1 bg-orange-400 rounded absolute left-1/2 -translate-x-1/2 -bottom-3"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* mahadev  Mandir */}
        <div className="bg-white rounded-xl shadow-lg p-4 fade-in flex flex-col justify-between items-center h-full hover:shadow-2xl hover:-translate-y-1 transition">
          <img src="./images/mahadev.jpg" alt="महादेव मंदिर" className="w-full h-48 object-cover rounded-xl mb-4" />
          <h5 className="text-lg font-bold mb-2 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2L12 22"/><path d="M6 12L12 2L18 12"/></svg> महादेव मंदिर</h5>
          <p className="text-justify">गावाचे ग्रामदैवत असलेले महादेव मंदिर गावकऱ्यांचे प्रमुख श्रद्धास्थान आहे. मंदिर तगरखेडा गावाच्या मध्यभागी, मुख्य रस्त्याजवळ स्थित असल्यामुळे भाविकांसाठी ते सहज उपलब्ध आहे.</p>
        </div>
        {/* आयुष्यमान आरोग्यमंदिर */}
        <div className="bg-white rounded-xl shadow-lg p-4 fade-in flex flex-col justify-between items-center h-full hover:shadow-2xl hover:-translate-y-1 transition">
          <img src="images/aarogyamandir.jpg" alt="आयुष्यमान आरोग्यमंदिर" className="w-full h-48 object-cover rounded-xl mb-4" />
          <h5 className="text-lg font-bold mb-2 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 12h16"/><path d="M12 4v16"/></svg>आयुष्यमान आरोग्यमंदिर</h5>
          <p className="text-justify">आयुष्यमान आरोग्यमंदिर हे एक सर्वसामान्य जनतेसाठी आरोग्यसेवा उपलब्ध करून देणारे केंद्र आहे. या ठिकाणी रुग्णांना परवडणाऱ्या दरात तसेच काही सेवा मोफत दिल्या जातात.
</p>
        </div>


 
       
        <div className="bg-white rounded-xl shadow-lg p-4 fade-in flex flex-col justify-between items-center h-full hover:shadow-2xl hover:-translate-y-1 transition">
          <img src="images/terana.jpg" alt="Terana" className="w-full h-48 object-cover rounded-xl mb-4" />
          <h5 className="text-lg font-bold mb-2 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="8" width="16" height="8" rx="2"/></svg>तेरणा नदी </h5>
          <p className="text-justify">तेरणा नदीमुळे गावाच्या सभोवतालचे नैसर्गिक सौंदर्य अधिक खुलून दिसते. नदीकाठावर हिरवाई पसरली असून पाणीपुरवठ्याचा मुख्य स्रोत म्हणून तेरणा नदीची महत्त्वाची भूमिका आहे. शेतकऱ्यांसाठी सिंचनाची सुविधा उपलब्ध होऊन शेती उत्पादकतेत वाढ झाली आहे.</p>
        </div>
       
        {/* <div className="bg-white rounded-xl shadow-lg p-4 fade-in flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition">
          <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&q=80" alt="जलसंधारण प्रकल्प" className="w-full h-48 object-cover rounded-xl mb-4" />
          <h5 className="text-lg font-bold mb-2 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 2L12 22"/><path d="M6 12L12 2L18 12"/></svg> जलसंधारण प्रकल्प</h5>
          <p className="text-justify">पाणलोट क्षेत्राचा विकास आणि जलसंधारणामुळे परिसरात नैसर्गिक सौंदर्य खुलून दिसते. गावात बारव, पाणीसाठवण टाकी, सार्वजनिक विहिरी व शेततळी यासारख्या सुविधा उपलब्ध आहेत. तसेच, शासनाची अ‍ॅक्वा आरओ शुद्ध पाणी प्रकल्प योजना गावातील पाण्याची गुणवत्ता सुधारण्यासाठी कार्यरत आहे.</p>
        </div> */}

       



      </div>
    </div>
  </section>
);

export default PlacesSection;
