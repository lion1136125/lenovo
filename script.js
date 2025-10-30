document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("serviceForm");
  const popup = document.getElementById("submitSuccess");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (popup) {
        popup.style.display = "block";
        setTimeout(() => { popup.style.display = "none"; }, 5000);
      }
      form.reset();
    });
  }
});

// Desktop: disable tel: links so they do nothing on PC
(function(){
  function disableTelOnDesktop(){
    if (window.matchMedia && window.matchMedia('(min-width: 960px)').matches){
      document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
        a.addEventListener('click', function(e){ e.preventDefault(); }, { passive:false });
        a.style.cursor = 'default';
      });
    }
  }
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', disableTelOnDesktop);
  } else {
    disableTelOnDesktop();
  }
  window.addEventListener('resize', disableTelOnDesktop);
})();
