import React, { useEffect, useState } from "react";
import axioesInstance from "../utils/axioesInstance";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axioesInstance.get("/news"); // GET /news
        setNewsItems(res.data); // array of news objects
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="w-full bg-white border-y-2 border-y-orange-400 py-4 md:px-20 mb-13 md:mb-20  flex flex-col md:flex-row items-center overflow-hidden">
      <div className="font-bold text-3xl text-orange-700 px-4 whitespace-nowrap">
        बातम्या
      </div>
      <marquee className="text-green-800 font-medium text-base">
        {newsItems.length > 0 ? (
          newsItems.map((item, idx) => (
            <span key={item._id || idx} className="mx-6 text-2xl font-bold text-green-800">
              • {item.text}
            </span>
          ))
        ) : (
          <span className="mx-6 text-2xl text-gray-500">No news available</span>
        )}
      </marquee>
    </section>
  );
};

export default NewsSection;
