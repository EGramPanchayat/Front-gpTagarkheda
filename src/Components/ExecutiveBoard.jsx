import React, { useEffect, useState } from "react";
import axioesInstance from "../utils/axioesInstance";

const DEFAULT_PROFILE = "/images/profile.png";

const ExecutiveBoard = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // previews stored as base64 data URLs
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
        setError("डेटा लोड करण्यात अडचण आली."); 
        setLoading(false);
      });
  }, []);

  // convert file -> base64 for preview
  const readFileAsDataURL = (file, cb) => {
    const reader = new FileReader();
    reader.onloadend = () => cb(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e, role, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    readFileAsDataURL(file, (base64) => {
      setPreview((prev) => {
        const next = { ...prev, members: { ...prev.members }, officers: { ...prev.officers } };

        if (role === "sarpanch" || role === "upsarpanch") {
          next[role] = base64;
        } else if (role === "member") {
          next.members[key] = base64;
        } else if (role === "officer") {
          next.officers[key] = base64;
        }
        return next;
      });
    });
  };

  const getMemberKey = (m, idx) => (m && m._id ? String(m._id) : `new-${idx}`);

  if (loading)
    return <div className="w-full text-center py-10 text-black">कार्यकारी मंडळ लोड होत आहे...</div>;

  if (error)
    return <div className="w-full text-center py-10 text-red-500">{error}</div>;

  if (!board) return <div className="w-full text-center py-10">डेटा उपलब्ध नाही.</div>;

  return (
    <section className="relative w-full pt-20 pb-10 flex flex-col items-center bg-gray-50">
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 text-center mb-8">
          कार्यकारी मंडळ
        </h2>

        {/* Sarpanch & Upsarpanch */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 justify-center items-center">
          {/* Sarpanch */}
          <div className="flex flex-col items-center text-center bg-green-900 rounded-xl shadow-xl p-5 w-72 md:w-64 border-b-4 border-green-500 hover:scale-105 transition-transform">
            <span className="bg-green-700 text-white text-s font-bold px-3 py-1 rounded-full mb-2">सरपंच</span>
            <img
              src={preview.sarpanch || board.sarpanch?.image || DEFAULT_PROFILE}
              alt={board.sarpanch?.name || "sarpanch"}
              className="w-24 h-24 rounded-full object-cover mb-3 mt-4"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2 text-xs text-white"
              onChange={(e) => handleImageChange(e, "sarpanch")}
            />
            <h6 className="text-base font-normal mb-1 text-white">{board.sarpanch?.name}</h6>
            <p className="text-green-200 text-sm mb-1">+91 {board.sarpanch?.mobile}</p>
          </div>

          {/* Upsarpanch */}
          <div className="flex flex-col items-center text-center bg-green-900 rounded-xl shadow-xl p-5 w-72 md:w-64 border-b-4 border-green-500 hover:scale-105 transition-transform">
            <span className="bg-green-700 text-white text-s font-bold px-3 py-1 rounded-full mb-2">उपसरपंच</span>
            <img
              src={preview.upsarpanch || board.upsarpanch?.image || DEFAULT_PROFILE}
              alt={board.upsarpanch?.name || "upsarpanch"}
              className="w-24 h-24 rounded-full object-cover mb-3 mt-4"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-2 text-xs text-white"
              onChange={(e) => handleImageChange(e, "upsarpanch")}
            />
            <h6 className="text-base font-normal mb-1 text-white">{board.upsarpanch?.name}</h6>
            <p className="text-green-200 text-sm mb-1">+91 {board.upsarpanch?.mobile}</p>
          </div>
        </div>

        {/* Members */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-8">
          {board.members?.map((m, idx) => {
            const memberKey = getMemberKey(m, idx);
            return (
              <div
                key={memberKey}
                className="flex flex-col items-center text-center bg-white rounded-xl shadow-xl p-3 w-70 md:w-44 border border-orange-500 hover:scale-105 transition-transform"
              >
                <span className="text-green-700 text-[1.1rem] font-bold mb-2">सदस्य</span>
                <img
                  src={preview.members[memberKey] || m.image || DEFAULT_PROFILE}
                  alt={m.name || "member"}
                  className="w-24 h-24 rounded-full object-cover mb-3"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-xs"
                  onChange={(e) => handleImageChange(e, "member", memberKey)}
                />
                <h6 className="text-base font-normal mb-1">{m.name}</h6>
                <p className="text-gray-700 text-sm mb-1">+91 {m.mobile}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveBoard;
