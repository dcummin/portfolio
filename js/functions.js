//Contact form built with ajax
$("form").submit(function(evt){
  evt.preventDefault();
  var url = $(this).attr("action");
  var formData = $(this).serialize();
  $.post(url, formData, function(response){
    $("#messageSent").html("<p>Thank you! Your message has been sent!</p>");
    $(".submit").disabled = true;
    $(".submit").addClass("submitClick").removeClass("submitNoClick");

  }); //end post
}); //end submit


// Cache selectors
var lastId,
    topMenu = $(".navcontainer"),
    topMenuHeight = topMenu.outerHeight(),
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu iztems
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").addClass("active").siblings().removeClass("active");
   }
}); //Nav chnages based on the position scroll of the page


$(document).ready(function () {
    checkHeaderStatus()
    $(window).scroll(function () {
        checkHeaderStatus()
    });
});

function checkHeaderStatus() {
    var navbar = $(".navcontainer");
    var scrollPosition = $(window).scrollTop();
    if (scrollPosition === 0){
        navbar.css({"background-color": "rgba(32, 52, 74, 0", "box-shadow": "none"});
    } else {
        navbar.css({"background-color": "rgba(32, 52, 74, 1", "box-shadow": "1px 1px 3px #000"});
    }
} // Navbar will chnage colors on scroll


$(".headline_text_button").hover(function() {
    $(".rotate").toggleClass("down");
}) // toggle arrow icon when hover over "View Work" headline_button


$(".dropdownMenuMobile").click(function(){
  $(".navLinksMobile").slideToggle();
})
