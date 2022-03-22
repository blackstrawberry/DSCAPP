const mydata = [];
let idnum = 33;
fetch("./js/gongju.json").then(response => {
return response.json();
}).then((json) => {
    // console.log(json.data);
    for(i=0;i<json.data.length;i++){
        mydata.push(json.data[i]);
    }
    let selected = [];
    let search = [];

    //탐색창 초기화
    function removedom() {
        const place = document.querySelector(".place");
        const info = document.querySelector('.info');

        document.querySelector('.child').style = "display:none;";
        document.querySelector('.child .child1').innerText = '';
        document.querySelector('.child .child2').innerText = '';
        document.querySelector('.child .child3').innerText = '';

        while ( place.hasChildNodes() ) { 
            place.removeChild( place.firstChild ); 
        }
        while ( info.hasChildNodes() ) { 
            info.removeChild( info.firstChild ); 
        }
    }

    //vis js
    function startvis (){
        let set_nodes = [];
        let set_edges = [];
    
        for(i=0;i<mydata.length;i++){
            if (mydata[i].level == '1'){
                set_nodes.push({"id":mydata[i].id,"label":mydata[i].name, "shape": "circularImage", "size": 50, "image": mydata[i].desctiption_image, "group": 0});
            }
            else if (mydata[i].level == '2'){
                set_nodes.push({"id":mydata[i].id,"label":mydata[i].name, "shape": "circularImage", "size": 40, "image": mydata[i].desctiption_image, "group": 1});
    
            }
            else if (mydata[i].level == '3'){
                set_nodes.push({"id":mydata[i].id,"label":mydata[i].name, "shape": "circularImage", "size": 30, "image": mydata[i].desctiption_image, "group": 2});
            }
            else if (mydata[i].level == '4'){
                set_nodes.push({"id":mydata[i].id,"label":mydata[i].name, "shape": "circularImage", "size": 25, "image": mydata[i].review_image, "group": 3});
            }
            set_edges.push({"from":mydata[i].from,"to":mydata[i].to});
        }
        let nodes = new vis.DataSet(set_nodes);
        let edges = new vis.DataSet(set_edges);
    
        // create a network
        let container = document.getElementById('mynetwork');
    
        // provide the data in the vis format
        let data = {
            nodes: nodes,
            edges: edges
        };
        let options = {
            clickToUse: true,
            nodes:{
                borderWidth: 8,
                color:{
                    border:'#fff',
                    background:'#fff',
                    highlight: {
                    border: '#ff5234',
                    background: '#ff5234',
                    },
                    hover: {
                    border: '#000',
                    background: '#000'
                    },
                },
                font: {
                    color: '#ffffff',
                    size: 18, // px
                    face: 'arial',
                    background: 'none',
                    strokeWidth: 0, // px
                    strokeColor: '#ffffff',
                    align: 'center',
                    multi: false,
                    vadjust: 0,
                    bold: {
                        color: '#fff',
                        size: 18, // px
                        face: 'arial',
                        vadjust: 0,
                        mod: 'bold'
                    },
                }
            },
            
            edges:{
                color: '#ff5234',
                font: '1px arial #ff0000',
                scaling:{
                  label: true,
                },
                shadow: false,
                smooth: true,
            },
        };
    
        // initialize your network!
        let network = new vis.Network(container, data, options);
        document.querySelector('.child').style = "display:none;";
        
        network.on( 'click', function(properties) {
            let ids = properties.nodes;
            let clickedNodes = nodes.get(ids);
            
            if (clickedNodes[0] == undefined) {
                selected.push([{"id":0,"label":"0"}]);
                search = []
            }
            else{
                selected = [];
                selected.push(clickedNodes);
                search = [];
                for(i=0;i<mydata.length;i++){
                    if(selected[selected.length - 1][0].id===mydata[i].id || selected[selected.length - 1][0].id===mydata[i].from){
                        search.push(mydata[i]);
                    }
                }
            }
            showsidebar();
        });
    }
    startvis();
    
    // 모달창
    const modal = document.querySelector("#modal");
    const startModal = document.querySelector('.modal-button');
    const modalForm = document.querySelector('.modal-form');
    let modalplace = document.querySelector('.modal-select');
    let modalname = document.querySelector('.modal-name');
    let modalsrc = document.querySelector('.modal-src');
    let modalreview = document.querySelector('.modal-review');
    let modalstar = document.querySelector('.modal-star');
    startModal.addEventListener("click", e => {
        modal.style.display = "flex"
    });
    const closeBtn = modal.querySelector(".close-area")
    closeBtn.addEventListener("click", e => {
        modal.style.display = "none"
    });
    modal.addEventListener("click", e => {
        const evTarget = e.target
        if(evTarget.classList.contains("modal-overlay")) {
            modal.style.display = "none"
        }
    });
    function modalInput(event) {
        event.preventDefault();
        let place = modalplace.options[modalplace.selectedIndex].value;
        let name = modalname.value;
        let src = modalsrc.value;
        let review = modalreview.value;
        let star = modalstar.options[modalplace.selectedIndex].value;
        modalname.value = "";
        modalsrc.value = "";
        modalreview.value = "";
        let pushitem = [];
        if(place == "공산성"){
            pushitem = {"id": idnum, "name": name, "level": 4, "from": 9,"to": idnum,"description": "","desctiption_image": "", "star_rating": star, "review_image": src,"review": review};
        }
        else if(place == "더크루즈"){
            pushitem = {"id": idnum, "name": name, "level": 4, "from": 21,"to": idnum,"description": "","desctiption_image": "", "star_rating": star, "review_image": src,"review": review};
        }
        else if(place == "베이커리 밤마을"){
            pushitem = {"id": idnum, "name": name, "level": 4, "from": 29,"to": idnum,"description": "","desctiption_image": "", "star_rating": star, "review_image": src,"review": review};
        }
        else if(place == "에어산"){
            pushitem = {"id": idnum, "name": name, "level": 4, "from": 13,"to": idnum,"description": "","desctiption_image": "", "star_rating": star, "review_image": src,"review": review};
        }
        else if(place == "엔학고래"){
            pushitem = {"id": idnum, "name": name, "level": 4, "from": 5,"to": idnum,"description": "","desctiption_image": "", "star_rating": star, "review_image": src,"review": review};
        }
        else if(place == "연미산자연미술공원"){
            pushitem = {"id": idnum, "name": name, "level": 4, "from": 17,"to": idnum,"description": "","desctiption_image": "", "star_rating": star, "review_image": src,"review": review};
        }
        else if(place == "유구 색동수국정원"){
            pushitem = {"id": idnum, "name": name, "level": 4, "from": 25,"to": idnum,"description": "","desctiption_image": "", "star_rating": star, "review_image": src,"review": review};
        }
        console.log(pushitem);
        mydata.push(pushitem);
        idnum = idnum+1;
        startvis();
        modal.style.display = "none";
        console.log(mydata);
    }
    modalForm.addEventListener("submit", modalInput);

    //탐색창&검색기능
    const searchForm = document.querySelector('.serch_area');
    const getinput = document.querySelector('.serch_area input');
    function searchmachine(text){
        let temp = 0;
        for(i=0;i<mydata.length;i++){
            if(text === mydata[i].name){
                search.push(mydata[i]);
                selected.push([{"id": mydata[i].id, "label": mydata[i].name}]);
                temp = mydata[i].id;
            }
        }        
        for(i=0;i<mydata.length;i++){
            if(temp === mydata[i].from){
                search.push(mydata[i]);
            }
        }
        if(temp == 0){
            selected = [];
            selected.push([{"id":0,"label":"0"}]);
            alert("입력한 정보를 찾을 수 없습니다.");
        }
        showsidebar();
    }

    function handleInput(event) {
        event.preventDefault();
        const newSearch = getinput.value;
        getinput.value = "";
        selected = [];
        search = [];
        
        searchmachine(newSearch);
    }
    searchForm.addEventListener("submit", handleInput);

    $('.child1').on("click", function() {
        selected = [];
        search = [];
        const text = document.querySelector('.child .child1').innerText;
        searchmachine(text);
    });
    $('.child2').on("click", function() {
        selected = [];
        search = [];
        const text = document.querySelector('.child .child2').innerText;
        searchmachine(text);
    });
    $('.child3').on("click", function() {
        selected = [];
        search = [];
        const text = document.querySelector('.child .child3').innerText;
        searchmachine(text);
    });
    document.querySelector('.child').style = "display:none;";
    
    //탐색창 표시
    function showsidebar() {
        const place = document.querySelector(".place");
        const info = document.querySelector(".info");
        if(selected[selected.length - 1][0].id == 0){
            removedom();
            let newh2 = document.createElement('h2');
            let text = document.createTextNode("노드를 선택해 주세요.");
            newh2.appendChild(text);
            place.appendChild(newh2);
            document.querySelector('.info').style.visibility = "hidden";
        }
        else if(search[0].level == '1'){
            removedom();
            document.querySelector('.child').style = "display:flex;";


            document.querySelector('.info').style.visibility = "hidden";
            let newimg = document.createElement('img');
            place.appendChild(newimg);
            place.querySelector('img').setAttribute("src", search[0].desctiption_image);
            place.querySelector('img').setAttribute("alt", search[0].name);
            place.querySelector('img').setAttribute("width", "100%");
            place.querySelector('img').setAttribute("height","40%");
            let newh2 = document.createElement('h1');
            let text = document.createTextNode(search[0].name);
            newh2.appendChild(text);
            place.appendChild(newh2);
            let newdes = document.createElement('p');
            let destext = document.createTextNode(search[0].description);
            newdes.appendChild(destext);
            place.appendChild(newdes);
    
            let count = document.createElement('ul');
            place.appendChild(count);
            let li = document.createElement('li');
            place.querySelector('ul').appendChild(li);
            place.querySelector('ul li').innerText = "하위항목 : "+(search.length-1);
            for(i=1;i<search.length;i++){
                let text = document.createTextNode(search[i].name);
                document.querySelector('.child'+i).appendChild(text);
            }
        }
        else if(search[0].level == '2' || search[0].level == '3'){
            removedom();
            document.querySelector('.info').style.visibility = "visible";
            let newimg = document.createElement('img');
            place.appendChild(newimg);
            place.querySelector('img').setAttribute("src", search[0].desctiption_image);
            place.querySelector('img').setAttribute("alt", search[0].name);
            place.querySelector('img').setAttribute("width", "100%");
            place.querySelector('img').setAttribute("height","40%");

            let newh2 = document.createElement('h1');
            let text = document.createTextNode(search[0].name);
            let newdes = document.createElement('p');
            let destext = document.createTextNode(search[0].description);
            newh2.appendChild(text);
            place.appendChild(newh2);
            newdes.appendChild(destext);
            place.appendChild(newdes);
            
            if(search[0].level == '2'){
                for(i=1;i<search.length;i++){
                    let newinfo = document.createElement('div');
                    info.appendChild(newinfo);
                    document.querySelectorAll(".info div")[i-1].className = "info_"+i;
                    
                    let newname = document.createElement('h3');
                    let newimg = document.createElement('img');
                    let newdes = document.createElement('p');
                    info.querySelector(".info_"+i).appendChild(newimg);
                    info.querySelector(".info_"+i).appendChild(newname);
                    info.querySelector(".info_"+i).appendChild(newdes);
                    info.querySelector(".info_"+i+" p").className = "second";
        
                    info.querySelector(".info_"+i+" h3").innerText = search[i].name;
                    info.querySelector(".info_"+i+" img").setAttribute("src", search[i].desctiption_image);
                    info.querySelector(".info_"+i+" .second").innerText = search[i].description;
                }
            }
            if(search[0].level == '3'){
                let count = document.createElement('ul');
                place.appendChild(count);
                let li1 = document.createElement('li');
                let li2 = document.createElement('li');
                place.querySelector('ul').appendChild(li1);
                place.querySelector('ul').appendChild(li2);
                let star = document.createElement('img');
                place.querySelectorAll("ul li")[0].appendChild(star);
                place.querySelector("ul li img").setAttribute("src", "./img/star.svg");
                place.querySelectorAll('ul li')[1].innerText = (search[0].star_rating)+" / 하위항목 : "+(search.length-1);
                for(i=1;i<search.length;i++){
                    let newinfo = document.createElement('div');
                    info.appendChild(newinfo);
                    document.querySelectorAll(".info div")[i-1].className = "info_"+i;

                    let newname = document.createElement('h3');
                    let newimg = document.createElement('img');
                    let newdes = document.createElement('p');

                    info.querySelector(".info_"+i).appendChild(newimg);
                    info.querySelector(".info_"+i).appendChild(newname);

                    let count = document.createElement('ul');
                    info.querySelector(".info_"+i).appendChild(count);
                    let li1 = document.createElement('li');
                    let li2 = document.createElement('li');
                    info.querySelector(".info_"+i).querySelector('ul').appendChild(li1);
                    info.querySelector(".info_"+i).querySelector('ul').appendChild(li2);
                    let star = document.createElement('img');
                    info.querySelector(".info_"+i).querySelectorAll("ul li")[0].appendChild(star);
                    info.querySelector(".info_"+i).querySelector("ul li img").setAttribute("src", "./img/star.svg");
                    info.querySelector(".info_"+i).querySelectorAll('ul li')[1].innerText = (search[i].star_rating)+"/5";


                    info.querySelector(".info_"+i).appendChild(newdes);
                    info.querySelector(".info_"+i+" p").className = "second";
        
                    info.querySelector(".info_"+i+" h3").innerText = search[i].name;
                    info.querySelector(".info_"+i+" img").setAttribute("src", search[i].review_image);
                    info.querySelector(".info_"+i+" .second").innerText = search[i].review;
                }
            }
        }
        else{
            removedom();
            let newimg = document.createElement('img');
            place.appendChild(newimg);
            place.querySelector('img').setAttribute("src", search[0].review_image);
            place.querySelector('img').setAttribute("width", "100%");
            place.querySelector('img').setAttribute("height","40%");
            place.querySelector('img').setAttribute("alt", search[0].name);
            let newh2 = document.createElement('h1');
            let text = document.createTextNode(search[0].name);
            let newdes = document.createElement('p');
            let destext = document.createTextNode(search[0].review);
            newh2.appendChild(text);
            place.appendChild(newh2);
            let count = document.createElement('ul');
            place.appendChild(count);
            let li1 = document.createElement('li');
            let li2 = document.createElement('li');
            place.querySelector('ul').appendChild(li1);
            place.querySelector('ul').appendChild(li2);
            let star = document.createElement('img');
            place.querySelectorAll("ul li")[0].appendChild(star);
            place.querySelector("ul li img").setAttribute("src", "./img/star.svg");
            place.querySelectorAll('ul li')[1].innerText = (search[0].star_rating)+"/5";
            newdes.appendChild(destext);
            place.appendChild(newdes);
            document.querySelector('.info').style.visibility = "hidden";
        }
    }

});