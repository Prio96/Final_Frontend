const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("InstructorId")
    fetch(`https://final-backend-phi.vercel.app/class/instructors/${param}`)
        .then(res => res.json())
        .then(data => displayInstructorDetails(data))
}

const displayInstructorDetails = (instructor) => {
    const parent = document.getElementById("instructor-details")
    const div = document.createElement("div")
    div.classList.add("instructor-details-container")
    div.innerHTML = `
        <div class="instructor-img">
            <img src=${instructor.image} alt="">
        </div>
        <div class="instructor-info">
            <h3>${instructor.name}</h3>
            <p>${instructor.email}</p>

            ${instructor.specialization.map(item => {
        return `<button class="instructor-detail-btn">${item}</button>`
    }).join(" ")
        }
            
            <p class="w-50">${instructor.bio}</p>
            <p class="w-50">${instructor.phone}</p>
            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Take Appointment
            </button>
        </div>
    `
    parent.appendChild(div)
}
getparams()

