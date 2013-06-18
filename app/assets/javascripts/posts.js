$(function(){
  setInterval(function nearBottom() {
    if (nearBottomOfPage()) {
      loadNextPage();
    }
  }, 250);
}); 

var page_number = 2;
function loadNextPage() {
  $.ajax({
    url: '/ajax/posts?page=' + page_number,
    success: function(response) {
      page_number += 1;
      $('.blog').append(response);
    }
  })
}

function nearBottomOfPage() {
  return scrollDistanceFromBottom() < 150;
}

function scrollDistanceFromBottom() {
  return pageHeight() - (window.pageYOffset + self.innerHeight);
}

function pageHeight() {
  return Math.max(document.body.scrollHeight, document.body.offsetHeight);
}
