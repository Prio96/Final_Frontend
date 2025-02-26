const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("ClassId")
    fetch(`https://gymbackend-flax.vercel.app/class/classes/${param}`)
        .then(res => res.json())
        .then(data => displayClassDetails(data))
        .catch(error=>{
            console.error("Error:", error)
            ShowCatchErrorMessage(error)
        })
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
        credentials: "include", 
        body: JSON.stringify({ class_session: className })
        
    })
    .then(res=>res.json().then(data=>({status:res.status, body:data})))
    .then(({ status, body }) => {
        if (body.error) {
            console.log("Error booking class:",body.error)
            ShowErrorMessage(body)
        } 
        else {
            console.log(body.success)
            console.log(body.data)
            ShowSuccessMessage(body)
        }
    })
    .catch(error => {
        console.error("Error:", error);
        ShowCatchErrorMessage(error)
    });
        
}

getparams()
