import React, { useState, useEffect } from 'react';
import data from './assets/Data/data.json';
import JobBoardComponents from './components/JobBoardComponents/JobBoardComponents';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);

  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }
    const tags = [role, level];
    if (languages) {
      tags.push(...languages);
    }
    if (tools) {
      tags.push(...tools);
    }
    return filters.every(filter => tags.includes(filter));
  }

  const handleTagClick = (tag) => {
    // avoid the duplication of the tags
    if (filters.includes(tag)) return;
    setFilters([...filters, tag]);
  }

  const handleFilterClick = (passedFilters) => {
    setFilters(filters.filter(f => f !== passedFilters));
  }

  const clearFilters = () => {
    setFilters([]);
  }

  const filteredJobs = jobs.filter(filterFunc);

  return (
    <>
      <header className="bg-teal-500 mb-12">
        <img className="m-auto" src="/images/bg-header-desktop.svg" alt="header-shape" />
      </header>
      <div className="container m-auto">
        {filters.length > 0 && (
          <div className="flex flex-wrap bg-white shadow-md -my-16 mb-16 mx-10 p-6 rounded relative z-10">
            {filters.map((filter) => (
              <span
                className="cursor-pointer mr-4 rounded font-bold mb-4 lg:mb-0"
                onClick={() => handleFilterClick(filter)}>
                <span className="text-teal-400 bg-teal-100 py-1 px-2">
                  {filter}
                </span>
                <span className="bg-teal-400 text-teal-100 py-1 px-2">
                  ×
              </span>
              </span>
            ))}
            <button
              className="font-bold text-gray-500 ml-auto"
              onClick={clearFilters}>
              Clear
            </button>
          </div>
        )}
        {
          jobs.length === 0 ? (
            <p className="text-teal-50 font-bold">
              Jobs are fetching...
            </p>
          ) : (
              filteredJobs.map((job) =>
                <JobBoardComponents
                  job={job}
                  key={job.id}
                  handleTagClick={handleTagClick}
                />
              )
            )}
      </div>
    </>
  );
};

export default App;