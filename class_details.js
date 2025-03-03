const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("ClassId")
    fetch(`https://gmsfinal.vercel.app/class/classes/${param}`)
        .then(res => res.json())
        .then(data =>{
            document.getElementById("class-detail-spinner").innerHTML=""
            displayClassDetails(data)
        })
        .catch(error=>{
            document.getElementById("class-detail-spinner").innerHTML=""
            console.error("Error:",error)
            ShowCatchErrorMessage(error)
        })
}

const displayClassDetails=(session)=>{
    console.log(session)
    const parent=document.getElementById("class-details")
    const div=document.createElement("div")
    div.classList.add("class-details-container","d-flex","justify-content-center","gap-4")
    div.innerHTML=`
    <div class="class-details">
        <h3>${session.name}</h3>
            <p><b>${session.topic.name}</b></p>
            <p class="class-time">
            ${session.time.map(item => {
        return `<button class="btn btn-dark m-2 me-1">${item}</button>`
    }).join(" ")
        }
            </p>
            <p><b>Instructor:</b> ${session.instructor}</p>
            
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
    document.getElementById("book-class-btn").addEventListener("click",()=>{
        bookClass(session.name); 
    });
}

const bookClass=(className)=>{
    const token=localStorage.getItem("token");

    fetch("https://gmsfinal.vercel.app/class/book_class/", {
        method:"POST",
        headers:{
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        credentials:"include", 
        body:JSON.stringify({class_session:className})
        
    })
    .then(res=>res.json().then(data=>({status:res.status,body:data})))
    .then(({status,body})=>{
        if(status===401){
            document.getElementById("error-msg").innerText="Please log in and try again"
            setTimeout(() => {
                document.getElementById("error-msg").innerText=""
            }, 2000);
        }
        else if(status===403){
            console.log(body)
            document.getElementById("error-msg").innerText=body.detail
            setTimeout(() => {
                document.getElementById("error-msg").innerText=""
            }, 2000);
        }
        else if (body.error){
            console.log("Error booking class:",body.error)
            ShowErrorMessage(body)
        } 
        else{
            console.log(body.success)
            console.log(body)
            ShowSuccessMessage(body)
        }
    })
    .catch(error=>{
        console.error("Error:", error);
        ShowCatchErrorMessage(error)
    });
        
}

getparams()
