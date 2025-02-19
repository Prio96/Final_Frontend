const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("InstructorId")
    loadTime(param)
    fetch(`https://final-backend-phi.vercel.app/class/instructors/${param}`)
        .then(res => res.json())
        .then(data => displayInstructorDetails(data))
}

const displayInstructorDetails = (instructor) => {
    const parent = document.getElementById("doc-details")
    const div = document.createElement("div")
    div.classList.add("doc-details-container")
    div.innerHTML = `
        <div class="doctor-img">
            <img src=${doctor.image} alt="">
        </div>
        <div class="doc-info">
            <h1>${doctor.full_name}</h1>
            ${doctor.specialization.map(item => {
        return `<button class="doc-detail-btn">${item}</button>`
    })
        }
            ${doctor.designation.map(item => {
            return `<h4>${item}</h4>`
        })}
            <p class="w-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nisi ducimus maxime, laudantium delectus quae.</p>
            <h4>Fees: ${doctor.fee}</h4>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Take Appointment
            </button>
        </div>
    `
    parent.appendChild(div)
}

