/// <reference types="../@types/jquery" />
"use strict";
// ======= global =======
const sideNav = $("#main-sidenav");
const headerContent = $("#home .header-content");
const sideNavWidth = "300px";
const eventDate = new Date(2024, 6, 26, 14, 0, 0, 0);
const messageCounter = $("#messageCounter span");
// ======= events =======
$(".header-btn").on("click", () => {
  if (sideNav.outerWidth(true) < parseInt(sideNavWidth)) {
    openSideNav();
  }
});

$("#main-sidenav ul li a").on("click", (anchor) => {
  const anchorHref = $(anchor.target).attr("href");
  const sectionLocation = $(anchorHref).offset().top;

  $("body,html").animate({ scrollTop: sectionLocation }, 1500);
});

$("#closeNavBtn").on("click", () => {
  closeSideNav();
});

$("#accordionSection .accordion-title").on("click", (element) => {
  $("#accordionSection .accordion-text").slideUp(1000);
  $(element.target).next(".accordion-text").stop().slideToggle(1000);
});

const countdown = setInterval(() => {
  countEventTime(eventDate);
}, 1000);

$("#messageInput").on("input", (element) => {
  countAriaInput(element);
});
// ======= functions =======
function countAriaInput(element) {
  const ariaLength = $(element.target).val().length;
  const ariaLimit = 100 - ariaLength;
  messageCounter.text(
    ariaLimit > 0 ? ariaLimit : "your available character finished"
  );
}
function openSideNav() {
  sideNav.animate({ width: sideNavWidth });
  headerContent.animate({ paddingLeft: `+=${sideNavWidth}` });
}
function closeSideNav() {
  sideNav.animate({ width: "0" });
  headerContent.animate({ paddingLeft: `-=${sideNavWidth}` });
}
function countEventTime(eventDate) {
  const currentTime = new Date();
  const timeToEvent = eventDate - currentTime;
  if (timeToEvent > 0) {
    const days = Math.floor(timeToEvent / (1000 * 60 * 60 * 24));
    const hours = 24 - currentTime.getHours();
    const minutes = 60 - currentTime.getMinutes();
    const seconds = 60 - currentTime.getSeconds();

    $("#countDay").text(`${days} D`);
    $("#countHours").text(`${hours} H`);
    $("#countMinuets").text(`${minutes} M`);
    $("#countSeconds").text(`${seconds} S`);
  } else {
    clearInterval(countdown);
    $(".countdown-container .row").remove();
    $(".countdown-container").html(
      '<h2 class="text-center text-white h1">event start</h2>'
    );
  }
}