import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/api/files/validate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const contentType = response.headers["content-type"];
      const serverMessage = response.headers["x-message"];

      // 🟥 Case: Excel returned → validation errors
      if (
        contentType &&
        contentType.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
      ) {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "validation_errors.xlsx";
        document.body.appendChild(link);
        link.click();
        link.remove();

        setMessage(
          serverMessage ||
            "Validation failed. Error file downloaded."
        );
        setIsError(true);
      } 
      // 🟩 Case: Plain text returned → success OR corrupted message
      else {
        const text = await response.data.text();
        setMessage(text);

        // Success if status is 200 and not an excel file
        setIsError(false);
      }

    } catch (err) {
      setMessage("Something went wrong.");
      setIsError(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex justify-center mt-16">
        <div className="bg-white w-[600px] p-10 rounded-xl shadow-md transition-all duration-200">

          <h2 className="text-xl font-semibold text-primary mb-6 text-center">
            Upload Excel File
          </h2>

          <div className="border-2 border-dashed border-borderLight p-10 rounded-lg text-center hover:border-secondary transition-all duration-200">

            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />

            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition-all duration-200"
            >
              {loading ? "Validating..." : "Validate & Upload"}
            </button>

          </div>

          {message && (
            <div
              className={`mt-6 p-4 rounded-md text-sm ${
                isError
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;