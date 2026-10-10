/* ==========================================================================
   IFRAME RESIZE: tells Squarespace how tall this page is
   ==========================================================================
   Squarespace shows each page in a box (an iframe) with a fixed height,
   and a page inside a box can't resize the box. So this script keeps
   telling the Squarespace page how tall this page is, and a listener there
   sets the box to fit. The listener lives in Squarespace's code injection
   (Settings > Advanced > Code Injection > Footer); a copy is kept in
   tools/squarespace-height-listener.html. The Wheel, Wheel FAQ, and
   Pathways pages load it.

   A ResizeObserver on <body> catches every change (a color card opening,
   fonts loading late) without hooks elsewhere.

   The message carries only a height number, so it is sent to any page
   ("*"), which keeps it working if the site's address changes. Its
   `source` tag lets the listener ignore unrelated messages. The tag reads
   "climate-color-quiz" for historical reasons; the live listener checks
   for that exact tag, so change both together or neither.
   ========================================================================== */
(function () {
  function postHeight() {
    // Measures <body>, not <html>: the <html> element never reports less
    // than the box's current height, so the box could grow but never shrink
    // back for a shorter screen.
    var height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    window.parent.postMessage({ source: "climate-color-quiz", height: height }, "*");
  }

  // Send once now, again when everything has loaded, and a few more times
  // over the next second, in case the Squarespace listener wasn't ready for
  // the first message.
  postHeight();
  window.addEventListener("load", postHeight);
  [100, 300, 600, 1200].forEach(function (delay) {
    setTimeout(postHeight, delay);
  });

  if ("ResizeObserver" in window) {
    var ro = new ResizeObserver(function () {
      postHeight();
    });
    ro.observe(document.body);
  } else {
    // Older browsers without ResizeObserver: check on resize and every half
    // second instead.
    window.addEventListener("resize", postHeight);
    setInterval(postHeight, 500);
  }
})();