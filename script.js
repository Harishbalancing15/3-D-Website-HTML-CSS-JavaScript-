function loco() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco();

var clutter = "";

document.querySelector("#page2>h1").textContent.split(" ").forEach(function(dets){
  clutter += `<span> ${dets} </span>`

  document.querySelector("#page2>h1").innerHTML = clutter;
})


gsap.to("#page2>h1>span",{
  ScrollTrigger:{
    trigger: `#page2>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller:`main`,
    scrub: .5,
    markers: true,
  },
  stagger: .2,
  color: `white`

})



function canvas(){
const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
  ../components/frames00007.png
  ../components/frames00010.png
  ../components/frames00013.png
  ../components/frames00016.png
  ../components/frames00019.png
  ../components/frames00022.png
  ../components/frames00025.png
  ../components/frames00028.png
  ../components/frames00031.png
  ../components/frames00034.png
  ../components/frames00037.png
  ../components/frames00040.png
  ../components/frames00043.png
  ../components/frames00046.png
  ../components/frames00049.png
  ../components/frames00052.png
  ../components/frames00055.png
  ../components/frames00058.png
  ../components/frames00061.png
  ../components/frames00064.png
  ../components/frames00067.png
  ../components/frames00070.png
  ../components/frames00073.png
  ../components/frames00076.png
  ../components/frames00079.png
  ../components/frames00082.png
  ../components/frames00085.png
  ../components/frames00088.png
  ../components/frames00091.png
  ../components/frames00094.png
  ../components/frames00097.png
  ../components/frames00100.png
  ../components/frames00103.png
  ../components/frames00106.png
  ../components/frames00109.png
  ../components/frames00112.png
  ../components/frames00115.png
  ../components/frames00118.png
  ../components/frames00121.png
  ../components/frames00124.png
  ../components/frames00127.png
  ../components/frames00130.png
  ../components/frames00133.png
  ../components/frames00136.png
  ../components/frames00139.png
  ../components/frames00142.png
  ../components/frames00145.png
  ../components/frames00148.png
  ../components/frames00151.png
  ../components/frames00154.png
  ../components/frames00157.png
  ../components/frames00160.png
  ../components/frames00163.png
  ../components/frames00166.png
  ../components/frames00169.png
  ../components/frames00172.png
  ../components/frames00175.png
  ../components/frames00178.png
  ../components/frames00181.png
  ../components/frames00184.png
  ../components/frames00187.png
  ../components/frames00190.png
  ../components/frames00193.png
  ../components/frames00196.png
  ../components/frames00199.png
  ../components/frames00202.png
  `
  ;
  return data.split("\n")[index];
}

const frameCount = 66;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page3`,
    start: `top top`,
    end: `250% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page3",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `250% top`,
});
}
canvas()