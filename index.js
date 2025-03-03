const truncateWords = (text, numWords) => {
    const words = text.split(" ")
    return words.length > numWords ? words.slice(0, numWords).join(" ") + "..." : text
}
const loadAllClasses=()=>{
    fetch("https://gmsfinal.vercel.app/class/classes/")
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("class-spinner").innerHTML=""
        DisplayClasses(data.results)
    })
    .catch((error)=>{
        console.log(error)
        document.getElementById("class-spinner").innerHTML=""
        document.getElementById("class-container-error-msg").innerText=`Unexpected error: ${error}`
    })
}
const loadAllInstructors=()=>{
    fetch("https://gmsfinal.vercel.app/class/instructors/")
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("instructor-spinner").innerHTML=""
        DisplayInstructors(data.results)
    })
    .catch((error)=>{
        console.log(error)
        document.getElementById("instructor-spinner").innerHTML=""
        document.getElementById("instructor-container-error-msg").innerText=`Unexpected error: ${error}`
    })
}
loadAllClasses()
loadAllInstructors()
const DisplayClasses=(classes)=>{
    console.log(classes)
    classes.forEach(session=> {
        const parent=document.getElementById("class-container")
        const li=document.createElement("li")
        li.classList.add("class-card","p-3","p-xl-5","text-light","slide-visible")
        li.innerHTML=`
            <h3 class="text-uppercase h5">${session.name}</h3>
            <p>${session.topic.name}</p>
            <p>${truncateWords(session.description, 10)}</p>
            <p class="class-card-btns">
            ${session.time.map((item)=>{
                return `<button class="btn btn-outline-light text-white m-1 class-card-btn" style="background-color: black">${item}</button>`
            }).join(" ")}
            </p>
            <button class="btn btn-outline-light"><a class="text-decoration-none text-white detail-btn" target="_blank" href="class_details.html?ClassId=${session.id}">Details</a></button>

        `
        parent.appendChild(li)
    })
}
const DisplayInstructors=(instructors)=>{
    console.log(instructors)
    instructors.forEach(instructor=>{
        const parent=document.getElementById("instructor-container")
        const li=document.createElement("li")
        li.classList.add("slide-visible")
        li.innerHTML=`
            <div class="card" id="instructor-card">
                <img src="${instructor.image}" class="card-img-top instructor-img object-fit-cover" alt="...">
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

