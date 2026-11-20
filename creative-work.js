const projectDialog =
  document.querySelector(".creative-dialog");

const projectTitle =
  document.querySelector("#creative-project-title");

const projectCopy =
  document.querySelector(".creative-process-copy");

const projectSlides =
  document.querySelector(".creative-slides");

const slideStatus =
  document.querySelector(".creative-slide-status");

const slideControls =
  document.querySelector(".creative-carousel-controls");

let activeSlide = 0;


function showSlide(index) {
  const slides = projectSlides.children;

  activeSlide =
    (index + slides.length) %
    slides.length;

  Array.from(slides).forEach((slide, position) => {
    slide.hidden =
      position !== activeSlide;

    if (slide.hidden) {
      slide
        .querySelector("video")
        ?.pause();
    }
  });

  const caption =
    slides[activeSlide]
      .querySelector("figcaption")
      .textContent;

  slideStatus.textContent =
    `${activeSlide + 1} / ${slides.length} · ${caption}`;
}


document
  .querySelectorAll(".creative-tile")
  .forEach((tile) => {
    tile.addEventListener("click", () => {
      const project =
        document
          .getElementById(tile.dataset.project)
          .content
          .cloneNode(true);

      projectTitle.textContent =
        tile
          .querySelector(".creative-tile-title")
          .textContent;

      projectCopy.replaceChildren(
        project.querySelector(".project-notes")
      );

      projectSlides.replaceChildren(
        ...project.querySelectorAll("figure")
      );

      slideControls
        .querySelectorAll("button")
        .forEach((button) => {
          button.hidden =
            projectSlides.children.length < 2;
        });

      showSlide(0);

      projectDialog.showModal();

      projectDialog
        .querySelector(".creative-detail")
        .scrollTop = 0;
    });
  });


slideControls
  .querySelectorAll("[data-direction]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      showSlide(
        activeSlide +
        Number(button.dataset.direction)
      );
    });
  });


projectDialog.addEventListener("keydown", (event) => {
  const direction = {
    ArrowLeft: -1,
    ArrowRight: 1
  }[event.key];

  if (
    direction &&
    !event.target.closest("video")
  ) {
    event.preventDefault();

    showSlide(
      activeSlide +
      direction
    );
  }
});


projectDialog.addEventListener("close", () => {
  projectSlides
    .querySelectorAll("video")
    .forEach((video) => {
      video.pause();
    });
});


projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});
