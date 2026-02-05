import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  batch?: boolean;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      delay = 0,
      duration = 0.8,
      y = 30,
      stagger = 0,
      batch = false,
    } = options;

    const ctx = gsap.context(() => {
      if (batch && stagger > 0) {
        // Aggiungi classe CSS ai children
        Array.from(element.children).forEach((child) => {
          child.classList.add("gsap-reveal");
        });

        ScrollTrigger.batch(element.children as any, {
          onEnter: (elements) => {
            gsap.to(elements, {  // ← Cambiato da "from" a "to"!
              opacity: 1,
              y: 0,
              duration: duration,
              stagger: stagger,
              ease: "power2.out",
            });
          },
          start: "top 90%",
          once: true,
        });
      } else {
        const targets = stagger > 0 ? element.children : element;
        
        // Aggiungi classe CSS
        if (targets instanceof HTMLElement) {
          targets.classList.add("gsap-reveal");
        } else {
          Array.from(targets as HTMLCollection).forEach((child) => {
            child.classList.add("gsap-reveal");
          });
        }

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [options.delay, options.duration, options.y, options.stagger, options.batch]);

  return ref;
}



// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface ScrollRevealOptions {
//   delay?: number;
//   duration?: number;
//   y?: number;
//   stagger?: number;
//   batch?: boolean; // ← Nuovo parametro!
// }

// export function useScrollReveal(options: ScrollRevealOptions = {}) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const {
//       delay = 0,
//       duration = 0.8,
//       y = 30,
//       stagger = 0,
//       batch = false, // ← Default false
//     } = options;

//     const ctx = gsap.context(() => {
//       if (batch && stagger > 0) {
//         // Batch mode: Ogni child ha il suo ScrollTrigger!
//         ScrollTrigger.batch(element.children as any, {
//           onEnter: (elements) => {
//             gsap.from(elements, {
//               opacity: 0,
//               y: y,
//               duration: duration,
//               stagger: stagger,
//               ease: "power2.out",
//             });
//           },
//           start: "top 90%",
//           once: true,
//         });
//       } else {
//         // Normal mode: Anima tutto insieme
//         const targets = stagger > 0 ? element.children : element;
//         gsap.from(targets, {
//           opacity: 0,
//           y: y,
//           duration: duration,
//           delay: delay,
//           stagger: stagger,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: element,
//             start: "top 90%",
//             toggleActions: "play none none none",
//           },
//         });
//       }
//     });

//     return () => ctx.revert();
//   }, [options.delay, options.duration, options.y, options.stagger, options.batch]);

//   return ref;
// }


// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // Register plugin
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// interface ScrollRevealOptions {
//   delay?: number;
//   duration?: number;
//   y?: number;
//   stagger?: number;
// }

// export function useScrollReveal(options: ScrollRevealOptions = {}) {
//   const ref = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const element = ref.current;
//     if (!element) return;

//     const {
//       delay = 0,
//       duration = 0.8,
//       y = 30,
//       stagger = 0,
//     } = options;

//     const ctx = gsap.context(() => {
//       // Se è un container con children, anima i children con stagger
//       const targets = stagger > 0 ? element.children : element;

//       gsap.from(targets, {
//         opacity: 0,
//         y: y,
//         duration: duration,
//         delay: delay,
//         stagger: stagger,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: element,
//           start: "top 90%",
//           end: "bottom 20%",
//           toggleActions: "play none none none",
//           markers: true,        // ← For debug!
//         },
//       });
//     });

//     return () => ctx.revert();
//   }, [options.delay, options.duration, options.y, options.stagger]);

//   return ref;
// }