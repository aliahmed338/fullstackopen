const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => (sum += part.exercises), 0);
  return <p>Total of {total} exercises</p>;
};

const Content = ({ parts }) => {
  return parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {course.map((c) => (
        <div key={c.name}>
          <Header course={c.name} />
          <Content parts={c.parts} />
          <Total parts={c.parts} />
        </div>
      ))}
    </>
  );
};

export default Course;
