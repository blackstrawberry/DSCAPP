const mydata = [];
fetch("./js/gongju.json").then(response => {
return response.json();
}).then((json) => {
    // console.log(json.data);
    for(i=0;i<json.data.length;i++){
        mydata.push(json.data[i]);
    }

    const set_nodes = [];
    const set_edges = [];

    for(i=0;i<mydata.length;i++){
        if (mydata[i].desctiption_image == ''){
            set_nodes.push({"id":mydata[i].id,"label":mydata[i].name, "shape": "circularImage", "image": mydata[i].review_image});
        }
        else{
            set_nodes.push({"id":mydata[i].id,"label":mydata[i].name, "shape": "circularImage", "image": mydata[i].desctiption_image});
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
            color:{
                border:'#fff',
                background:'#fff',
                highlight: {
                border: '#ff5234',
                background: '#ff5234'
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
            arrows: '',
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
    let selected = [];
    let search = [];
    network.on( 'click', function(properties) {
    let ids = properties.nodes;
    let clickedNodes = nodes.get(ids);

    const place = document.querySelector(".place");
    const info = document.querySelector(".info");
    function removedom() {
        const place = document.querySelector(".place");
        const info_1 = document.querySelector(".info .info_1");
        const info_2 = document.querySelector(".info .info_2");
        const info_3 = document.querySelector(".info .info_3");

        while ( place.hasChildNodes() ) { 
            place.removeChild( place.firstChild ); 
        }
        while ( info_1.hasChildNodes() ) { 
            info_1.removeChild( info_1.firstChild ); 
        }
        while ( info_2.hasChildNodes() ) { 
            info_2.removeChild( info_2.firstChild ); 
        }
        while ( info_3.hasChildNodes() ) { 
            info_3.removeChild( info_3.firstChild ); 
        }
    }
    
    
    if (clickedNodes[0] == undefined) {
        selected.push([{"id":0,"label":"0"}]);
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
    // console.log(selected);
    // console.log(search);

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
            let newh2 = document.createElement('h2');
            let text = document.createTextNode(search[i].name);
            newh2.appendChild(text);
            place.appendChild(newh2);
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
        if(search[0].desctiption_image==""){
            place.querySelector('img').setAttribute("src", search[1].desctiption_image);
            place.querySelector('img').setAttribute("alt", search[1].name);
            place.querySelector('img').setAttribute("width", "100%");
            place.querySelector('img').setAttribute("height","40%");
        }
        let newh2 = document.createElement('h1');
        let text = document.createTextNode(search[0].name);
        let newdes = document.createElement('p');
        let destext = document.createTextNode(search[0].description);
        newh2.appendChild(text);
        place.appendChild(newh2);
        newdes.appendChild(destext);
        place.appendChild(newdes);
        
        console.log(search);
        if(search[0].level == '2'){
            for(i=1;i<search.length;i++){
                let newname = document.createElement('h3');
                let newimg = document.createElement('img');
                let newdes = document.createElement('p');
                info.querySelector(".info_"+i).appendChild(newname);
                info.querySelector(".info_"+i).appendChild(newimg);
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
                let newname = document.createElement('h3');
                let newimg = document.createElement('img');
                let newdes = document.createElement('p');
                info.querySelector(".info_"+i).appendChild(newname);
                info.querySelector(".info_"+i).appendChild(newimg);
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

    });

});