// function movieInfo(name, seq) {
//     localStorage.setItem(`name`, name)
//     localStorage.setItem(`seq`, seq)
// }
// let schoolName = localStorage.getItem(`name`)
// let seq = localStorage.getItem(`seq`)
// console.log(schoolName, 'name');
// console.log(seq, 'seq');
async function test() {
    const content = await fetch(`http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=99GX0A67J6468T9YJ2I8&title=아이언맨`);
    const text = await content.json();
    console.log(text);
}

document.getElementById('search').addEventListener('click', test)

fetch(`https://api.odcloud.kr/api/15014632/v1/uddi:d6552229-9686-4565-a421-ab303156f076_202004101338?page=1&perPage=7581&serviceKey=wujFj%2FYIVEdYnw%2BkyLbIROKilq9lZUCnzqCaJqQO8W3Drxqw56hwJijGVqRuf2%2BJHBobJ8udufzB0E1dx20L1g%3D%3D`)
            .then(response => response.json())
            .then((data) => {
                // let value2 = document.getElementById('value').value.toUpperCase();
                for (let j = 0; j < data.data.length; j++) {
                    if ('가천대학교' == data.data[j].학교명) {
                        console.log(data.data[j]);
                    }
                }
            })