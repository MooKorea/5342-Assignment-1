import anime from "animejs";

export function body1() {
  const slides = document.querySelectorAll(".slideshow > div");

  let mql = window.matchMedia("(max-width: 950px)");
  let xOffset, yOffset;
  setInterval(change, 3000);

  function handleMediaQuery() {
    if (mql.matches) {
      xOffset = 0;
      yOffset = 0;
      setSlideStyle();
    } else {
      xOffset = 50;
      yOffset = 30;
      setSlideStyle();
    }
  }

  function setSlideStyle() {
    for (let i = 0; i < slides.length; i++) {
      const reverse = slides.length - i;
      slides[i].style.transform = `translateX(${-reverse * xOffset}px) translateY(${
        reverse * yOffset
      }px)`;
      slides[i].style.zIndex = i;
      slides[i].style.opacity = `${i / (slides.length - 1)}`;
    }
  }

  function change() {
    for (let i = 0; i < slides.length; i++) {
      handleAnimaion(slides[i], slides.length);
    }
  }

  mql.addEventListener("change", handleMediaQuery);
  document.onload = handleMediaQuery();

  function handleAnimaion(slide, length) {
    const getOpacity = window.getComputedStyle(slide).getPropertyValue("opacity")
    const isReset = parseInt(getOpacity) >= 1

    const zIndex = parseInt(window.getComputedStyle(slide).getPropertyValue("z-index"));
    anime({
      targets: slide,
      translateX: isReset
        ? [{ value: `+=${xOffset}px` }, { value: `-=${length * xOffset}px` }]
        : `+=${xOffset}px`,
      translateY: isReset
        ? [{ value: `-=${yOffset}px` }, { value: `+=${length * yOffset}px` }]
        : `-=${yOffset}px`,
      opacity: {
        value: isReset ? 0 : `+=${1 / (length - 1)}`,
        easing: "linear",
        duration: 300,
      },
      duration: 1500,
      delay: (length - zIndex) * 50,
      complete: () => {
        anime({
          targets: slide,
          zIndex: isReset ? 0 : "+=1",
          duration: 0,
        });
      },
    });
  }
}

