const accessKey="gqNDYTa_Bk5DsT4ZJGm-1aYe5DmmE9GKq47DoADpnQQ";

const inputEl=document.getElementById("search-input");
const container = document.querySelector(".search-results");


let page = 1;


async function getImages() {
    const apiUrl = `https://api.unsplash.com/photos?page=${page}&per_page=21`;
    const api_req = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Client-ID ${accessKey}`
            }

    });
    const api_res = await api_req.json();
    console.log(api_res);
    api_res.forEach(item => {
        container.innerHTML += ` <div class="search-result">
        <img src=${item.urls.small} alt="@" loading="lazy">
        <a href=${item.links.download} target="_blank" class=sourav>${extractSixWords(item.description ? item.description : item.alt_description) + "..."}</a>
       
        <div class="details">
        <div class="user-img">
        <img src=${item.user.profile_image.small}">
        </div>
        <div class="user-name">
          <h3>${item.user.name}</h3>
          <p>${item.user.social.instagram_username?item.user.social.instagram_username:""}</p>
        </div>
        <div class="like">
        
        <ion-icon name="heart"></ion-icon>
       <span> ${item.likes}<span>
        </div>
        
    </div>
        </div>`
    })

}
getImages();

async function getSearchResults(){
    if(!inputEl.value&&inputEl.value == "") return;
   // console.log(inputEl.value);
    const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${inputEl.value}`;
    const api_req = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: `Client-ID ${accessKey}`
            }

    });
    const api_res = await api_req.json();
    container.innerHTML="";
    let data=api_res.results;
    data.forEach(function(item) {
        container.innerHTML += ` <div class="search-result">
        <img src=${item.urls.small} alt="@" loading="lazy">
          <a href=${item} target="_blank">${extractSixWords(item.description ? item.description : item.alt_description) + "..."}</a>
        <div class="details">
        <div class="user-img">
        <img src=${item.user.profile_image.small}">
          
        </div>
        <div class="user-name">
        <h3>${item.user.name}</h3>
          <p>${item.user.social.instagram_username?item.user.social.instagram_username:""}</p>
        </div>
        <div class="like">
        
        <span class="material-symbols-outlined soo">
        favorite
        </span>
       ${item.likes}
        </div>
        
    </div>
        </div>`
    })


    console.log(api_res);
}
   


function extractSixWords(sentence) {
    // Regular expression to match words (non-space characters)
    const wordRegex = /[^\s]+/g;
    
    // Extract words using the regex
    const words = sentence.match(wordRegex);
    
    if (words && words.length > 10) {
        // Join the first 6 words and return
        return words.slice(0, 10).join(" ");
    } else {
        return sentence;
    }
}

