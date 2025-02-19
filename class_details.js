const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("ClassId")
    fetch(`https://final-backend-phi.vercel.app/class/classes/${param}`)
        .then(res => res.json())
        .then(data => displayClassDetails(data))

}

const displayClassDetails = (session) => {
    console.log(session)
    const parent = document.getElementById("class-details")
    const div = document.createElement("div")
    div.classList.add("class-details-container")
    div.innerHTML = `
            <h3>${session.name}</h3>
            <p>${session.topic}</p>
            ${session.time.map(item => {
        return `<button class="btn btn-dark">${item}</button>`
    })
        }
            <p>${session.instructor}</p>
            
            <p>${session.description}</p>
            <button type="button" class="btn btn-dark">
            <a class="text-decoration-none text-white" target="_blank" href="#">Book Class</a>
            </button>
    `
    parent.appendChild(div)
}
getparams()
/* <button><a target="_blank" href="doc_details.html?doctorId=${doctor.id}">Details</a></button> */