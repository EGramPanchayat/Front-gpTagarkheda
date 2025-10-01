import React, { useState } from "react";
import axioesInstance from "../utils/axioesInstance";

const QRUploadModal = ({ open, onClose }) => {
  const [panipattiQR, setPanipattiQR] = useState(null);
  const [gharPattiQR, setGharPattiQR] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!panipattiQR && !gharPattiQR) return;
    setLoading(true);
    const fd = new FormData();
    if (panipattiQR) fd.append("panipattiQR", panipattiQR);
    if (gharPattiQR) fd.append("gharPattiQR", gharPattiQR);
    try {
      await axioesInstance.post("/upload-qr", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Upload QR Codes</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Panipatti QR</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setPanipattiQR)}
              className="block w-full border border-green-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">GharPatti QR</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange(setGharPattiQR)}
              className="block w-full border border-green-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white px-4 py-2 rounded shadow w-full font-bold"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QRUploadModal;
