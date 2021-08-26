import { gsap } from "gsap";

export const animationsMixin = {
  mounted() {
    gsap.from(".product-card", {
      duration: 1,
      opacity: 0,
      y: 200,
      ease: "power1",
      stagger: {
        each: 0.2,
      },
    });
    gsap.from(".page-title", {
      duration: 1,
      opacity: 0,
      x: 500,
      ease: "back",
      stagger: {
        each: 0.25,
      },
    });
    gsap.from(".page-content", {
      duration: 1.5,
      opacity: 0,
      ease: "sine",
      stagger: {
        each: 0.25,
      },
    });
  },
};
