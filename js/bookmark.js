const kmdbKey = "99GX0A67J6468T9YJ2I8"
const kmdbUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${kmdbKey}`
let result = document.getElementById("result");
let movieCode = JSON.parse(localStorage.getItem(`BM_list`));

let storageNum = localStorage.getItem('BMnum')
console.log(storageNum);
function BM_load() {
    result.innerHTML = ""
    movieCode.map(data => (
        fetch(kmdbUrl+`&listCount=1&movieId=${data.id}&movieSeq=${data.seq}`)
            .then(response=>response.json())
            .then((moviedata)=>{
                console.log(moviedata.Data[0].Result[0])
                let title = moviedata.Data[0].Result[0].title;
                let postersUrl = moviedata.Data[0].Result[0].posters.split("|");
                let movieId = moviedata.Data[0].Result[0].movieId
                let movieSeq = moviedata.Data[0].Result[0].movieSeq

                result.innerHTML+=`<div class="movieBox"><a href="./movieInfo.html" onclick="movieInfo('${movieId}', '${movieSeq}')" target="_blank">
                <div class="posterBox">
                <img src=${postersUrl==""?"./images/no-img.png":postersUrl[0]} alt="poster">
                </div>
                <p>${title.replace(/\!HS|!HE/g, "")}</p>
                </a><button class="btn" onclick="listRemove(${data.num})">삭제</button></div>`
            })
        
    ))
}

function listRemove(num) {
    movieCode = movieCode.filter(data => data.num != num);
    console.log(movieCode);
    localStorage.setItem(`BM_list`, JSON.stringify(movieCode))
    BM_load()
}

function movieInfo(id, seq) {
    let movieCode = [id, seq];
    console.log(movieCode);
    localStorage.setItem(`movieInfo`, JSON.stringify(movieCode))
}

window.onload = BM_load()