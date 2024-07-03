import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [newProvider, setNewProvider] = useState({
    Name: "",
    Country: "",
    marketShare: "",
    renewableEnergyPercentage: "",
    yearlyRevenue: "",
  });
  const [updateProvider, setUpdateProvider] = useState({
    id: "",
    Name: "",
    Country: "",
    marketShare: "",
    renewableEnergyPercentage: "",
    yearlyRevenue: "",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  async function getProviders() {
    const res = await fetch(
      "http://localhost:8888/api/electricity_provider/get",
    );
    const json = res.json();
    return json;
  }

  useEffect(() => {
    getProviders()
      .then((providers) => setBackendData(providers))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCreate = () => {
    fetch("http://localhost:8888/api/electricity_provider/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProvider),
    })
      .then((response) => response.json())
      .then((data) => {
        setBackendData([...backendData, data]);
        setNewProvider({
          Name: "",
          Country: "",
          marketShare: "",
          renewableEnergyPercentage: "",
          yearlyRevenue: "",
        });
        setShowCreateForm(false); // Hide the form after creation
      })
      .catch((error) => {
        console.error("Error creating provider:", error);
      });
  };

  const handleUpdate = async () => {
    await fetch(
      `http://localhost:8888/api/electricity_provider/update/${updateProvider.Name}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProvider),
      },
    );

    setBackendData(await getProviders());
    setShowUpdateForm(false); // Hide the form after update
  };

  const handleDelete = (name) => {
    fetch(`http://localhost:8888/api/electricity_provider/delete/${name}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        getProviders().then((data) => setBackendData(data));
        setShowDeleteForm(false); // Hide the form after deletion
        
      })
      .catch((error) => {
        console.error("Error deleting provider:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Electricity Providers</h1>
        <ul>
          {backendData.length > 0 ? (
            backendData.map((item, index) => (
              <li key={index}>
                <strong>Name:</strong> {item.Name}
                <br />
                <strong>Country:</strong> {item.Country}
                <br />
                <strong>Market Share:</strong> {item.marketShare}%<br />
                <strong>Renewable Energy Percentage:</strong>{" "}
                {item.renewableEnergyPercentage}%<br />
                <strong>Yearly Revenue:</strong> ${item.yearlyRevenue}
                <br />
                <button onClick={() => handleDelete(item.Name)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No data available</li>
          )}
        </ul>

        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          Create New Provider
        </button>
        <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
          Update Provider
        </button>
        <button onClick={() => setShowDeleteForm(!showDeleteForm)}>
          Delete Provider
        </button>

        {showCreateForm && (
          <div>
            <h2>Create New Provider</h2>
            <input
              type="text"
              placeholder="Name"
              value={newProvider.Name}
              onChange={(e) =>
                setNewProvider({ ...newProvider, Name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Country"
              value={newProvider.Country}
              onChange={(e) =>
                setNewProvider({ ...newProvider, Country: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Market Share"
              value={newProvider.marketShare}
              onChange={(e) =>
                setNewProvider({ ...newProvider, marketShare: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Renewable Energy Percentage"
              value={newProvider.renewableEnergyPercentage}
              onChange={(e) =>
                setNewProvider({
                  ...newProvider,
                  renewableEnergyPercentage: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Yearly Revenue"
              value={newProvider.yearlyRevenue}
              onChange={(e) =>
                setNewProvider({
                  ...newProvider,
                  yearlyRevenue: e.target.value,
                })
              }
            />
            <button onClick={handleCreate}>Create</button>
          </div>
        )}

        {showUpdateForm && (
          <div>
            <h2>Update Provider</h2>
            <input
              type="text"
              placeholder="Name"
              value={updateProvider.Name}
              onChange={(e) =>
                setUpdateProvider({ ...updateProvider, Name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Country"
              value={updateProvider.Country}
              onChange={(e) =>
                setUpdateProvider({
                  ...updateProvider,
                  Country: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Market Share"
              value={updateProvider.marketShare}
              onChange={(e) =>
                setUpdateProvider({
                  ...updateProvider,
                  marketShare: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Renewable Energy Percentage"
              value={updateProvider.renewableEnergyPercentage}
              onChange={(e) =>
                setUpdateProvider({
                  ...updateProvider,
                  renewableEnergyPercentage: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Yearly Revenue"
              value={updateProvider.yearlyRevenue}
              onChange={(e) =>
                setUpdateProvider({
                  ...updateProvider,
                  yearlyRevenue: e.target.value,
                })
              }
            />
            <button onClick={handleUpdate}>Update</button>
          </div>
        )}

        {showDeleteForm && (
          <div>
            <h2>Delete Provider</h2>
            <input
              type="text"
              placeholder="Name"
              value={updateProvider.Name}
              onChange={(e) =>
                setUpdateProvider({ ...updateProvider, Name: e.target.value })
              }
            />
            <button onClick={() => handleDelete(updateProvider.Name)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
