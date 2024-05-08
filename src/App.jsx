/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import { deployErc721 } from "./services/controller";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    network: "",
    alias: "",
  });

  const [contractAddress, setContractAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeploy = async () => {
    try {
      setLoading(true);
      const response = await deployErc721(
        formData.name,
        formData.symbol,
        parseInt(formData.network),
        3000000,
        formData.alias
      );
      setError("");
      setContractAddress(response.contractAddress);
      console.log(response);
    } catch (error) {
      setError("Error al desplegar el contrato: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <form>
        <h2 style={{ color: "#10cd9e", fontSize: "25px" }}>ERC721 Deploy</h2>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Symbol
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
          />
        </label>
        <label>
          Network:
          <select
            name="network"
            value={formData.network}
            onChange={handleChange}
          >
            <option value="">Select Network</option>
            <option value="80002">Polygon Amoy</option>
            <option value="1115511">Ethereum Sepolia</option>
          </select>
        </label>
        <label>
          Alias
          <input
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
          />
        </label>
        <button className="button" type="button" onClick={handleDeploy}>
          {loading ? "Cargando..." : "Deploy"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {contractAddress && (
        <div className="contract">
          <p style={{color: "#10cd9e", fontSize:"15px", fontWeight:"600"}}>New contract:</p>
          <p style={{ fontSize: "14px" }}>{contractAddress}</p>
        </div>
      )}
    </div>
  );
}

export default App;
