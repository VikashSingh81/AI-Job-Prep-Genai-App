// import React from 'react'

// const Interview = () => {
//   return (
//     <div>Interview</div>
//   )
// }

// export default Interview

// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/interview.scss";

const Interview = () => {

    // Later this will come from backend
     const { interviewId } = useParams();

    console.log("Interview ID:", interviewId);

    // This will be replaced by backend data later
    const [report, setReport] = useState({
        technicalQuestions: [],
        behavioralQuestions: [],
        preparationPlan: [],
        skillGaps: []
    });


    const [activeTab, setActiveTab] = useState("technical");

    return (

        <div className="interview-page">

        
            {/* Left Sidebar */}

            <div className="sidebar">

                <button
                    className={activeTab==="technical" ? "active" : ""}
                    onClick={()=>setActiveTab("technical")}
                >
                    Technical Questions
                </button>

                <button
                    className={activeTab==="behavioural" ? "active" : ""}
                    onClick={()=>setActiveTab("behavioural")}
                >
                    Behavioural Questions
                </button>

                <button
                    className={activeTab==="roadmap" ? "active" : ""}
                    onClick={()=>setActiveTab("roadmap")}
                >
                    RoadMap
                </button>

            </div>

            {/* Main */}

            <div className="content">

                {activeTab==="technical" &&

                    report.technicalQuestions.map((item,index)=>(

                        <div className="card" key={index}>

                            <h2>{item.question}</h2>

                            <h4>Why interviewer asks?</h4>

                            <p>{item.intention}</p>

                            <h4>Ideal Answer</h4>

                            <p>{item.answer}</p>

                        </div>

                    ))

                }

                {activeTab==="behavioural" &&

                    report.behaviouralQuestions.map((item,index)=>(

                        <div className="card" key={index}>

                            <h2>{item.question}</h2>

                            <h4>Why interviewer asks?</h4>

                            <p>{item.intention}</p>

                            <h4>Ideal Answer</h4>

                            <p>{item.answer}</p>

                        </div>

                    ))

                }

                {activeTab==="roadmap" &&

                    <div className="card">

                        <h2>Your Learning Roadmap</h2>

                        <ul>

                            {report.roadMap.map((item,index)=>

                                <li key={index}>{item}</li>

                            )}

                        </ul>

                    </div>

                }

            </div>

            {/* Right */}

            <div className="skills">

                <h3>Skill Gaps</h3>

                <div className="chips">

                    {report.skillGaps.map((item,index)=>

                        <span key={index}>{item}</span>

                    )}

                </div>

            </div>

        </div>

    );
};

export default Interview;