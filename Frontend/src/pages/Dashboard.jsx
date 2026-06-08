import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");
  const [downloadCode, setDownloadCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [sendWarning, setSendWarning] = useState("");
  const [receiveWarning, setReceiveWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setSendWarning("");
  };

  const generateCode = () => {
    if (!file) {
      setSendWarning("Upload file first");

      return;
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();

    setCode(newCode);

    setSendWarning("");

    setSuccess("");
  };

  const uploadFile = async () => {
    if (!file) {
      setSendWarning("Upload file first");
      return;
    }

    if (!code) {
      setSendWarning("Generate code first");
      return;
    }

    setLoading(true);
    setSendWarning("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("code", code);

    try {
      const token = localStorage.getItem("token");
      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {};

      await axios.post("http://localhost:8000/api/files/upload", formData, {
        headers,
      });

      setSuccess("File uploaded successfully");
      setFile(null);
      setCode("");
    } catch (error) {
      console.log("Error found", error);
/* 
      if (error.response?.status === 403) {
        navigate("/Pricing");

        return;
      } */

     if (error.response?.status === 403) {
       const errorType = error.response.data.type;

       if (errorType === "guest_limit") {
         navigate("/Sign");

         return;
       }

       if (errorType === "premium_limit") {
         navigate("/Pricing");

         return;
       }
     }

      setSendWarning(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async () => {
    if (!/^\d{6}$/.test(downloadCode)) {
      setReceiveWarning("Enter valid 6-digit code");
      return;
    }

    setLoading(true);
    setReceiveWarning("");

    try {
      const res = await axios.get(
        `http://localhost:8000/api/files/file/${downloadCode}`,
      );

      const fileId = res.data.fileId;

      window.open(
        `http://localhost:8000/api/files/download/${fileId}`,
        "_blank",
      );
    } catch (error) {
      setReceiveWarning("Invalid code or file not found");

      console.log("Error Found", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-black text-white px-6 py-10">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Secure File Transfer
        </h1>

        <p className="mt-4 text-gray-300 text-lg">
          Fast, encrypted, and code-based file sharing system.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* SEND FILE */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-center mb-6">Send File</h2>

          <input
            type="file"
            onChange={handleFile}
            className="w-full bg-white/20 p-3 rounded-lg hover:cursor-pointer"
          />

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">Transfer Code</p>

            <div className="mt-2 bg-black/40 rounded-lg py-4 text-3xl font-mono">
              {code || "------"}
            </div>
          </div>

          {sendWarning && (
            <p className="text-red-400 text-sm mt-3">{sendWarning}</p>
          )}

          {success && <p className="text-green-400 text-sm mt-3">{success}</p>}

          <div className="mt-6 space-y-3">
            <button
              onClick={generateCode}
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg hover:cursor-pointer"
            >
              Generate Code
            </button>

            <button
              onClick={uploadFile}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg disabled:opacity-50 hover:cursor-pointer"
            >
              {loading ? "Uploading..." : "Upload & Send"}
            </button>
          </div>
        </div>

        {/* RECEIVE FILE */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Receive File
          </h2>

          <div className="relative">
            <input
              type={showCode ? "text" : "password"}
              value={downloadCode}
              onChange={(e) => {
                setDownloadCode(e.target.value);

                setReceiveWarning("");
              }}
              placeholder="Enter 6-digit code"
              className="w-full bg-white/20 p-3 rounded-lg pr-20 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm hover:cursor-pointer"
            >
              {showCode ? "Hide" : "Show"}
            </button>
          </div>

          {receiveWarning && (
            <p className="text-red-400 text-sm mt-3">{receiveWarning}</p>
          )}

          <button
            onClick={downloadFile}
            disabled={loading}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 py-3 rounded-lg disabled:opacity-50 hover:cursor-pointer"
          >
            {loading ? "Processing..." : "Download File"}
          </button>
        </div>
      </div>
    </div>
  );
}
