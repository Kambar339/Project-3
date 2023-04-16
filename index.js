months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
};
const go_main = ()=> location.reload(); 
news = `<div class="news">  
                    <div class="news-content">

                        <div class="news-info">
                            <p>•</p>&nbsp
                            <img class="ava" src="./assets/ava.png">
                            <p class="news-info-author"></p> &nbsp
                            <p class="news-info-from">in</p> &nbsp
                            <p class="news-info-name"></p> &nbsp
                            <p clasnews-info-textray-text">·</p>&nbsp
                            <p class="news-info-date"></p>&nbsp
                        </div>

                        <button class="news-title"></button>
                        <p class="news-short"></p>

                        <div class="news-info-buttom">
                            <div class="news-info-buttom-content">
                                <p class="news-info-time"></p>&nbsp
                                <p class="news-info-from">·</p>&nbsp
                                <p class="news-selected">Selected for you</p>&nbsp
                            </div>

                            <div class="news-icons">
                                <img alt="icon" src="./assets/icon.png">&nbsp
                                <img alt="icon" src="./assets/icon.png">&nbsp
                                <img alt="icon" src="./assets/icon.png">&nbsp
                            </div>
                        </div>

                    </div>
                    <img class="news-img" src="">
                </div>`;

let newsListElement = document.getElementById("news-list");



async function get_news(){
    const response = await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=sDAx8jvNUanuKltqvEKesAytl4eteqaZ')
    if(!response.ok && response.status==='404')
        console.log('Error')

    let data = await response.json();
    let id = 0;

    data.results.forEach(item => {
        modified = news.replace(`<div class="news">`, `<div class="news" id="${id}">`)
        
        modified = modified.replace(`class="news-info-author">`,
        `class="news-info-author">${item.byline}`);

        modified = modified.replace(`class="news-info-name">`,
        `class="news-name">${item.section}`);

        let dateObj = new Date(item.published_date);
        let day = dateObj.getDate();
        let month = months[dateObj.getMonth() + 1];
        
        modified = modified.replace(`class="news-info-date">`,
        `class="news-info-date">${day} ${month}`);

        modified = modified.replace(`class="news-title">`,
        `class="news-title">${item.title}`);

        modified = modified.replace(`class="news-short">`,
        `class="news-short">${item.abstract}`);

        modified = modified.replace(`class="news-info-time">`,
        `class="news-info-time">12 min read`);

        modified = modified.replace(`class="news-img" src="">`,
        `class="news-img"" src="${item.multimedia[0].url}">`);

        newsListElement.innerHTML += modified;
        id += 1;
    });

    // CLick
    open_new_page(data);

}
    
  

// CLick
function open_new_page(data){
    const chose = document.getElementsByClassName("news-title");

    for(let i = 0; i < chose.length; i++){
        chose[i].addEventListener('click', function(){   
            newsListElement.style = "display: none";
            const this_el = document.getElementById(i);
            const el = document.createElement("div");
            const back = document.createElement("button");
            const back_img = document.createElement("img");
            back_img.src = "./assets/Left.png";
            back.append(back_img);
            el.append(back);
            

            const ava = document.createElement("img");
            ava.src = "./assets/ava.png"
            ava.className = "ava-page";

            const author_n = this_el.getElementsByClassName("news-info-author")[0];
            author_n.className = "news-info-author";

            

            const createdDate = this_el.getElementsByClassName("news-info-date")[0];
            createdDate.className = "news-info-date";
            const title = this_el.getElementsByClassName("news-title")[0];
            title.className = "news-title";
            const abstract = this_el.getElementsByClassName("news-short")[0];
            abstract.className = "news-short";
            const visualImage = this_el.getElementsByClassName("news-img")[0];
            visualImage.className = "news-img";

            const subheader = document.createElement("p");
            const newContentSubheader = document.createTextNode("Subheader");
            subheader.appendChild(newContentSubheader);
            subheader.className = "news-subheader";

            const newsText = document.createElement("p");
            const newContentNewsText = document.createTextNode(`Couldn't find the way to fetch content( API, does not provide such data. Same for subheader`);
            newsText.appendChild(newContentNewsText);
            newsText.className = "news-text";
            
            el.append(ava)
            el.append(author_n);
            el.append(createdDate);
            el.append(title);
            el.append(abstract);
            el.append(visualImage);
            el.append(subheader);
            el.append(newsText);

            console.log(visualImage.className);
            const open_page_el = document.getElementById("open-page");
            open_page_el.append(el);

            back.addEventListener('click', function(){
                open_page_el.style = "display: none";
                go_main();
            });
        });
    }
}
get_news();


