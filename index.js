const loadAllClasses=()=>{
    fetch("https://final-backend-phi.vercel.app/class/classes/")
    .then(res=>res.json())
    .then(data=>DisplayClasses(data))
    .catch((err) => console.log(err))
}
const loadAllInstructors=()=>{
    fetch("https://final-backend-phi.vercel.app/class/instructors/")
    .then(res=>res.json())
    .then(data=>console.log(data))
}
loadAllClasses()
loadAllInstructors()
const DisplayClasses=(classes)=>{
    classes?.forEach(session=> {
        const parent=document.getElementById("class-card")
        const div=document.createElement("div")
        div.classList.add("doc-card")
        div.innerHTML=`
        <img class="doc-img" src="${doctor?.image}" alt="">
                        <h4>${doctor?.full_name}</h4>
                        <h6>${doctor?.designation}</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, consequatur!</p>
                        <p>
                        ${doctor?.specialization?.map((item)=>{
                            return `<button>${item}</button>`
                        })}
                        </p>
                        <button><a target="_blank" href="doc_details.html?doctorId=${doctor.id}">Details</a></button>
        `
        parent.appendChild(div)
    })
}

/* <button><a target="_blank" href="doc_details.html?doctorId=${doctor.id}">Details</a></button> */