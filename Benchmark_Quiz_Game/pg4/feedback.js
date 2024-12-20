let stars = document.querySelectorAll(".imgStar");
stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    stars.forEach((newStar, i) => {
      if (i <= index) {
        newStar.classList.add("active");
      } else {
        newStar.classList.remove("active");
      }
    });
  });
});
