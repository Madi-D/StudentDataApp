/*
PURPOSE: the UI of the app 
INPUT: ?
OUTPUT: ?
*/

import { useState } from 'react'

/*
PURPOSE:
INPUT: ?
OUTPUT: ?
*/
function App() {
  const [files, setFiles] = useState([]) //This creates a piece of state called files (starts as an empty array) and setFiles is how you update it.
  return (
    <div>
      <h1>Student Score Merger</h1>
      <input type="file" multiple accept=".xlsx,.xls" onChange={(e) => setFiles(Array.from(e.target.files))}/> {/*e.target.files gives you the selected files, and Array.from() converts it into a regular JavaScript array so it's easier to work with.*/}
      {files.map(file => <p>{file.name}</p>)} {/* add this to display the filenames: This loops over the files array and renders a <p> for each one. */}
    </div>
  )
}

export default App