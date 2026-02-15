import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Admin = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/admin/all-data");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching admin data");
    }
  };

  // 🔎 Search filter
  useEffect(() => {
    const result = data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredData(result);
    setCurrentPage(1);
  }, [search, data]);

  // 📄 Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="p-10">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          All Uploaded Data
        </h2>

        {/* Search */}
        <div className="mb-6 flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded-md w-[300px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Provider</th>
                <th className="px-4 py-3">Seeker</th>
                <th className="px-4 py-3">Relationship</th>
                <th className="px-4 py-3">Family Related</th>
                <th className="px-4 py-3">Uploaded By</th>
                <th className="px-4 py-3">Uploaded At</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{item.id}</td>

                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {item.providerName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.providerEmail}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {item.seekerName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.seekerEmail}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {item.relationshipWithSeeker}
                  </td>

                  <td className="px-4 py-3">
                    {item.isFamilyRelated ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        YES
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        NO
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {item.user?.name}
                    <div className="text-gray-500 text-xs">
                      {item.user?.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {item.uploadedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Admin;