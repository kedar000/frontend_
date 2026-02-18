import { useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFileBlob, setErrorFileBlob] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setMessage("");
    setIsError(false);
    setErrorFileBlob(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/api/files/validate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const contentType = response.headers["content-type"];
      const serverMessage = response.headers["x-message"];

      // Excel returned -> validation errors
      if (
        contentType &&
        contentType.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        setErrorFileBlob(response.data);
        setMessage(
          serverMessage ||
            "There are some errors in your file. Please download the error file, correct the data, and re-upload."
        );
        setIsError(true);
      } else {
        // Plain message success
        const text = await response.data.text();
        setMessage(text);
        setIsError(false);
      }
    } catch (error) {
      setMessage("Something went wrong.");
      setIsError(true);
    }

    setLoading(false);
  };

  const handleDownloadErrorFile = () => {
    if (!errorFileBlob) return;

    const blob = new Blob([errorFileBlob]);
    const url = window.URL.createObjectURL(blob);

    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[:.]/g, "-")
      .slice(0, 19);

    const link = document.createElement("a");
    link.href = url;
    link.download = `validation_error_${timestamp}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-semibold text-[#003865] mb-8">
        Upload Excel File
      </h1>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="bg-white p-10 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 hover:border-[#009de0] transition-all duration-300"
      >
        <div className="text-center space-y-4">

          <p className="text-gray-500">
            Drag & drop your Excel file here
          </p>

          <p className="text-sm text-gray-400">
            or
          </p>

          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="mx-auto block"
          />

          {file && (
            <p className="text-[#009de0] font-medium">
              {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-4 bg-[#003865] hover:bg-[#0055a4] text-white px-6 py-2 rounded-lg transition-all duration-300"
          >
            {loading ? "Validating..." : "Validate & Upload"}
          </button>

        </div>
      </div>

      {message && (
        <div
          className={`mt-6 p-6 rounded-xl transition-all duration-300 ${
            isError
              ? "bg-red-50 border-l-4 border-red-500 text-red-700"
              : "bg-green-50 border-l-4 border-green-500 text-green-700"
          }`}
        >
          <p className="font-medium">{message}</p>

          {errorFileBlob && (
            <button
              onClick={handleDownloadErrorFile}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              Download Error File
            </button>
          )}
        </div>
      )}

    </div>
  );
}

export default Dashboard;