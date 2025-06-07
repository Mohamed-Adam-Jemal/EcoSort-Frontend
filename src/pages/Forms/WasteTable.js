import React, { useState, useEffect, useMemo, useCallback } from "react";
import config from '../../config';
import axios from "axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useTheme } from "../../context/ThemeContext";

export default function WasteTable() {
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const { theme } = useTheme();

  // Memoized waste counts for better performance
  const wasteCounts = useMemo(() => ({
    plastic: wasteData.filter(waste => waste.waste_type?.toUpperCase() === 'PLASTIC').length,
    paper: wasteData.filter(waste => waste.waste_type?.toUpperCase() === 'PAPER').length,
    glass: wasteData.filter(waste => waste.waste_type?.toUpperCase() === 'GLASS').length,
    metal: wasteData.filter(waste => waste.waste_type?.toUpperCase() === 'METAL').length,
    total: wasteData.length
  }), [wasteData]);

  // Fetch initial waste data
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${config.serverIp}/waste/`);
      setWasteData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // SSE for real-time updates with reconnection logic
  useEffect(() => {
    let eventSource;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 5000; // 5 seconds

    const setupSSE = () => {
      eventSource = new EventSource(`${config.serverIp}/sse/waste/`);

      eventSource.onmessage = (event) => {
        const newData = JSON.parse(event.data);
        setWasteData(prevData => {
          // Check for duplicates before adding
          if (!prevData.some(item => item.id === newData.id)) {
            return [newData, ...prevData]; // Newest first
          }
          return prevData;
        });
        reconnectAttempts = 0; // Reset on successful message
      };

      eventSource.onerror = () => {
        eventSource.close();
        if (reconnectAttempts < maxReconnectAttempts) {
          setTimeout(setupSSE, reconnectDelay);
          reconnectAttempts++;
        } else {
          setError("Connection lost. Please refresh the page.");
        }
      };
    };

    setupSSE();

    return () => {
      if (eventSource) eventSource.close();
    };
  }, []);

  // Filter and sort waste data
  const filteredWasteData = useMemo(() => {
    return wasteData
      .filter((waste) => 
        waste.waste_type?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.time_collected) - new Date(a.time_collected)); // Newest first
  }, [wasteData, searchQuery]);

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredWasteData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredWasteData.length / rowsPerPage);

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  }, [totalPages]);

  if (loading) return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen flex items-center justify-center`}>
      <div className="animate-pulse">Loading waste data...</div>
    </div>
  );

  if (error) return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} min-h-screen flex items-center justify-center`}>
      <div className="text-red-500">{error}</div>
      <button 
        onClick={fetchData}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
      <PageMeta
        title="Waste Management Dashboard | EcoSort"
        description="Real-time waste collection monitoring dashboard"
      />
      {/* Waste Count Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {[
          { type: 'plastic', label: 'Plastic Waste', count: wasteCounts.plastic },
          { type: 'paper', label: 'Paper Waste', count: wasteCounts.paper },
          { type: 'glass', label: 'Glass Waste', count: wasteCounts.glass },
          { type: 'metal', label: 'Metal Waste', count: wasteCounts.metal },
          { type: 'total', label: 'Total Waste', count: wasteCounts.total },
        ].map((card) => (
          <div 
            key={card.type}
            className={`rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>{card.label}</p>
                <h3 className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>{card.count}</h3>
              </div>
              {card.type !== 'total' && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  card.type === 'plastic' ? 'bg-blue-100 text-blue-800' :
                  card.type === 'paper' ? 'bg-green-100 text-green-800' :
                  card.type === 'glass' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {Math.round((card.count / wasteCounts.total) * 100)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Waste Table */}
      <div className={`rounded-lg shadow-md overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <div className={`flex flex-col md:flex-row items-center justify-between p-6 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="mb-4 md:mb-0">
            <h2 className={`text-xl font-semibold ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              Collected Waste Data
            </h2>
            <p className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Real-time data of waste collected by WasteBots
            </p>
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by waste type..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className={`w-full p-2 rounded-md border ${
                theme === "dark" ? "bg-gray-700 border-gray-600 text-gray-100" : 
                "bg-white border-gray-300 text-gray-700"
              }`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={`${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}>
              <tr>
                {['Waste ID', 'Type', 'Time of Picking', 'WasteBin ID', 'WasteBot ID'].map((header) => (
                  <th 
                    key={header}
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-200"
            }`}>
              {currentRows.length > 0 ? (
                currentRows.map((waste) => (
                  <tr
                    key={waste.id}
                    className={`${
                      theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                    } transition-colors duration-200`}
                  >
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}>
                      {waste.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          waste.waste_type?.toLowerCase() === "plastic"
                            ? "bg-blue-100 text-blue-800"
                            : waste.waste_type?.toLowerCase() === "paper"
                            ? "bg-green-100 text-green-800"
                            : waste.waste_type?.toLowerCase() === "metal"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {waste.waste_type?.toUpperCase()}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {new Date(waste.time_collected).toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {waste.wastebin}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {waste.wastebot}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={`px-6 py-4 text-center ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    No waste data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredWasteData.length > 0 && (
          <div className={`flex flex-col md:flex-row justify-between items-center p-4 border-t ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}>
            <div className={`text-sm mb-4 md:mb-0 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}>
              Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredWasteData.length)} of{" "}
              {filteredWasteData.length} entries
            </div>
            <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300 bg-gray-700" : "text-gray-700 bg-white"
              } border ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              } rounded-md ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  currentPage === page
                    ? "text-white bg-[#4CAF50]"
                    : theme === "dark"
                    ? "text-gray-300 bg-gray-700 border border-gray-600 hover:bg-gray-600"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>

            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium ${
                theme === "dark" ? "text-gray-300 bg-gray-700" : "text-gray-700 bg-white"
              } border ${
                theme === "dark" ? "border-gray-600" : "border-gray-300"
              } rounded-md ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : theme === "dark"
                ? "hover:bg-gray-600"
                : "hover:bg-gray-50" 
              }`}
            >
              Next
            </button>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}