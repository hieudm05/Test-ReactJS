import { useState, useEffect } from "react";
import { getOverview } from "../../../services/apiServices";
import "./DashBoard.scss";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
const DashBoard = () => {
  const [overview, setOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await getOverview();
    if (res && res.EC === 0) {
      setOverview(res.DT);
      // process chart data
      let Qz = 0, Qs = 0, As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0; 
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Question",
          Qs: Qs,
        },
        {
          name: "Answer",
          As: As,
        },
      ];
      setDataChart(data);
    }
  };
  return (
    <div className="dashboard-container">
      <div className="title">Analytics Dashboard</div>
      <div className="content">
        <div className="content-left">
          <div className="child">
            <span className="text-1"> Total users</span>
            <span className="text-2">
              {overview && overview.users && overview.users.total
                ? overview.users.total
                : 0}
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Quizzes</span>
            <span className="text-2">
              {" "}
              <span className="text-2">
                {overview && overview.others && overview.others.countQuiz
                  ? overview.others.countQuiz
                  : 0}
              </span>
            </span>
          </div>
          <div className="child">
            <span className="text-1">Total Question</span>
            <span className="text-2">
              {" "}
              {overview && overview.others && overview.others.countQuestions
                ? overview.others.countQuestions
                : 0}
            </span>{" "}
          </div>
          <div className="child">
            <span className="text-1">Total Answer</span>
            <span className="text-2">
              {" "}
              {overview && overview.others && overview.others.countAnswers
                ? overview.others.countAnswers
                : 0}
            </span>
          </div>
        </div>
        <div className="content-right">
          <ResponsiveContainer width="95%" height="95%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
