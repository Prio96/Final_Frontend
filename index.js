const loadAllClasses=()=>{
    fetch("https://final-backend-phi.vercel.app/class/classes/")
    .then(res=>res.json())
    .then(data=>console.log(data))
}
const loadAllInstructors=()=>{
    fetch("https://final-backend-phi.vercel.app/class/instructors/")
    .then(res=>res.json())
    .then(data=>console.log(data))
}
loadAllClasses()
loadAllInstructors()

/* <button><a target="_blank" href="doc_details.html?doctorId=${doctor.id}">Details</a></button> */