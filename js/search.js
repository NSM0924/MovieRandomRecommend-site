const kobisKey = "0dd314961165dfd80f20d0a1a688c812"
const kobisUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${kobisKey}`
const kmdbKey = "99GX0A67J6468T9YJ2I8"
const kmdbUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${kmdbKey}`

let userInput = document.getElementById("userInput");
let result = document.getElementById("result");

function search() {
    if (userInput.value == "") {
        alert("검색할 영화 이름을 입력해주세요.")
        return
    }
    result.innerHTML = ""
    result.style.display = "grid"
    fetch(kmdbUrl+`&title=${userInput.value}`)
        .then(response=>response.json())
        .then((data)=>{
            if (data.Data[0].Count == 0) {
                result.style.display = "block"
                result.innerHTML = "<h1 style='text-align:center;'>검색 결과가 없습니다.</h1>"
            }

            for (let i = 0; i < data.Data[0].Count; i++) {
                console.log(data.Data[0].Result[i])
                let title = data.Data[0].Result[i].title;
                let postersUrl = data.Data[0].Result[i].posters.split("|");
                let movieId = data.Data[0].Result[i].movieId
                let movieSeq = data.Data[0].Result[i].movieSeq

                result.innerHTML+=`<div class="movieBox"><a href="./movieInfo.html" onclick="movieInfo('${movieId}','${movieSeq}')" target="_blank">
                <div class="posterBox">
                <img src=${postersUrl==""?"./images/no-img.png":postersUrl[0]} alt="poster">
                </div>
                <p>${title.replace(/\!HS|!HE/g, "")}</p>
                </a></div>`
            }
        })
}

userInput.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') {
        search()
    }
});

function movieInfo(id, seq) {
    let movieCode = [id, seq];
    console.log(movieCode);
    localStorage.setItem(`movieInfo`, JSON.stringify(movieCode))
}