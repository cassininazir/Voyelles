   		var tpages = 1;
   		var cpage = 0;
   		
		$(document).ready(function(){
			var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
			//console.log(isiPad);
			if(isiPad == -1)
			{
    			$('audio').mediaelementplayer(/* Options */);
  			}
			
			$('#prevpage').hide();
			var popcorn = Popcorn("#audiotrack");	
			
			
			//hook up audio seek to page turns
			var audio = document.getElementsByTagName('audio');
			audio[0].addEventListener('seeked', doScrub, false);
			
			//setup prev + next page link
			initializePager();

			//generate popcorn code
			$('.page span').each(function(i){
				var start = $(this).attr('data-start');
				var end = $(this).attr('data-end');
				
				popcorn.code({
					start: start,
					end: end,
					onStart: function(options) {
						beginLine(i);
					},
					onEnd: function(options) {
						endLine();
					}
				});
			})
		});
		
		function initializePager() {	
			$('#prevpage').click(function(){
				if($('.page.inview').prev().length != 0){
					pageBackward();
					cueAudio();
				}
				return false;
			});
			
			$('#nextpage').click(function(){
				if($('.page.inview').next().length != 0){
					pageForward();
					cueAudio();
					
				}
				
				return false;
			});
		}
		
		function beginLine(num) {
			var $currentLine = $('#poem span:eq(' + num + ')');
			$currentLine.addClass('speaking');
			
		}
		
		function endLine() {
			var audio = document.getElementsByTagName('audio');
			
			if(audio[0].seeking === false){
				checkForNextPage();
			}

			$('#poem span').removeClass('speaking');
		}
		
		function checkForNextPage() {						
			$currentPage = $('.page.inview');
			$curline = $('span.speaking');
			var isThereAnotherPage = $('.page.inview').next().length;

			if($curline.is(':last-child') && isThereAnotherPage === 1) {			
				$currentPage.removeClass('inview');
				$currentPage.next().addClass('inview');
				managePages();
			}
			
		}

		function cueAudio() {
			var audio = document.getElementsByTagName('audio');
			audio[0].pause();
			
			$('#poem .page span').removeClass('speaking');
			var $firstLine = $('.page.inview span:first');
			var cueTime = $firstLine.attr('data-start');
			
			$firstLine.addClass('speaking');
			
			audio[0].currentTime = cueTime;
		}

		function doScrub() {
			var $speakingLine = $('.speaking');
			//if the highlighted line is not visible, that means the page should change
			if($speakingLine.length !== 0 && !$speakingLine.is(':visible')){
				$('#poem .page').removeClass('inview');
				$('span.speaking').parent().addClass('inview');
			}
			
			managePages();
		}

		// function managePages() {
		// 	//console.log("cpage " + cpage);
		// 	if ($('.page.inview').attr('id') == "0") {
		// 		$('#prevpage').hide();
		// 		$('#nextpage').show();
		// 	}
			
		// 	if ($('.page.inview').attr('id') == "1") {
		// 		$('#prevpage').show();
		// 		$('#nextpage').hide();
		// 	}
			
		// 	//console.log($('.page.inview').attr('id'));
		// }
		
		// function pageForward() {
		// 	cpage ++;
		// 	var $currentPage = $('.page.inview');
		// 	$currentPage.removeClass('inview');
		// 	$currentPage.next().addClass('inview');
		// 	managePages();
			
		// }
		
		// function pageBackward() {
		// 	cpage --;
		// 	var $currentPage = $('.page.inview');
		// 	$currentPage.removeClass('inview');
		// 	$currentPage.prev().addClass('inview');
		// 	managePages();
		// }
		
		// function setCurPage($currentPage) {
		// 	$('#poem .page').each(function(i){
		// 		if($(this).hasClass('inview')){
		// 			$currentPage = $(this);
		// 		}
		// 	});
			
		// 	return $currentPage;
			
		// }