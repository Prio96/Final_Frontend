const loadProfile = () => {
    fetch("https://gmsfinal.vercel.app/member/member_profile/", {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res=>res.json())
    .then(data=>{
        if (data.error) {
            console.error(data.error)
            document.getElementById("profile-main-body").innerHTML=""
            document.getElementById("profile-error-msg").innerText=data.error
            return
        }

        // Show details of member
        console.log(data)
        document.getElementById("profile-image").src=data.member.image
        document.getElementById("name").innerText=`${data.member.user.first_name} ${data.member.user.last_name}`
        document.getElementById("member-id").innerHTML=`<b>Member ID:</b> ${data.member.id}`
        document.getElementById("mobile").innerHTML=`<b>Mobile:</b> ${data.member.mobile_no}`
        document.getElementById("gender").innerHTML=`<b>Gender:</b> ${data.member.gender}`
        document.getElementById("weight").innerHTML=`<b>Weight:</b> ${data.member.weight} kg`
        document.getElementById("height").innerHTML=`<b>Height:</b> ${data.member.height} cm`
        document.getElementById("date-joined").innerHTML=`<b>Joined on:</b> ${data.member.date_joined}`

        // Show booking history
        const BookingHistoryContainer=document.getElementById("booking-history-container")
        const BookingTable=document.getElementById("table")
        const BookingList=document.getElementById("booking-history")
        BookingList.innerHTML=""
        // If booking history is empty
        if(data.bookings.length===0){
            BookingTable.style.display='none'
            const EmptyMessage=document.createElement("p")
            EmptyMessage.classList.add("text-center","text-warning","mt-3")
            EmptyMessage.innerText="The booking history is empty"
            BookingHistoryContainer.appendChild(EmptyMessage)
        }
        //If booking history is not empty
        else{
            let count=0
            data.bookings.forEach(booking => {
            count=count+1
            const tr= document.createElement("tr")
            tr.innerHTML = `
                <th scope="row" class="text-center">${count}</th>
                <td class="text-center">${booking.id}</td>
                <td class="text-center">${booking.class_session}</td>
                <td class="text-center">${booking.booking_date}</td>
            `
            BookingList.appendChild(tr)
        })
        }
    })
    .catch(error=>{
        console.error("Error fetching profile:",error)
        document.getElementById("profile-error-msg").innerText=data.error
    })
}

loadProfile()