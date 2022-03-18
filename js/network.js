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
        set_nodes.push({"id":mydata[i].id,"label":mydata[i].name});
        set_edges.push({"from":mydata[i].from,"to":mydata[i].to});
    }
    let nodes = new vis.DataSet(set_nodes);
    let edges = new vis.DataSet(set_edges);

    // create a network
    let container = document.getElementById('mynetwork');
    let container_place = document.getElementById('place_window');
    let container_review = document.getElementById('review_window');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        
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
                color: '#343434',
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
            },
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
    if (clickedNodes[0] == undefined) {
        selected.push([{"id":0,"label":"0"}]);
        
    }else{
        selected = [];
        selected.push(clickedNodes);
        search = [];
        for(i=0;i<mydata.length;i++){
            if(selected[selected.length - 1][0].id===mydata[i].id || selected[selected.length - 1][0].id===mydata[i].from){
                search.push(mydata[i]);
            }
        }
        if(search.length<=3){
            for(i=search.length;i<4;i++){
                search.push({
                        description: "",
                        desctiption_image: "",
                        from: '',
                        id: '',
                        level: '',
                        name: "",
                        review: "",
                        review_image: "",
                        star_rating: "",
                        to: ''
                    });
            }
        }

    }

    const place_title = document.querySelector(".place h1");
    const place_desciption = document.querySelector(".place p");
    const place_image = document.querySelector(".place img")
    const cotnent = document.querySelector(".content")

    const info = document.querySelector(".info");
    const info_1 = document.querySelector(".info .info_1");
    const info_2 = document.querySelector(".info .info_2");
    const info_3 = document.querySelector(".info .info_3");

    if (selected[selected.length - 1][0].id == 0){
        place_title.innerText = "";
        place_desciption.innerText = "";
        place_image.style.visibility = "hidden";
    }else if (search.length > 1){
        place_title.innerText = search[0].name;
        place_desciption.innerText = search[0].description;
        place_image.setAttribute("src", search[0].desctiption_image);
        place_image.setAttribute("width", "100%");
        place_image.setAttribute("height","40%");
        place_image.setAttribute("alt", search[0].name);
        place_image.style.visibility = "visible";
        if (search[0].desctiption_image == ''){
            place_image.style.visibility = "hidden";
        }

        info_1.querySelector('h3').innerText = search[1].name;
        info_2.querySelector('h3').innerText = search[2].name;
        info_3.querySelector('h3').innerText = search[3].name;
        if(search[0].level == 1){
            info_1.querySelector('img').style.visibility = "hidden";
            info_2.querySelector('img').style.visibility = "hidden";
            info_3.querySelector('img').style.visibility = "hidden";
            info_1.querySelector('.first').innerText = "";
            info_2.querySelector('.first').innerText = "";
            info_3.querySelector('.first').innerText = "";
            info_1.querySelector('.second').innerText = "";
            info_2.querySelector('.second').innerText = "";
            info_3.querySelector('.second').innerText = "";
            if(search[3].desctiption_image == ''){
                info_3.querySelector('img').style.visibility = "hidden";
            }

        }
        else if(search[0].level == '2'){
            info_1.querySelector('img').setAttribute("src", search[1].desctiption_image);
            info_1.querySelector('img').setAttribute("width", "50px");
            info_1.querySelector('img').setAttribute("height","50px");
            info_1.querySelector('img').setAttribute("alt", search[1].name);
            info_1.querySelector('img').style.visibility = "visible";
            info_1.querySelector('p').innerText = search[1].description;

            info_2.querySelector('img').setAttribute("src", search[2].desctiption_image);
            info_2.querySelector('img').setAttribute("width", "50px");
            info_2.querySelector('img').setAttribute("height","50px");
            info_2.querySelector('img').setAttribute("alt", search[2].name);
            info_2.querySelector('img').style.visibility = "visible";
            info_2.querySelector('p').innerText = search[2].description;

            info_3.querySelector('img').setAttribute("src", search[3].desctiption_image);
            info_3.querySelector('img').setAttribute("width", "50px");
            info_3.querySelector('img').setAttribute("height","50px");
            info_3.querySelector('img').setAttribute("alt", search[3].name);
            info_3.querySelector('img').style.visibility = "visible";
            info_3.querySelector('p').innerText = search[3].description;
            if(search[3].desctiption_image == ''){
                info_3.querySelector('img').style.visibility = "hidden";
            }
        }
        else if(search[0].level == '3'){
            info_1.querySelector('img').setAttribute("src", search[1].review_image);
            info_1.querySelector('img').setAttribute("width", "50px");
            info_1.querySelector('img').setAttribute("height","50px");
            info_1.querySelector('img').setAttribute("alt", search[1].name);
            info_1.querySelector('img').style.visibility = "visible";
            info_1.querySelector('.first').innerText = search[1].star_rating;
            info_1.querySelector('.second').innerText = search[1].review;

            info_2.querySelector('img').setAttribute("src", search[2].review_image);
            info_2.querySelector('img').setAttribute("width", "50px");
            info_2.querySelector('img').setAttribute("height","50px");
            info_2.querySelector('img').setAttribute("alt", search[2].name);
            info_2.querySelector('img').style.visibility = "visible";
            info_2.querySelector('.first').innerText= search[2].star_rating;
            info_2.querySelector('.second').innerText = search[2].review;

            info_3.querySelector('img').setAttribute("src", search[3].review_image);
            info_3.querySelector('img').setAttribute("width", "50px");
            info_3.querySelector('img').setAttribute("height","50px");
            info_3.querySelector('img').setAttribute("alt", search[3].name);
            info_3.querySelector('img').style.visibility = "visible";
            info_3.querySelector('.first').innerText = search[3].star_rating;
            info_3.querySelector('.second').innerText = search[3].review;
            if(search[3].review_image == ''){
                info_3.querySelector('img').style.visibility = "hidden";
            }
        }
        else if(search[0].level == '4'){
            place_title.innerText = search[0].name;
            place_desciption.innerText = search[0].review;
            place_image.setAttribute("src", search[0].review_image);
            place_image.setAttribute("width", "100%");
            place_image.setAttribute("height","40%");
            place_image.setAttribute("alt", search[0].name);
            place_image.style.visibility = "visible";

            info_1.querySelector('img').style.visibility = "hidden";
            info_2.querySelector('img').style.visibility = "hidden";
            info_3.querySelector('img').style.visibility = "hidden";
            info_1.querySelector('.first').innerText = "";
            info_2.querySelector('.first').innerText = "";
            info_3.querySelector('.first').innerText = "";
            info_1.querySelector('.second').innerText = "";
            info_2.querySelector('.second').innerText = "";
            info_3.querySelector('.second').innerText = "";
            if(search[3].desctiption_image == ''){
                info_3.querySelector('img').style.visibility = "hidden";
            }
        }


    }else{

    }
    });

});