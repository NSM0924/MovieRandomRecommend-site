window.onload = ()=>{
    movieCode = !localStorage.getItem('BM_list')?[]:JSON.parse(localStorage.getItem('BM_list'));
    storageNum = !localStorage.getItem('BMnum') ? 0 : localStorage.getItem('BMnum');
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

let postersUrl

let BM_check;

let movieInfo_code = JSON.parse(localStorage.getItem("movieInfo"));
fetch(kmdbUrl + `&listCount=1&movieId=${movieInfo_code[0]}&movieSeq=${movieInfo_code[1]}`)
    .then(response => response.json())
    .then((data) => {
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
        let BM_btnText = "☆";

        movieCode.forEach(data => {
            if (data.id == movieId && data.seq == movieSeq) {
                BM_check = true
                BM_btnText = "★"
            }
        });
        
        poster.src = `${postersUrl == "" ? "./images/no-img.png" : postersUrl[0]}`;
        titleDiv.innerHTML = `<h2>${title.replace(/\!HS|!HE/g, "")}
                    <span id="BM_btn" onclick="bookmark('${movieId}', '${movieSeq}')">${BM_btnText}</span></h2>
                    <p>${titleEng == "" ? titleOrg : titleEng}</p>`;
        ratingDiv.innerHTML = `${rating}`;
        genreDiv.innerHTML = `<span>장르</span> ${genre}`;
        if (story != "") {
            storyDiv.innerHTML = `${story.substr(0, 50)}...
                        <br><span class="storyPlus" onclick="storyPlus_click()">자세히보기</span>`;
        } else {
            storyDiv.innerHTML = `준비중...`
        }
        storyPlus_text.textContent = `${story}`
        kmdbLink.innerHTML = `<a href="${kmdbUrl}" target="_blank">영화 정보 자세히 보기</a>`
        if (keywords != "") {
            keywordBox.innerHTML = ""
            let keyword = keywords.split(",");
            let num = keyword.length >= 16 ? 16 : keyword.length
            for (let i = 0; i < num; i++) {
                keywordBox.innerHTML += `<div><p>#${keyword[i]}</p></div>`
            }
        } else {
            keywordBox.innerHTML = ""
        }
    })

let i = 1;
function imgNext() {
    if (postersUrl != "") {
        if (i >= postersUrl.length) {
            i = 0
            poster.src = postersUrl[i]
            i++
        } else {
            poster.src = postersUrl[i]
            i++
        }
    }
}

function storyPlus_click() {
    let storyPlus_box = document.getElementById("storyPlus_box");
    if (storyPlus_box.style.display == "block") {
        storyPlus_box.style.display = "none"
    } else {
        storyPlus_box.style.display = "block"
    }
}

let storageNum;
let movieCode;
function bookmark(id, seq) {
    let BM_btn = document.getElementById("BM_btn");
    if (!BM_check) {
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
    } else {
        movieCode = movieCode.filter(data => data.id != id && data.seq != seq);
        console.log(movieCode);
        localStorage.setItem(`BM_list`, JSON.stringify(movieCode))
        BM_btn.textContent = "☆";
        BM_check = false;
    }
}