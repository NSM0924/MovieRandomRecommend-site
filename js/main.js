const kobisKey = "0dd314961165dfd80f20d0a1a688c812"
const kobisUrl = `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${kobisKey}`
const kmdbKey = "99GX0A67J6468T9YJ2I8"
const kmdbUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=${kmdbKey}`

let boxofficeBox = document.getElementById("boxofficeBox");

let nowDate = new Date(); 
let nowYear = nowDate.getFullYear(); 
let nowMonth = nowDate.getMonth()+1;
let nowDay = nowDate.getDate();
if(nowMonth.length == 1){ 
    nowMonth = "0" + nowMonth;
}
if(nowDay.length == 1){ 
    nowDay = "0" + nowDay;
}
let oldDate = new Date(`${nowYear} ${nowMonth} ${nowDay}`)
oldDate.setDate(oldDate.getDate()-1);
let year = oldDate.getFullYear(); 
let month = String(oldDate.getMonth()+1);
let day = String(oldDate.getDate());
if(month.length == 1){ 
    month = "0" + month;
}
if(day.length == 1){ 
    day = "0" + day;
}
console.log(year,month,day);

document.getElementById("day").textContent = `일별 박스오피스 ${month}.${day} 기준`

fetch(kobisUrl+`&targetDt=${year}${month}${day}`)
    .then(response=>response.json())
    .then((data)=>{
        console.log(data.boxOfficeResult.dailyBoxOfficeList);
        for (let i = 0; i < 10; i++) {
            fetch(kmdbUrl+`&title=${data.boxOfficeResult.dailyBoxOfficeList[i].movieNm}&releaseDts=2021`)
                .then(response=>response.json())
                .then((data)=>{
                    let title = data.Data[0].Result[0].title;
                    let postersUrl = data.Data[0].Result[0].posters.split("|");
                    let movieId = data.Data[0].Result[0].movieId
                    let movieSeq = data.Data[0].Result[0].movieSeq
                    document.getElementById(`box${i}`).innerHTML+=`<a href="./movieInfo.html" onclick="movieInfo('${movieId}','${movieSeq}')"><div>
                    <div class="posterBox">
                    <img src=${postersUrl==""?"./images/no-img.png":postersUrl[0]} alt="">
                    <p class="rankNum">${i+1}</p>
                    </div>
                    <p>${title.replace(/\!HS|!HE/g, "")}</p>
                    </div></a>`;
                })
        }
    })

let mainImg = document.getElementById("backImg");
let mainImg_src = ["./images/lala.jpg","./images/avengers.jpg","./images/haul.png",
                    "./images/abouttime.jpg","./images/interstellar.jpg","./images/spacesweepers.jpg",
                    "./images/inception.jpg"]
let mainImg_link = document.getElementById("mainImg_link");
let mainImg_code = [["F","36256"],["F","29414"],["F","09852"],["F","31201"],["F","32372"],["K","20772"],["F","26312"]]
let mainImg_num = 0;
let mainImg_auto =  setInterval(mainImg_next, 4000);
function mainImg_prev() {
    clearInterval(mainImg_auto)
    if (mainImg_num==0) {
        mainImg_num = mainImg_src.length-1;
        mainImg.style.backgroundImage=`url(${mainImg_src[mainImg_num]})`;
        mainImg_link.setAttribute('onclick',`movieInfo('${mainImg_code[mainImg_num][0]}','${mainImg_code[mainImg_num][1]}')`);
        mainImg_auto =  setInterval(mainImg_next, 4000);
    }else{
        mainImg_num--;
        mainImg.style.backgroundImage=`url(${mainImg_src[mainImg_num]})`;
        mainImg_link.setAttribute('onclick',`movieInfo('${mainImg_code[mainImg_num][0]}','${mainImg_code[mainImg_num][1]}')`);
        mainImg_auto =  setInterval(mainImg_next, 4000);
    }
}

function mainImg_next() {
    clearInterval(mainImg_auto)
    if (mainImg_num==mainImg_src.length-1) {
        mainImg_num = 0;
        mainImg.style.backgroundImage=`url(${mainImg_src[mainImg_num]})`;
        mainImg_link.setAttribute('onclick',`movieInfo('${mainImg_code[mainImg_num][0]}','${mainImg_code[mainImg_num][1]}')`);
        mainImg_auto =  setInterval(mainImg_next, 4000);
    }else{
        mainImg_num++;
        mainImg.style.backgroundImage=`url(${mainImg_src[mainImg_num]})`;
        mainImg_link.setAttribute('onclick',`movieInfo('${mainImg_code[mainImg_num][0]}','${mainImg_code[mainImg_num][1]}')`);
        mainImg_auto =  setInterval(mainImg_next, 4000);
    }
}


let BO_num = 0;
function BO_prev() {
    if (BO_num==0) {
        BO_num=-1000
        boxofficeBox.style.transform=`translateX(${BO_num}px)`;
    }else{
        BO_num+=200
        boxofficeBox.style.transform=`translateX(${BO_num}px)`;
    }
}

function BO_next() {
    if (BO_num==-1000) {
        BO_num=0
        boxofficeBox.style.transform=`translateX(${BO_num}px)`;
    }else{
        BO_num-=200
        boxofficeBox.style.transform=`translateX(${BO_num}px)`;
    }
}

function movieInfo(id, seq) {
    let movieCode = [id, seq];
    console.log(movieCode);
    localStorage.setItem(`movieInfo`, JSON.stringify(movieCode))
}
