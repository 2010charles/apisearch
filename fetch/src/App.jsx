import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedBy, setSortedBy] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleGenerateUniversities = async () => {
    try {
      const response = await axios.get(
        `https://universitiesapi.onrender.com/v1/api/universities/${searchparam}` + searchTerm
      );

      setUniversities(response.data);
      setSelectedUniversity(null); // Reset selected university
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSortBy = (field) => {
    setSortedBy(field);
    setUniversities((prevUniversities) =>
      [...prevUniversities].sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      })
    );
    setSelectedUniversity(null); // Reset selected university
  };

  const handleSelectUniversity = (university) => {
    setSelectedUniversity(university);
  };

  return (
    <div className="container">
      <div className="input-container">
        <label htmlFor="searchTerm">Country:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleGenerateUniversities}>Search</button>
      </div>

      <div className="select-container">
        <label htmlFor="sortField">Sort by:</label>
        <select
          id="sortField"
          value={sortedBy}
          onChange={(e) => handleSortBy(e.target.value)}
        >
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="country">Country</option>
          <option value="state">State</option>
        </select>
      </div>

      <ul>
        {universities.map((university) => (
          <li
            key={university.name}
            onClick={() => handleSelectUniversity(university)}
            className={selectedUniversity === university ? 'selected' : ''}
          >
            {university.name} - {university.country} - {university.state}
          </li>
        ))}
      </ul>

      {selectedUniversity && (
        <div className="university-details">
          <h2>{selectedUniversity.name}</h2>
          <p>Country: {selectedUniversity.country}</p>
          <p>State: {selectedUniversity.state}</p>
          <p>Website: {selectedUniversity.web_pages[0]}</p>
        </div>
      )}
    </div>
  );
}

export default App;