const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("ClassId")
    fetch(`https://gymbackend-flax.vercel.app/class/classes/${param}`)
        .then(res => res.json())
        .then(data => displayClassDetails(data))

}

const displayClassDetails = (session) => {
    console.log(session)
    const parent = document.getElementById("class-details")
    const div = document.createElement("div")
    div.classList.add("class-details-container","d-flex","justify-content-center","gap-4")
    div.innerHTML = `
    <div class="class-details">
        <h3>${session.name}</h3>
            <p>${session.topic.name}</p>
            <p>
            ${session.time.map(item => {
        return `<button class="btn btn-dark">${item}</button>`
    }).join(" ")
        }
        </p>
            <p>Instructor: ${session.instructor}</p>
            
            <p>${session.description}</p>
            <button class="btn btn-dark" id="book-class-btn">
            Book Class
            </button>
    </div>
    <div class="class-img">
        <img class="session-img"src="${session.topic.image}" alt="Class Image">
    </div>
            
    `
    parent.appendChild(div)
    document.getElementById("book-class-btn").addEventListener("click", () => {
        bookClass(session.name); 
    });
}

const bookClass = (className) => {
    const token = localStorage.getItem("token");

    fetch("https://gymbackend-flax.vercel.app/class/book_class/", {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ class_session: className })  // Send only class name
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
};

// Example button for booking a class


getparams()
/* <button><a target="_blank" href="doc_details.html?doctorId=${doctor.id}">Details</a></button> */