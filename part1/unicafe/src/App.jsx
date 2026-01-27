import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Statistics = ({ good, neutral, bad, all, sum }) => {
  if (all === 0) return <div>No feedback given</div>;
  return (
    <>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={sum / all} />
          <StatisticLine text={"positive"} value={(good / all) * 100 + "%"} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [sum, setSum] = useState(0);

  const handleGood = () => {
    setGood((prev) => prev + 1);
    setAll((prev) => prev + 1);
    setSum((prev) => prev + 1);
  };

  const handleBad = () => {
    setBad((prev) => prev + 1);
    setAll((prev) => prev + 1);
    setSum((prev) => prev - 1);
  };

  const handleNeutral = () => {
    setNeutral((prev) => prev + 1);
    setAll((prev) => prev + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} sum={sum} />
    </>
  );
};

export default App;
