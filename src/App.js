import React, { useState } from 'react';
import './App.css';
import Form from './components/UI/Form';

import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [isFileSelectted , setisFileSelectted] = useState(false);

  // handle file upload
  const handleFileUpload = event => {
    setSelectedFile(event.target.files[0]);
    setisFileSelectted(true);
  }

  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\n/);
    const headers = dataStringLines[0].split(/,/);
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
    // prepare columns list from headers
    const columns = headers.map(c => {
      return{ 
      name: c,
      selector: c,
    }});

    setData(list);
    setColumns(columns);
  }

  const upload = () => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(selectedFile);
    
  }

  return (
    <div className="app">
      <div className="form">
          <Form   handleFileUpload={handleFileUpload} upload ={upload} isFileSelectted={isFileSelectted}/>
      </div>

      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default App;