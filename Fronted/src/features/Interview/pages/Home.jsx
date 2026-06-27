import React, { useState } from "react";
import "../style/home.scss";
import { useNavigate } from "react-router-dom";


const Home = () => {
    
    const [resume, setResume] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    
    const navigate = useNavigate(); // change done


  return (
    <main className="home">

      {/* ================= HERO ================= */}

      <div className="hero">
        <h1>
          🚀 Create Your Custom <span>Interview Plan</span>
        </h1>

        <p>
          Let AI analyze your resume and job description to build a personalized
          winning strategy.
        </p>
      </div>

      {/* ================= CARD ================= */}

      <div className="interview-card">

        {/* ================= LEFT ================= */}

        <div className="left">

          <h3>🎯 Target Job Description</h3>

          <textarea
            placeholder="Paste the complete Job Description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

        </div>

        {/* ================= RIGHT ================= */}

        <div className="right">

          <h3>👤 Your Profile</h3>

          <div className="upload-header">

            <span className="upload-text">
              Upload Resume
            </span>

            <span className="best-badge">
              BEST RESULTS
            </span>

          </div>

          <label htmlFor="resume" className="file-label">

            <div className="upload-content">

              <div className="upload-icon">
                ⭱
              </div>

              <h4>Click to upload or drag & drop</h4>

              <p>PDF or DOCX (Max 5MB)</p>

            </div>

          </label>

          <input
            id="resume"
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={(e) => {

              const file = e.target.files[0];

              if (file) {
                setResume(file);
              }

            }}
          />

          {resume && (

            <p className="selected-file">
              ✅ {resume.name}
            </p>

          )}

          <span className="or">
            OR
          </span>

          <textarea
            placeholder="Write about yourself..."
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
          />

          <div className="info">
            💡 Upload both Resume & Self Description for the best AI report.
          </div>

          {/* <button
            className="generate-btn"
            onClick={() => {

              console.log("Job Description:", jobDescription);
              console.log("Resume:", resume);
              console.log("Self Description:", selfDescription);

            }}
          >
            ✨ Generate Interview Report
          </button> */}


          <button
                className="generate-btn"
                onClick={() => {

                    navigate("/interview");

                }}
                >
                ✨ Generate Interview Report
         </button>

        </div>

      </div>

    </main>
  );
};

export default Home;