import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import ShowPersons from "./components/ShowPersons";
import personServices from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [successfull, setSuccessfull] = useState(false);

  useEffect(() => {
    personServices
      .getAll()
      .then((initialPerson) => {
        setPersons(initialPerson);
      })
      .catch((error) => console.log(error));
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()),
  );

  const addNewName = (e) => {
    e.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      alert("Name and number are required");
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    const personObj = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      const ok = window.confirm(
        `${newName} is already added to phonebook,replace the old number with a new one ?`,
      );
      if (!ok) return;

      personServices
        .update(existingPerson.id, personObj)
        .then((returnedPerson) => {
          setPersons((prev) =>
            prev.map((p) => (p.id === existingPerson.id ? returnedPerson : p)),
          );
        })
        .catch((error) => {
          setMessage(
            `Information of ${personObj.name} has already been removed from server`,
          );
          console.log(error);
          setSuccessfull(false);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });

      setMessage(`updated ${existingPerson.name} number`);
      setSuccessfull(true);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      personServices
        .create(personObj)
        .then((returnedPerson) => {
          setPersons((prev) => prev.concat(returnedPerson));
        })
        .catch((error) => console.log(error));

      setMessage(`Added ${personObj.name}`);
      setSuccessfull(true);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    const ok = window.confirm(`Delete ${name} ?`);

    if (!ok) return;

    personServices
      .remove(String(id))
      .then(() => {
        setPersons((prev) => prev.filter((person) => person.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} successfull={successfull} />
      <Filter search={search} setSearch={setSearch} />
      <Form
        newName={newName}
        newNumber={newNumber}
        addNewName={addNewName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <ShowPersons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
