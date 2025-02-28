const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("InstructorId")
    fetch(`https://gmsfinal.vercel.app/class/instructors/${param}`)
        .then(res => res.json())
        .then(data =>{
            document.getElementById("instructor-detail-spinner").innerHTML=""
            displayInstructorDetails(data)
        })
        .catch(error=>{
            console.log(error)
            document.getElementById("instructor-detail-spinner").innerHTML=""
            document.getElementById("instructor-detail-error-msg").innerText=error
        })
}

const displayInstructorDetails = (instructor) => {
    const parent = document.getElementById("instructor-details-container")
    const div = document.createElement("div")
    div.classList.add("instructor-details","d-flex","justify-content-center")
    div.innerHTML = `
        <div class="instructor-img">
            <img src=${instructor.image} class="object-fit-cover" style="height:60vh;width:30vw" alt="">
        </div>
        <div class="instructor-info w-50 p-3">
            <h3>${instructor.name}</h3>
            <p>${instructor.email}</p>
            <h5>Expertise</h5>
            <p>
            ${instructor.specialization.map(item => {
        return `<button class="instructor-detail-btn btn btn-light">${item}</button>`
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

