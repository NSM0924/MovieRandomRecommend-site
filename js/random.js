window.onload = ()=>{
    btnClick()
    movieCode = !localStorage.getItem('BM_list')?[]:JSON.parse(localStorage.getItem('BM_list'));
}

const kobisKey = "0dd314961165dfd80f20d0a1a688c812"
const kobisUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${kobisKey}`
const kmdbKey = "99GX0A67J6468T9YJ2I8"
const kmdbUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${kmdbKey}`

let titleDiv = document.getElementById("title");
let ratingDiv = document.getElementById("rating");
let genreDiv = document.getElementById("genreText");
let storyDiv = document.getElementById("story");
let poster = document.getElementById("poster");
let safeMode = document.getElementById("safeMode");
let genreBox = document.getElementById("genreBox");
let storyPlus_text = document.getElementById("storyPlus_text");
let kmdbLink = document.getElementById("kmdbLink");
let keywordBox = document.getElementById("keywordBox");

let userGenre = "";
let userYear = document.getElementById("year");

let postersUrl

let BM_check;

function changeGenre() {
    let index = genreBox.selectedIndex;
    userGenre = genreBox.options[index].value;
}

function btnClick() {
    BM_check = false;

    let dataLength = 83160

    fetch(kmdbUrl+`&type[]=극영화&type[]=애니메이션&listCount=1&releaseDts=${userYear.value}&genre=${userGenre}`)
        .then(response=>response.json())
        .then((data)=>{
            dataLength = data.TotalCount
            console.log(dataLength)

            let ranNum = Math.floor(Math.random()*dataLength)
            fetch(kmdbUrl+`&type[]=극영화&type[]=애니메이션&listCount=1&releaseDts=${userYear.value}&genre=${userGenre}&startCount=${ranNum}`)
                .then(response=>response.json())
                .then((data)=>{
                    console.log(data);
                    console.log(data.Data[0].Result[0].genre);
                    let rating = data.Data[0].Result[0].rating;
                    let title = data.Data[0].Result[0].title;
                    let titleEng = data.Data[0].Result[0].titleEng;
                    let titleOrg = data.Data[0].Result[0].titleOrg;
                    let genre = data.Data[0].Result[0].genre;
                    let story = data.Data[0].Result[0].plots.plot[0].plotText;
                    let kmdbUrl = data.Data[0].Result[0].kmdbUrl;
                    let keywords = data.Data[0].Result[0].keywords;
                    postersUrl = data.Data[0].Result[0].posters.split("|");
                    let movieId = data.Data[0].Result[0].movieId
                    let movieSeq = data.Data[0].Result[0].movieSeq
                    let repRlsDate = data.Data[0].Result[0].repRlsDate.substr(0,4);

                    if(rating == ""){
                        btnClick()
                    }else{
                        if (safeMode.checked) {
                            if (rating.includes("18") ||
                                rating == "제한상영가" ||
                                rating == "연소자 관람불가" ||
                                rating == "연소자불가" ||
                                rating == "미성년자관람불가") {
                                btnClick()
                            } else{
                                poster.src = `${postersUrl==""?"./images/no-img.png":postersUrl[0]}`;

                                titleDiv.innerHTML = `<h2>${title.replace(/\!HS|!HE/g, "")}
                                <span id="BM_btn" onclick="bookmark('${movieId}', '${movieSeq}')">☆</span></h2>
                                <p>${titleEng==""?titleOrg:titleEng}</p>`;

                                ratingDiv.innerHTML = `${repRlsDate} | ${rating}`;

                                genreDiv.innerHTML = `<span>장르</span> ${genre}`;

                                if(story!=""){
                                    storyDiv.innerHTML = `${story.substr(0,50)}...
                                    <br><span class="storyPlus" onclick="storyPlus_click()">자세히보기</span>`;
                                }else{
                                    storyDiv.innerHTML = `준비중...`   
                                }

                                storyPlus_text.textContent = `${story}`

                                kmdbLink.innerHTML = `<a href="${kmdbUrl}" target="_blank">영화 정보 자세히 보기</a>`

                                if(keywords!=""){
                                    keywordBox.innerHTML = ""
                                    let keyword = keywords.split(",");
                                    let num = keyword.length>=16?16:keyword.length
                                    for (let i = 0; i < num; i++) {
                                        keywordBox.innerHTML += `<div><p>#${keyword[i]}</p></div>`
                                    }
                                }else{
                                    keywordBox.innerHTML = ""
                                }
                            }
                        } else{
                            poster.src = `${postersUrl==""?"./images/no-img.png":postersUrl[0]}`;

                            titleDiv.innerHTML = `<h2>${title.replace(/\!HS|!HE/g, "")}
                            <span id="BM_btn" onclick="bookmark('${movieId}', '${movieSeq}')">☆</span></h2>
                                <p>${titleEng==""?titleOrg:titleEng}</p>`;

                            ratingDiv.innerHTML = `${repRlsDate} | ${rating}`;

                            genreDiv.innerHTML = `<span>장르</span> ${genre}`;

                            if(story!=""){
                                storyDiv.innerHTML = `${story.substr(0,50)}...
                                <br><span class="storyPlus" onclick="storyPlus_click()">자세히보기</span>`;
                            }else{
                                storyDiv.innerHTML = `준비중...`   
                            }

                            storyPlus_text.textContent = `${story}`

                            kmdbLink.innerHTML = `<a href="${kmdbUrl}" target="_blank">영화 정보 자세히 보기</a>`

                            if(keywords!=""){
                                keywordBox.innerHTML = ""
                                let keyword = keywords.split(",");
                                for (let i = 0; i < keyword.length; i++) {
                                    keywordBox.innerHTML += `<div><p>#${keyword[i]}</p></div>`
                                }
                            }else{
                                keywordBox.innerHTML = ""
                            }
                        }
                    }
                })
        })
}

let i = 1;
function imgNext(){
    if (postersUrl != ""){
        if (i>=postersUrl.length) {
            i=0
            poster.src = postersUrl[i]
            i++
        }else{
            poster.src = postersUrl[i]
            i++
        }
    }
}

function storyPlus_click() {
    let storyPlus_box = document.getElementById("storyPlus_box");
    if(storyPlus_box.style.display == "block"){
        storyPlus_box.style.display = "none"
    }else{
        storyPlus_box.style.display = "block"
    }
}

let storageNum;
let movieCode;

function bookmark(id, seq) {
    storageNum = !localStorage.getItem('BMnum')?0:localStorage.getItem('BMnum');
    let BM_btn = document.getElementById("BM_btn");
    if(!BM_check){
        storageNum++
        console.log(storageNum);
        let newMovie = {
            num: storageNum,
            id,
            seq,
        };
        movieCode = movieCode.concat(newMovie);
        localStorage.setItem(`BM_list`, JSON.stringify(movieCode))
        localStorage.setItem(`BMnum`, storageNum)
        BM_btn.textContent = "★";
        BM_check = true;
    }else{
        movieCode = movieCode.filter(data => data.id != id && data.seq != seq);
        console.log(movieCode);
        localStorage.setItem(`BM_list`, JSON.stringify(movieCode))
        BM_btn.textContent = "☆";
        BM_check = false;
    }
}