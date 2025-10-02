import React, { useEffect, useRef, useState } from "react";
import axioesInstance from "../utils/axioesInstance";

const DEFAULT_PROFILE = "/images/profile.png";

const ExecutiveBoard = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // preview maps: { sarpanch: url, upsarpanch: url, members: { key: url }, officers: { key: url } }
  const [preview, setPreview] = useState({
    sarpanch: null,
    upsarpanch: null,
    members: {},
    officers: {}
  });

  // store created object URLs so we can revoke them on unmount
  const createdURLsRef = useRef(new Set());

  // optional: store selected File objects to upload later
  const selectedFilesRef = useRef({
    sarpanch: null,
    upsarpanch: null,
    members: {}, // key -> File
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
        setError("डेटा लोड करण्यात अडचण आली."); // show only on real error
        setLoading(false);
      });
  }, []);

  // revoke all created object URLs on unmount
  useEffect(() => {
    return () => {
      createdURLsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch (e) {
          // ignore
        }
      });
      createdURLsRef.current.clear();
    };
  }, []);

  // helper to compute a stable key for member/officer preview (use _id when possible)
  const getMemberKey = (m, idx) => (m && m._id ? String(m._id) : `new-${idx}`);

  // handle image selection -> preview + remember file for upload
  const handleImageChange = (e, role, key) => {
    const file = e.target.files?.[0];
    // reset input so selecting same file later still triggers change
    e.target.value = "";

    if (!file) return;

    const url = URL.createObjectURL(file);

    // revoke previous url for the same slot (if any) and remove from set
    setPreview((prev) => {
      const next = { ...prev, members: { ...prev.members }, officers: { ...prev.officers } };

      if (role === "sarpanch" || role === "upsarpanch") {
        const prevUrl = prev[role];
        if (prevUrl) {
          try {
            URL.revokeObjectURL(prevUrl);
            createdURLsRef.current.delete(prevUrl);
          } catch (err) {}
        }
        next[role] = url;
      } else if (role === "member") {
        const prevUrl = prev.members?.[key];
        if (prevUrl) {
          try {
            URL.revokeObjectURL(prevUrl);
            createdURLsRef.current.delete(prevUrl);
          } catch (err) {}
        }
        next.members[key] = url;
      } else if (role === "officer") {
        const prevUrl = prev.officers?.[key];
        if (prevUrl) {
          try {
            URL.revokeObjectURL(prevUrl);
            createdURLsRef.current.delete(prevUrl);
          } catch (err) {}
        }
        next.officers[key] = url;
      }
      return next;
    });

    // remember created URL for cleanup
    createdURLsRef.current.add(url);

    // store selected file for later upload (optional)
    if (role === "sarpanch" || role === "upsarpanch") {
      selectedFilesRef.current[role] = file;
    } else if (role === "member") {
      selectedFilesRef.current.members = {
        ...selectedFilesRef.current.members,
        [key]: file
      };
    } else if (role === "officer") {
      selectedFilesRef.current.officers = {
        ...selectedFilesRef.current.officers,
        [key]: file
      };
    }
  };

  if (loading)
    return (
      <div className="w-full text-center py-10 text-black">कार्यकारी मंडळ लोड होत आहे...</div>
    );

  if (error)
    return <div className="w-full text-center py-10 text-red-500">{error}</div>;

  if (!board) return <div className="w-full text-center py-10">डेटा उपलब्ध नाही.</div>;

  return (
    <>
      <section id="members" className="relative w-full pt-30 md:pt-30 pb-10 flex flex-col items-center bg-gray-50">
        <div className="max-w-10xl w-full mx-auto">
          <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 text-center mb-8 relative">
            कार्यकारी मंडळ
          </h2>

          {/* Sarpanch & Upsarpanch */}
          <div className="flex flex-col md:flex-row gap-8 mb-10 justify-center items-center">
            {/* Sarpanch */}
            <div className="flex flex-col items-center text-center bg-green-900 rounded-xl shadow-xl p-5 w-72 md:w-64 border-b-4 border-green-500 hover:scale-105 transition-transform duration-300 ease-in-out">
              <span className="bg-green-700 text-white text-s font-bold px-3 py-1 rounded-full mb-2">सरपंच</span>
              <img
                src={preview.sarpanch || board.sarpanch?.image || DEFAULT_PROFILE}
                alt={board.sarpanch?.name || "sarpanch"}
                className="w-24 h-24 rounded-full object-cover mb-3 mt-4"
              />
              <input
                key="sarpanch-file"
                type="file"
                accept="image/*"
                className="mt-2 text-xs text-white"
                onChange={(e) => handleImageChange(e, "sarpanch", "sarpanch")}
              />
              <h6 className="text-base font-normal mb-1 text-white">{board.sarpanch?.name}</h6>
              <p className="text-green-200 text-sm mb-1">+91 {board.sarpanch?.mobile}</p>
            </div>

            {/* Upsarpanch */}
            <div className="flex flex-col items-center text-center bg-green-900 rounded-xl shadow-xl p-5 w-72 md:w-64 border-b-4 border-green-500 hover:scale-105 transition-transform duration-300 ease-in-out">
              <span className="bg-green-700 text-white text-s font-bold px-3 py-1 rounded-full mb-2">उपसरपंच</span>
              <img
                src={preview.upsarpanch || board.upsarpanch?.image || DEFAULT_PROFILE}
                alt={board.upsarpanch?.name || "upsarpanch"}
                className="w-24 h-24 rounded-full object-cover mb-3 mt-4"
              />
              <input
                key="upsarpanch-file"
                type="file"
                accept="image/*"
                className="mt-2 text-xs text-white"
                onChange={(e) => handleImageChange(e, "upsarpanch", "upsarpanch")}
              />
              <h6 className="text-base font-normal mb-1 text-white">{board.upsarpanch?.name}</h6>
              <p className="text-green-200 text-sm mb-1">+91 {board.upsarpanch?.mobile}</p>
            </div>
          </div>

          {/* Members */}
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-15 gap-y-10">
              {board.members?.map((m, idx) => {
                const memberKey = getMemberKey(m, idx);
                return (
                  <div
                    key={memberKey}
                    className="flex flex-col items-center text-center bg-white rounded-xl shadow-xl p-3 w-70 md:w-44 sm:w-48 border border-orange-500 hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    <span className="text-green-700 text-[1.1rem] font-bold px-3 py-1 rounded-full mb-2">सदस्य</span>
                    <img
                      src={preview.members[memberKey] || m.image || DEFAULT_PROFILE}
                      alt={m.name || "member"}
                      className="w-24 h-24 rounded-full object-cover mb-3"
                    />
                    <input
                      key={`member-file-${memberKey}`}
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

          {/* Officers rendering (if you want the same preview for officers) */}
          {board.staff?.officers?.length > 0 && (
            <section id="officials" className="py-10 pt-20 bg-blue-50 w-full">
              <div className="max-w-6xl mx-auto px-2">
                <h2 className="text-3xl md:text-[2.5rem] font-bold text-green-700 text-center mb-10 relative">
                  कर्मचारी
                  <span className="block w-24 h-1 bg-orange-400 rounded absolute left-1/2 -translate-x-1/2 -bottom-3"></span>
                </h2>

                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  {board.staff.officers.map((o, idx) => {
                    const offKey = o._id ? String(o._id) : `new-off-${idx}`;
                    return (
                      <div
                        key={offKey}
                        className="flex flex-col items-center text-center bg-green-900 rounded-xl shadow-xl p-5 w-75 md:w-64 border-b-4 border-green-500 hover:scale-105 transition-transform duration-300 ease-in-out"
                      >
                        <span className="bg-green-700 text-white text-s font-bold px-3 py-1 rounded-full mb-2">{o.role}</span>
                        <img
                          src={preview.officers[offKey] || o.image || DEFAULT_PROFILE}
                          alt={o.name || "officer"}
                          className="w-24 h-24 rounded-full object-cover mb-3 mt-4"
                        />
                        <input
                          key={`officer-file-${offKey}`}
                          type="file"
                          accept="image/*"
                          className="mt-2 text-xs"
                          onChange={(e) => handleImageChange(e, "officer", offKey)}
                        />
                        <h6 className="text-base font-normal mb-1 text-white">{o.name}</h6>
                        <p className="text-green-200 text-sm mb-1">+91 {o.mobile}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  );
};

export default ExecutiveBoard;
