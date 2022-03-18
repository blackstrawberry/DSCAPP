$('header').load('inc.html header > div', function(){
    // header-burger메뉴 토글
    const button =()=>{
        const burger = document.querySelector('.burger');
        const head = document.querySelector('.head');
        const bgFix = document.querySelector('.bg_fix');
        burger.addEventListener('click', ()=> { 
            burger.classList.toggle('toggle');
            head.classList.toggle('toggle');
            bgFix.classList.toggle('toggle');
        });
        mynetwork.addEventListener('click', ()=> { 
            burger.classList.add('toggle');
            head.classList.add('toggle');
            bgFix.classList.add('toggle');
        });

    };
    button();

    var swiper = new Swiper(".mySwiper", {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
})
//header inc



//footer inc
$('footer').load('inc.html footer > div ',function(){
})
//footer inc
