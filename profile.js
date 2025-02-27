const loadProfile = () => {
    fetch("https://gymbackend-flax.vercel.app/member/member_profile/", {
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

        // Display member details
        console.log(data)
        document.getElementById("profile-image").src=data.member.image
        document.getElementById("profile-name").innerText=`${data.member.user.first_name} ${data.member.user.last_name}`
        document.getElementById("profile-mobile").innerHTML=`<b>Mobile:</b> ${data.member.mobile_no}`
        document.getElementById("profile-gender").innerHTML=`<b>Gender:</b> ${data.member.gender}`
        document.getElementById("profile-weight").innerHTML=`<b>Weight:</b> ${data.member.weight} kg`
        document.getElementById("profile-height").innerHTML=`<b>Height:</b> ${data.member.height} cm`
        document.getElementById("date-joined").innerHTML=`<b>Joined on:</b> ${data.member.date_joined}`

        // Display booking history
        const BookingHistoryContainer=document.getElementById("booking-history-container")
        const BookingTable=document.getElementById("table")
        const BookingList=document.getElementById("booking-history")
        BookingList.innerHTML=""
        if(data.bookings.length===0){
            BookingTable.style.display='none'
            const EmptyMessage=document.createElement("p")
            EmptyMessage.classList.add("text-center","text-warning","mt-3")
            EmptyMessage.innerText="The booking history is empty"
            BookingHistoryContainer.appendChild(EmptyMessage)
        }
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
    .catch(error => console.error("Error fetching profile:",error))
}

loadProfile()