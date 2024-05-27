import React, { useState, useEffect } from "react";
import Accordion from "./Accordian/Accordian";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:5000/api/data/all";
        if (selectedYear) {
          url = `http://localhost:5000/api/data/year/${selectedYear}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedData = await response.json();
        setData(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const startYear = 2000;
  const endYear = 2050;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return (
    <div className="s">
      <nav>
        <div className="a">
          {" "}
          <h1>Data Visualization Dashboard</h1>
        </div>

        <ul>
          <li>
            <select value={selectedYear || ""} onChange={handleYearChange}>
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </li>
        </ul>
      </nav>

      <Accordion data={data} />
    </div>
  );
};

export default App;
