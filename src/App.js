import React, { useState, useEffect } from 'react';
import data from './assets/Data/data.json';
import JobBoardComponents from './components/JobBoardComponents/JobBoardComponents';

const App = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => setJobs(data), []);

  console.log(jobs);

  return (
    <div>
      <header className="bg-teal-500 mb-12">
        <img src="/images/bg-header-desktop.svg" alt="header-shape" />
      </header>
      {jobs.length === 0 ? (
        <p>Jobs are fetching...</p>
      ) : (
          jobs.map((job) =>
            <JobBoardComponents job={job} key={job.id} />
          )
        )
      }
    </div>
  );
};

export default App;