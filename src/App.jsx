/*
PURPOSE: the UI of the app 
INPUT: ?
OUTPUT: ?
*/

import { useState } from 'react'  //tracks state (which files have been loaded)
import * as XLSX from 'xlsx'      //allows excel files to be read
/*
PURPOSE: Takes the values in the file associated with an id number and creates a student object
INPUT: multiple values 
OUTPUT: a student object
*/
function createStudent(id, fname, lname, homeroom, grade, level){
  return{
    id: id,
    fname: fname,
    lname: lname,
    homeroom: homeroom,
    grade: grade,
    level: level
  }
}
/*
PURPOSE:
INPUT: ?
OUTPUT: ?
*/
function App() {
  const [files, setFiles] = useState([]) //This creates a piece of state called files (starts as an empty array) and setFiles is how you update it.
  const[students, setStudents] = useState({}) //creates a state which stores the data (startes with an empty set)
  console.log(students)
  return (
    <div>
      <h1>Student Score Merger</h1>
      <input type="file" multiple accept=".xlsx,.xls" onChange={(e) => {  
          setFiles(Array.from(e.target.files))  /*e.target.files gives you the selected files, and Array.from() converts it into a regular JavaScript array so it's easier to work with.*/
          ReadFiles(e.target.files, setStudents)
        }}/>
      {files.map(file => <p key={file.name}>{file.name}</p>)} {/* add this to display the filenames: This loops over the files array and renders a <p> for each one. */}
    </div>
  )
}

/*
PURPOSE: The function should take the array of files as a parameter, loop over them 
INPUT: array of excel files
OUTPUT: ?
*/
function ReadFiles(array, setStudents){
  Array.from(array).forEach(element => {
    const reader = new FileReader()

    reader.onload = (e) => {  //a property where you set a function that runs when it's done reading
      // file is ready, do something with it here...
      const workbook = XLSX.read(e.target.result, { type: 'array' }) //turns raw bytes into a workbook
      const sheet = workbook.Sheets[workbook.SheetNames[0]] //each imported file is likely 1 page
      const rows = XLSX.utils.sheet_to_json(sheet) //turns a sheet into an array of row objects

      rows.forEach(row => { //loop through the array of rows
        const student = createStudent(row.id, row.fname, row.lname, row.homeroom, row.grade, row.level) //create a student object from each row
        
        Object.keys(row).forEach(k => {
          //The trick is — you only want to add the score columns, not the fixed ones. So inside the loop you'd need to skip id, fname, lname, homeroom, grade, and level.
          if (k == 'id' || k == 'fname' || k == 'lname' || k == 'homeroom' || k == 'grade' || k == 'level'){
            //continue
          } 
          else{
            //create a new key value pair
            student[k] = row[k] //add test columns
          }
        }) 
        setStudents(prev => ({ ...prev, [student.id]: { ...prev[student.id], ...student } })) //spread whatever was already on this student, then spread the new student on top.

      })
      
    }
    reader.readAsArrayBuffer(element) //tells it to start reading the file
  });
}

export default App