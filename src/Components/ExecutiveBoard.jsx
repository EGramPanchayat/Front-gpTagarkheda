import React, { useEffect, useState } from "react";
import axioesInstance from "../utils/axioesInstance";

const ExecutiveBoard = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Local preview state for images
  const [preview, setPreview] = useState({
    sarpanch: null,
    upsarpanch: null,
    members: {},
    officers: {}
  });

  useEffect(() => {
    axioesInstance
      .get("/exboard-karyakari-mandal")
      .then((res) => {
        setBoard(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("डेटा लोड करण्यात अडचण आली."); // Only real error
        setLoading(false);
      });
  }, []);

  // Handle file input for preview
  const handleImageChange = (e, role, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview((prev) => {
      if (role === "sarpanch" || role === "upsarpanch") {
        return { ...prev, [role]: url };
      } else if (role === "member") {
        return {
          ...prev,
          members: { ...prev.members, [index]: url }
        };
      } else if (role === "officer") {
        return {
          ...prev,
          officers: { ...prev.officers, [index]: url }
        };
      }
      return prev;
    });
  };

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(preview).forEach((val) => {
        if (typeof val === "string") {
          URL.revokeObjectURL(val);
        } else if (val && typeof val === "object") {
          Object.values(val).forEach((u) => u && URL.revokeObjectURL(u));
        }
      });
    };
  }, [preview]);

  if (loading)
    return (
      <div className="w-full text-center py-10 text-black">
        कार्यकारी मंडळ लोड होत आहे...
      </div>
    );

  if (error)
    return (
      <div className="w-full text-center py-10 text-red-500">{error}</div>
    );

  if (!board)
    return (
      <div className="w-full text-center py-10">डेटा उपलब्ध नाही.</div>
    );

  return (
    <>
      <section
        id="members"
        className="relative w-full pt-30 md:pt-30 pb-10 flex flex-col items-center bg-gray-50"
      >
        <div className="max-w-10xl w-full mx-auto">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 text-center mb-8 relative">
            कार्यकारी मंडळ
          </h2>

          {/* Sarpanch and Upsarpanch */}
          <div className="flex flex-col md:flex-row gap-8 mb-10 justify-center items-center">
            {/* Sarpanch */}
            <div className="flex flex-col items-center text-center bg-green-900 rounded-xl shadow-xl p-5 w-72 md:w-64 border-b-4 border-green-500 hover:scale-105 transition-transform duration-300 ease-in-out">
              <span className="bg-green-700 text-white text-s font-bold px-3 py-1 rounded-full mb-2">
                सरपंच
              </span>
              <img
                src={
                  preview.sarpanch ||
                  board.sarpanch?.image ||
                  "/images/profile.png"
                }
                alt={board.sarpanch?.name}
                className="w-24 h-24 rounded-full object-cover mb-3 mt-4"
              />
              <input
                key="sarpanch-file"
                type="file"
                accept="image/*"
                className="mt-2 text-xs text-white"
                onChange={(e) => handleImageChange(e, "sarpanch")}
              />
              <h6 className="text-base font-normal mb-1 text-white">
                {board.sarpanch?.name}
              </h6>
              <p className="text-green-200 text-sm mb-1">
                +91 {board.sarpanch?.mobile}
              </p>
            </div>

            {/* Upsarpanch */}
            <div className="flex flex-col items-center text-center bg-green-900 rounded-xl shadow-xl p-5 w-72 md:w-64 border-b-4 border-green-500 hover:scale-105 transition-transform duration-300 ease-in-out">
              <span className="bg-green-700 text-white text-s font-bold px-3 py-1 rounded-full mb-2">
                उपसरपंच
              </span>
              <img
                src={
                  preview.upsarpanch ||
                  board.upsarpanch?.image ||
                  "/images/profile.png"
                }
                alt={board.upsarpanch?.name}
                className="w-24 h-24 rounded-full object-cover mb-3 mt-4"
              />
              <input
                key="upsarpanch-file"
                type="file"
                accept="image/*"
                className="mt-2 text-xs text-white"
                onChange={(e) => handleImageChange(e, "upsarpanch")}
              />
              <h6 className="text-base font-normal mb-1 text-white">
                {board.upsarpanch?.name}
              </h6>
              <p className="text-green-200 text-sm mb-1">
                +91 {board.upsarpanch?.mobile}
              </p>
            </div>
          </div>

          {/* Other Members */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-15 gap-y-10">
              {board.members?.map((m, idx) => (
                <div
                  key={m._id || idx}
                  className="flex flex-col items-center text-center bg-white rounded-xl shadow-xl p-3 w-70 md:w-44 sm:w-48 border border-orange-500 hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <span className="text-green-700 text-[1.1rem] font-bold px-3 py-1 rounded-full mb-2">
                    सदस्य
                  </span>
                  <img
                    src={
                      preview.members[idx] ||
                      m.image ||
                      "/images/profile.png"
                    }
                    alt={m.name}
                    className="w-24 h-24 rounded-full object-cover mb-3"
                  />
                  <input
                    key={`member-file-${idx}`}
                    type="file"
                    accept="image/*"
                    className="mt-2 text-xs"
                    onChange={(e) => handleImageChange(e, "member", idx)}
                  />
                  <h6 className="text-base font-normal mb-1">{m.name}</h6>
                  <p className="text-gray-700 text-sm mb-1">+91 {m.mobile}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExecutiveBoard;
