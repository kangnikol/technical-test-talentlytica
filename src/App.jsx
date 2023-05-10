import { useState } from "react"
import PropTypes from "prop-types"
import "./App.css"

// eslint-disable-next-line react/prop-types
function TableRow({ name, onChange }) {
  return (
    <tr>
      <td>{name}</td>
      {Array.from({ length: 4 }, (_, index) => (
        <td key={index}>
          <select
            className="w"
            name={`aspek_penilaian_${index + 1}_${name
              .toLowerCase()
              .replace(" ", "_")}`}
            id={index + 1}
            onChange={onChange}
          >
            {Array.from({ length: 10 }, (_, optionIndex) => (
              <option value={optionIndex + 1} key={optionIndex + 1}>
                {optionIndex + 1}
              </option>
            ))}
          </select>
        </td>
      ))}
    </tr>
  )
}

function App() {
  const [formData, setFormData] = useState({})
  const [output, setOutput] = useState(null)

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    const newValue = value === "" ? "1" : value
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }))
  }

  const handleSaveButtonClick = () => {
    const formDataByAspek = {}
    let key
    for (let i = 1; i <= 4; i++) {
      const formDataByMahasiswa = {}
      key = `aspek_penilaian_${i}`
      for (let j = 1; j <= 10; j++) {
        const subkey = `mahasiswa_${j}`
        const value = formData[`${key}_${subkey}`] || "1"
        formDataByMahasiswa[subkey] = value
      }
      formDataByAspek[key] = formDataByMahasiswa
    }
    const json = JSON.stringify(formDataByAspek, null, 2)
    setOutput(json)
  }

  return (
    <>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="w">Aspek Penilaian 1</th>
              <th className="w">Aspek Penilaian 2</th>
              <th className="w">Aspek Penilaian 3</th>
              <th className="w">Aspek Penilaian 4</th>
            </tr>
          </thead>
          <tbody>
            <TableRow name="Mahasiswa 1" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 2" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 3" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 4" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 5" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 6" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 7" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 8" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 9" onChange={handleSelectChange} />
            <TableRow name="Mahasiswa 10" onChange={handleSelectChange} />
          </tbody>
        </table>
        <button style={{}} onClick={handleSaveButtonClick}>
          Simpan
        </button>
      </div>
      <div
        style={{ backgroundColor: "#f5f5f5", color: "black", padding: "1rem" }}
      >
        {output && (
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {output}
          </pre>
        )}
      </div>
    </>
  )
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default App
