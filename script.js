function locom() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function cursor() {
  var cursor = document.querySelector(".cursor");
  var cursorinner = document.querySelector(".cursor2");
  var a = document.querySelectorAll("a");

  document.addEventListener("mousemove", function (e) {
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    cursorinner.style.left = e.clientX + "px";
    cursorinner.style.top = e.clientY + "px";
  });

  document.addEventListener("mousedown", function () {
    cursor.classList.add("click");
    cursorinner.classList.add("cursorinnerhover");
  });

  document.addEventListener("mouseup", function () {
    cursor.classList.remove("click");
    cursorinner.classList.remove("cursorinnerhover");
  });

  a.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
}

function menuToggle(){
    let menubtn = document.querySelector(".menuBtn");
    let openMenu = document.querySelector(".openMenu");
    let plusImg = document.querySelector(".plusImg");

    let cursor = document.querySelector(".cursor");
    let cursor2 = document.querySelector(".cursor2");
    let flag = 0;

    menubtn.addEventListener("mouseover", function(){
      cursor.style.height = "65px";
      cursor.style.width = "65px";
      cursor2.style.scale = "0";
    })
    menubtn.addEventListener("mouseleave", function(){
      cursor.style.height = "30px";
      cursor.style.width = "30px";
      cursor2.style.scale = "1";
    })

    menubtn.addEventListener("click",function(){
        if(flag == 0){
            gsap.to(openMenu, {
                height: "100%",
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    menuTextAnimation();
                }
            });
            menubtn.innerText = "Close";
            gsap.to(plusImg, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    plusImg.style.display = "none";
                }
            });
            flag = 1;
        }
        else{
            gsap.to(openMenu, {
                height: "0%", 
                duration: 0.5,
                ease: "power2.inOut"
            });
            menubtn.innerText = "Menu";
            plusImg.style.display = "block";
            gsap.to(plusImg, {
                opacity: 0.7,
                duration: 0.3
            });
            flag = 0;
        }
    })
}

function menuTextAnimation(){
    let tl = gsap.timeline();

    tl.to(".leftTop h1",{
        transform: "translateY(0%)",
        duration: 0.4,
        ease: "power2.inOut",
        stagger: 0.2,
        scrub: 2,
        opacity: 1,
    })
    tl.to(".linkDiv",{
        transform: "translateY(0%)",
        duration: 0.1,
        ease: "power2.inOut",
        stagger: 0.1,
        scrub: 1,
        opacity: 1,
    })
    tl.to(".videoTxt",{
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.1,
        scrub: 1,
        opacity: 1,
    })
}

function page2Video(){
  let page2VideoDiv = document.querySelector(".page2VideoDiv");
  let plusImg = document.querySelector(".plusImg");

  gsap.to(".page2VideoDiv", {
    scrollTrigger: {
      trigger: ".page2",
      scroller: "main",
      // markers: true,
      start: "top 90%", 
      end: "top 5%",
      scrub: 2,
      ease: "power2.inOut"
    },
    onUpdate: () => {
      if(page2VideoDiv.getBoundingClientRect().top < plusImg.getBoundingClientRect().top){
        plusImg.style.opacity = 0;
      }
      else{
        plusImg.style.opacity = 0.2;
      }
    },
    scale: 1.4,
    transformOrigin: "left 0%",
    duration: 0.2,
    ease: "power2.inOut"
  });
  gsap.set(".page2VideoDiv", {
    scale: 1,
    transformOrigin: "left 0%"
  });

  gsap.to(".page2VideoDiv", {
    duration: 1.5,
    ease: "power2.inOut",
    scale: 1,
    transformOrigin: "left 0%"
  });
  
  gsap.to(".page2",{
    scrollTrigger: {
      trigger: ".page3",
      scroller: "main",
      start: "top 2%",
      end: "top 90%",
      scrub: 1,
    },
    onUpdate: () => {
      if(page2VideoDiv.getBoundingClientRect().top < plusImg.getBoundingClientRect().top){
        plusImg.style.opacity = 0.2;
      }
    }
  })
}


function allAnimations(){
  let tl2 = gsap.timeline();

    tl2.to("nav",{
      transform: "translateY(0%)",
      duration: 0.4,
      ease: "power2.inOut",
      opacity: 1,
      scrub: 1,
    })
    tl2.to(".page1Text h1",{
      transform: "translateY(0%)",
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.2,
      scrub: 2,
      opacity: 1,
    }),
    tl2.to(".page1SmallText h2",{
      transform: "translateY(0%)",
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.2,
      scrub: 2,
      opacity: 1,
    })
    tl2.to(".container",{
      transform: "translateY(0%)",
      opacity: 1,
    })
    
    tl2.to(".page2VideoDiv",{
      transform: "translateY(0%)",
      opacity: 1,
    })

    tl2.to(".page3TextContent h1",{
      scrollTrigger: {
        trigger: ".page3",
        scroller: "main",
        start: "top 50%",
        end: "top 40%",
        scrub: 1,        
      },
      transform: "translateY(0%)",
      opacity: 1, 
    })

    tl2.to(".page4Cont",{
      scrollTrigger: {
        trigger: ".page4",
        scroller: "main",
        start: "top 80%",
        end: "top 70%",
        scrub: 1,      
        // markers: true,  
      },
      transform: "translateY(0%)",
      opacity: 1, 
    })


}




Shery.makeMagnet(".magnet-target");


locom();
cursor();
menuToggle();
allAnimations();
page2Video();
