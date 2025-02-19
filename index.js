const loadAllClasses=()=>{
    fetch("https://final-backend-phi.vercel.app/class/classes/")
    .then(res=>res.json())
    .then(data=>DisplayClasses(data.results))
    .catch((err) => console.log(err))
}
const loadAllInstructors=()=>{
    fetch("https://final-backend-phi.vercel.app/class/instructors/")
    .then(res=>res.json())
    .then(data=>DisplayInstructors(data.results))
    .catch((err) => console.log(err))
}
loadAllClasses()
loadAllInstructors()
const DisplayClasses=(classes)=>{
    console.log(classes)
    classes.forEach(session=> {
        const parent=document.getElementById("class-container")
        const child=document.getElementById("class-card")
        child.innerHTML=`
            <h3 class="text-uppercase h5">${session.name}</h3>
            <p>${session.topic}</p>
            <p>${session.description.slice(0,50)}</p>
            <p>
            ${session.time.map((item)=>{
                return `<button class="btn btn-outline-light text-white" style="background-color: black">${item}</button>`
            }).join(" ")}
            </p>
            <button class="btn btn-outline-light"><a class="text-decoration-none text-white" target="_blank" href="class_details.html?ClassId=${session.id}">Details</a></button>

        `
        parent.appendChild(child)
    })
}
const DisplayInstructors=(instructors)=>{
    console.log(instructors)
    instructors.forEach(instructor=>{
        const parent=document.getElementById("instructor-container")
        const li=document.createElement("li")
        li.innerHTML=`
            <div class="card" style="width: 18rem;">
                <img src="${instructor.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${instructor.name}</h5>
                    <p class="card-text">${instructor.bio.slice(0,50)}...</p>
                    <p>
                    ${instructor.specialization.map((item)=>{
                        return `<button class="btn btn-outline-light text-white" style="background-color: black">${item}</button>`
                    }).join(" ")}
                    </p>
                    
                    <button class="btn btn-outline-dark btn-dark"><a class="text-decoration-none text-white" target="_blank" href="instructor_details.html?InstructorId=${instructor.id}">Details</a></button>
                </div>
            </div>
        `
        parent.appendChild(li)
    })
}
/* <button><a target="_blank" href="doc_details.html?doctorId=${doctor.id}">Details</a></button> */

