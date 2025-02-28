const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("InstructorId")
    fetch(`https://gmsfinal.vercel.app/class/instructors/${param}`)
        .then(res => res.json())
        .then(data => displayInstructorDetails(data))
        .catch(error=>{
            console.log(error)
            document.getElementById("instructor-detail-error-msg").innerText=error
        })
}

const displayInstructorDetails = (instructor) => {
    const parent = document.getElementById("instructor-details-container")
    const div = document.createElement("div")
    div.classList.add("instructor-details","d-flex","justify-content-center","gap-5","w-50","m-auto")
    div.innerHTML = `
        <div class="instructor-img">
            <img src=${instructor.image} class="object-fit-cover" style="height:30vh;width:18rem" alt="">
        </div>
        <div class="instructor-info">
            <h3>${instructor.name}</h3>
            <p>${instructor.email}</p>
            <h5>Expertise</h5>
            <p>
            ${instructor.specialization.map(item => {
        return `<button class="instructor-detail-btn btn btn-outline-dark btn-dark text-white">${item}</button>`
    }).join(" ")
        }
            </p>
            <h5>About Me</h5>
            <p class="w-50">${instructor.bio}</p>
            <p class="w-50"><b>Phone Number:</b> ${instructor.phone}</p>
        </div>
    `
    parent.appendChild(div)
}
getparams()

