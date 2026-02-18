import { useEffect, useState } from "react";
import api from "../services/api";

function Admin() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/admin/all-data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching admin data");
    }
  };

  // 🔎 Filter logic
  const filteredData = data.filter((item) =>
    (
      item.providerName +
      item.providerEmail +
      item.seekerName +
      item.seekerEmail +
      item.relationshipWithSeeker +
      item.user?.name
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-semibold text-[#003865] mb-8">
        Admin Panel
      </h1>

      {/* Search + Count */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            Total Records
          </p>
          <p className="text-xl font-semibold text-[#003865]">
            {filteredData.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-[#009de0] transition-all duration-200"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-[#003865] text-white sticky top-0">
              <tr>
                <th className="px-6 py-4 text-left">Provider</th>
                <th className="px-6 py-4 text-left">Seeker</th>
                <th className="px-6 py-4 text-left">Relationship</th>
                <th className="px-6 py-4 text-left">Family</th>
                <th className="px-6 py-4 text-left">Uploaded By</th>
                <th className="px-6 py-4 text-left">Uploaded At</th>
              </tr>
            </thead>

            <tbody>

              {currentRows.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#003865]">
                      {item.providerName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.providerEmail}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {item.seekerName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.seekerEmail}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {item.relationshipWithSeeker}
                  </td>

                  <td className="px-6 py-4">
                    {item.isFamilyRelated ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        YES
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                        NO
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {item.user?.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.user?.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {item.uploadedAt}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentPage === i + 1
                ? "bg-[#003865] text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

      </div>

    </div>
  );
}

export default Admin;