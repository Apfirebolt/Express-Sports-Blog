// Adding AOS
window.addEventListener("load", () => {
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Add lightbox for post images
  const imageLightbox = GLightbox({
    selector: ".image-lightbox",
  });

  imageLightbox.on("open", () => {
    // console.log("Initiated");
  });
});
