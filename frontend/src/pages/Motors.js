import React, { useEffect, useState, useContext } from 'react';
import LineChart from '../components/Charts/LineChart';
import { AuthContext } from '../context/AuthContext';

const Motors = () => {
  const { token } = useContext(AuthContext);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchMotorData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/motor-health/equipment/2', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch motor data');
        }
        const data = await response.json();

        // Transform data to chart.js format
        const labels = data.map((entry) => new Date(entry.timestamp).toLocaleDateString());
        const parameterKeys = Object.keys(data[0]?.parameterData || {});
        const datasets = parameterKeys.map((key, index) => ({
          label: key,
          data: data.map((entry) => entry.parameterData[key]),
          borderColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
          backgroundColor: `hsla(${(index * 60) % 360}, 70%, 50%, 0.5)`,
          fill: false,
          tension: 0.1,
        }));

        setChartData({
          labels,
          datasets,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorData();
  }, [token]);

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const response = await fetch('/api/pdf-report/equipment/2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'motor_performance_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      alert(err.message);
    } finally {
      setExporting(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Motor Parameters Over Time',
      },
    },
  };

  if (loading) return <p>Loading motor data...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Motors Dashboard</h1>
        <button
          onClick={handleExportPDF}
          disabled={exporting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>
      {chartData ? <LineChart data={chartData} options={options} /> : <p>No data available</p>}
    </div>
  );
};

export default Motors;
