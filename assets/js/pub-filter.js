// Topic filter for the publication list on /research/.
// Each .pub has data-chips="id id ..."; each chip button has data-chip="id".
// The selected chip is kept in the URL hash so a filtered view can be linked,
// e.g. /research/#ai-safety.
(function () {
  var bar = document.querySelector(".pub-filter");
  if (!bar) return;
  var status = document.querySelector(".pub-filter__status");
  var chips = Array.prototype.slice.call(bar.querySelectorAll(".pub-filter__chip"));
  var pubs = Array.prototype.slice.call(document.querySelectorAll(".pub"));

  function chipsOf(pub) {
    return (pub.getAttribute("data-chips") || "").split(/\s+/).filter(Boolean);
  }
  function matches(pub, id) {
    return id === "all" || chipsOf(pub).indexOf(id) !== -1;
  }

  // Show how many papers each chip selects; hide chips that select none.
  chips.forEach(function (chip) {
    var id = chip.getAttribute("data-chip");
    var n = pubs.filter(function (p) { return matches(p, id); }).length;
    chip.querySelector(".pub-filter__count").textContent = n;
    if (n === 0) chip.hidden = true;
  });

  function select(id, updateHash) {
    var chip = chips.filter(function (c) {
      return c.getAttribute("data-chip") === id && !c.hidden;
    })[0];
    if (!chip) { id = "all"; }
    chips.forEach(function (c) {
      c.setAttribute("aria-pressed", c.getAttribute("data-chip") === id ? "true" : "false");
    });
    var shown = 0;
    pubs.forEach(function (p) {
      p.hidden = !matches(p, id);
      if (!p.hidden) shown++;
    });
    status.textContent = id === "all" ? "" :
      "Showing " + shown + " of " + pubs.length + " papers tagged " + chip.textContent.replace(/\s*\d+\s*$/, "") + ".";
    if (updateHash) {
      var url = location.pathname + location.search + (id === "all" ? "" : "#" + id);
      history.replaceState(null, "", url);
    }
  }

  bar.addEventListener("click", function (e) {
    var chip = e.target.closest(".pub-filter__chip");
    if (chip) select(chip.getAttribute("data-chip"), true);
  });

  function fromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var known = chips.some(function (c) { return c.getAttribute("data-chip") === id; });
    // An empty or unrelated hash (e.g. after pressing Back) means no filter.
    select(known ? id : "all", false);
    if (known) bar.scrollIntoView();
  }
  window.addEventListener("hashchange", fromHash);

  bar.hidden = false;
  fromHash();
})();
