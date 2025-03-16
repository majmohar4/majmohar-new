const scrollUpIcon = document.getElementById("scroll-up");
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 200) {
    scrollUpIcon.classList.add("show");
  } else {
    scrollUpIcon.classList.remove("show");
  }
});

const titles = gsap.utils.toArray("p");

/* gsap.to('.nav-bar', {
  scrollTrigger: {
    trigger: '.nav-bar',
    start: 'top top',
    end: '1000%',
    markers: true,
    scrub: true,
    pin: '.nav-bar',
  },
  x: -100,
}); */

const t1 = gsap.timeline();
titles.slice(0, 4).forEach((title, i) => {
  const splitTitle = new SplitText(title);
  t1.from(
    splitTitle.chars,
    {
      opacity: 0,
      y: 50,
      rotateX: -90,
      duration: 1,
      stagger: 0.02,
    },
    "<"
  ).to(
    splitTitle.chars,
    {
      opacity: 0,
      duration: 1,
      y: -50,
      rotateX: 90,
      stagger: 0.02,
    },
    ">"
  );
});


const fifth = document.querySelectorAll("p")[4];
if (!fifth) {
  console.error("The fifth <p> element was not found.");
} else {
  const splitFifth = new SplitText(fifth);
  t1.from(
    splitFifth.chars,
    {
      opacity: 0,
      y: 50,
      rotateX: -90,
      duration: 1,
      stagger: 0.02,
    },
    "<"
  );
}
