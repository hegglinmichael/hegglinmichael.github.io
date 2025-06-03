document.getElementById("svgMap").addEventListener("load", function () {
  const svgDoc = this.contentDocument;

  visited.forEach(code => {
    const country = svgDoc.getElementById(code);
    if (country) {
      country.style.fill = "#2e8b57"; // Green for visited
    }
  });

  wishlist.forEach(code => {
    const country = svgDoc.getElementById(code);
    if (country) {
      country.style.fill = "#f39c12"; // Orange for wishlist
    }
  });
});
