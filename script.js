// Select the mobile menu button
const menuButton = document.querySelector(".menu-button");

// Select the navigation menu
const navigation = document.querySelector(".site-nav");

// Select every navigation link
const navigationLinks = document.querySelectorAll(".site-nav a");


// Mobile navigation menu
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });


  // Close the menu after clicking a link
  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });
}


// GIF loading and fallback message
const gif = document.querySelector(".gif-frame img");

const fallback = document.querySelector(".gif-fallback");

if (gif && fallback) {
  // Hide the fallback message when the GIF loads
  gif.addEventListener("load", () => {
    fallback.hidden = true;
  });


  // Show the fallback message if the GIF cannot load
  gif.addEventListener("error", () => {
    gif.hidden = true;

    fallback.hidden = false;
  });
}
