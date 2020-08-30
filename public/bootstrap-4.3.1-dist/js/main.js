$(document).ready(function(){
    $('.delete-article').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/articles/'+id,
            success: function(response){
                alert('Deleting Article');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});


// Back to top button
// $(window).scroll(function() {
//     if ($(this).scrollTop() > 100) {
//       $('.back-to-top').fadeIn('slow');
//     } else {
//       $('.back-to-top').fadeOut('slow');
//     }
//   });

//   $('.back-to-top').click(function() {
//     $('html, body').animate({
//       scrollTop: 0
//     }, 1500, 'easeInOutExpo');
//     return false;
//   });

  // loader
	// var loader = function() {
	// 	setTimeout(function() { 
	// 		if($('#ftco-loader').length > 0) {
	// 			$('#ftco-loader').removeClass('show');
	// 		}
	// 	}, 1);
	// };
  // loader();
  
  // AOS.init({
  //   duration: 800,
  //   easing: 'slide'
  // });

// document.querySelector("body").addEventListener('mousemove', eyeball);
// function eyeball(){
//     var eye = document.querySelectorAll(".eye");
//     eye.forEach(function (eye){
//         let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
//         let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
//         let radian = Math.atan2(event.pageX - x, event.pageY - y);
//         let rot = (radian * (180 / Math.PI) * -1) + 270;
//         eye.style.transform = "rotate("+ rot + "deg)";
//     });
// };


// var like = document.getElementsById('like')
// like.addEventListener('click', function(){
//     var out = document.getElementsById('out')
//     out.style.visibility = 'hidden';
// });

// document.getElementsByClassName('fa-thumbs-up').addEventListener('click', function(){
//     document.getElementsByClassName('fa-thumbs-up').style.color = 'teal';
// });



// var commentOut = document.getElementById('commentOutPut');
// var comment = document.getElementById('comment');
// var btn = document.getElementById('btn');

// btn.addEventListener('click', () => {
//     commentOut.innerText = comment.value;
//     comment.value = '';
// })