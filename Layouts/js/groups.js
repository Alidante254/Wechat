// this is to query database for data about the groups.
document.addEventListener("DOMContentLoaded", function() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {loadGroups(this);}
  xhttp.open("POST", "/server/xml/groups.xml");
  xhttp.send();
function loadGroups(xml) {
      const xmlDoc = xml.responseXML;
      const groups = xmlDoc.getElementsByTagName("group");
      for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const groupId = group.getElementsByTagName("group_id")[0].textContent;
        const groupName = group.getElementsByTagName("group_name")[0].textContent;
        const senderName = group.getElementsByTagName("sender_name")[0].textContent;
        const lastMessage = group.getElementsByTagName("message_body")[0].textContent;
        const sentAt = group.getElementsByTagName("send_at")[0].textContent;
        //DISPLAY THE GROUPS.
        showGroups(groupId, groupName,senderName, lastMessage, sentAt);
      }
}
// 1. loading all the groups created showing their name and last sent message.
function showGroups( groupId, groupName, senderName, lastMessage, sentAt) {
    console.log(groupId + " div created")
    const groupsContainer = document.querySelector(".groups");
    const groupDetails = document.createElement("div");
        groupDetails.className = "group-details";
        groupDetails.id = groupId;
        groupDetails.onclick = onClicked;
        groupsContainer.appendChild(groupDetails);
        const img = document.createElement("img");
              img.src = "Files/user-img.svg";
              img.width = "35vw";
              img.height = "35vw";
              img.alt = "";
              groupDetails.appendChild(img);
        const groupNameBox = document.createElement("strong");
              groupDetails.appendChild(groupNameBox);
              groupNameBox.innerHTML = groupName;
        const sentAtBox = document.createElement("mark");
              groupDetails.appendChild(sentAtBox);
              sentAtBox.innerHTML = sentAt;
        const lastMessageBox = document.createElement("p");
              groupDetails.appendChild(lastMessageBox);
              lastMessageBox.innerHTML = senderName + ": " + lastMessage;
              groupDetails.addEventListener("click", function(){
                  document.getElementById("group-header").innerHTML = groupName;
              });
}
function onClicked(){
      groupId = this.id;
      const alldivs = document.querySelectorAll(".currentChat-container");
      alldivs.forEach((element) => {
        // If the element's display style is set to "block"
        if (window.getComputedStyle(element).display === 'block') {
          // Set the display style to "none"
          element.style.display = 'none';
        }
      });
      selectedDiv =  document.getElementById("group"+groupId);
      selectedDiv.style.display = "block";
      const  enterText = document.getElementById("type-here")
            enterText.style.display = "block";
      const sendBox = document.getElementById("message-body");
            sendBox.className = groupId;
}
});
//a variable and a function to get the ssession number of the current user.
