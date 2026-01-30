const Notification = ({ message, successfull }) => {
  if (message === null) return null;
  return (
    <div className={`notification ${successfull ? "success" : "error"}`}>
      {message}
    </div>
  );
};

export default Notification;
