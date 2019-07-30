const inputValue = document.querySelector("#search");

let mainContainer = document.getElementById("myData");

  function getUsers(){
    const fetchUse = inputValue.value;
    fetch(`https://api.github.com/search/users?q=${fetchUse}`)
    .then(function(response) {
      return response.json();
    })
   
    .then(function (data) {
        console.log("response",data);
        appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
    }
    function appendData(data) {
        let mainContainer = document.getElementById("myDIV");
        let repContainer = document.getElementById("repost");
        let ImgContainer = document.getElementById("img-container");
        let repBody = document.getElementById("container")
        console.log(data);
       
        for (let i = 0; i < data.items.length; i++) {
            userObject = data.items[i];
            let div = document.createElement('div');
            let divImg = document.createElement('divImg');
            div.className = "container-store";
            let url = data.items[i].avatar_url;
            div.innerHTML += "<img src= "+url+"\" width=\"100px\" height=\"50px\">";
            div.innerHTML += 'Name: ' + data.items[i].login;
            
            let repUrl = data.items[i].repos_url;
            let profUrl = data.items[i].html_url; 
            div.innerHTML += '<a href='+profUrl+'><button>Profile</button></a>'
            div.innerHTML += `<button id=rep>Repository</button>`
            
            div.addEventListener("click", event =>{
                myFunction();
                console.log(data);
                let divRepHead = document.createElement('div');
                divRepHead.className = "container";
                let url = data.items[i].avatar_url;
                divRepHead.innerHTML = "<img src= "+url+"\" width=\"100px\" height=\"50px\">";
                divRepHead.innerHTML += data.items[i].login;
                divRepHead.innerHTML += data.count;
                let reposUrl = data.items[i].repos_url;
                fetch(reposUrl).then(function(response) {
                  return response.json();
                }).then(function (data) {
                  for(let i=0; i<data.length; i++){
                    let divRepbody = document.createElement('div');
                    divRepbody.className = "container-store1";
                    let url = data[i].owner.avatar_url;
                    divRepbody.innerHTML = "<img src= "+url+"\" width=\"100px\" height=\"50px\">";
                    divRepbody.innerHTML ="Repository Name: "+ data[i].full_name;
                    let private = data[i].private;
                    if(!private){
                    divRepbody.innerHTML += "Public";
                    }
                    else{
                    divRepbody.innerHTML += "Private";
                    }
                    divRepbody.innerHTML += "\n" +"Fork: "+data[i].forks_count;
                    divRepbody.innerText += "\n"+"Watchers: " + data[i].watchers_count + "\n" ;
                    let htmlLink = data[i].html_url;
                    divRepbody.innerHTML += '<a href='+htmlLink+'>URL: '+htmlLink+'</a>';
                    repBody.appendChild(divRepbody);
                  }
                  })
                repContainer.appendChild(divRepHead);
            })
            mainContainer.appendChild(div);     
        }
    }
    

    function myFunction() {
        let x = document.getElementById("myDIV");
        console.log(x);
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }
