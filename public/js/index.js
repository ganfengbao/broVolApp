//选项卡效果
function setTab(m, n) {
	var tli = document.getElementById("tt_" + m).getElementsByTagName("span");
	var mli = document.getElementById("mm_" + m).getElementsByTagName("ul");
	for (i = 0; i < tli.length; i++) {
		tli[i].className = i == n ? "hover": "";
		mli[i].style.display = i == n ? "block": "none";
	}
}
$(function(){
	var slideHtml = $('#bb-bookblock')[0].innerHTML;
	var hdHtml = '<div class="hd"><ul>';
	var count = $('[data-slide]').find('.bb-item').length;
	for (var i = 1; i <= count; i++) {
		if(i==1){
			hdHtml += '<li class="on">'+(i)+'</li>';
		}else{
			hdHtml += '<li>'+(i)+'</li>';
		}
	}
	hdHtml += '</ul></div>';
	slideHtml += hdHtml;
	slideHtml += '<a class="prev" href="javascript:void(0)"></a><a class="next" href="javascript:void(0)"></a>';

	jQuery("[data-slide]").html(slideHtml);

	var Page = (function() {
		var config = {
			$bookBlock : $( '[data-slide]' ),
			$navNext : $( '.next' ),
			$navPrev : $( '.prev' ),
			$navFirst : $( '.hd ul li:first-child' ),
			$navLast : $( '.hd ul li:last-child' )
		},
		init = function() {
			config.$bookBlock.bookblock( {
				speed : 800,
				shadowSides : 0.8,
				shadowFlip : 0.7,
				// autoplay: true,
				circular: true,
				onEndFlip: function(old, page, isLimit){
					$('.hd li:nth-child('+(page+1)+')').addClass('on').siblings('.on').removeClass('on');
					auto();
				}
			});
			initEvents();
		},
		initEvents = function() {
			var _this = this;
			var $slides = config.$bookBlock.children();
			config.$navNext.on('click touchstart',function(){
				config.$bookBlock.bookblock('next');
				return false;
			} );
			config.$navPrev.on('click touchstart',function(){
				config.$bookBlock.bookblock('prev');
				return false;
			} );
			config.$navFirst.on('click touchstart',function(){
				config.$bookBlock.bookblock('first');
				return false;
			} );
			config.$navLast.on('click touchstart',function(){
				config.$bookBlock.bookblock('last');
				return false;
			} );
			$slides.on( {
				'swipeleft' : function( event ) {
					config.$bookBlock.bookblock( 'next' );
					return false;
				},
				'swiperight' : function( event ) {
					config.$bookBlock.bookblock( 'prev' );
					return false;
				}
			} );
			$( document ).keydown( function(e) {
				var keyCode = e.keyCode || e.which,
				arrow = {
					left : 37,
					up : 38,
					right : 39,
					down : 40
				};
				switch (keyCode) {
					case arrow.left:
					config.$bookBlock.bookblock( 'prev' );
					break;
					case arrow.right:
					config.$bookBlock.bookblock( 'next' );
					break;
				}
			}).on('mouseenter','.hd li',function(){
				if($(this).hasClass('on')){
					return false;
				}
				$(this).addClass('on').siblings('.on').removeClass('on')
				config.$bookBlock.bookblock('jump',($(this).index()+1));
			});

			auto();
		},
		auto = function(){
			clearInterval(this.autoplay);
			this.autoplay = setInterval(function(){
				config.$bookBlock.bookblock( 'next' );
			},3000);
		};
		return { init : init };
	})();

	Page.init();

	if($('.singleBook .bookName').height() <= 35){
		$('.newArticle').removeClass('nodis');
	}else{
		$('.newArticle').addClass('nodis');
	}

	// 男生女生切换
	$(document).on('click mouseenter','[data-click]',function(){
		if($(this).hasClass('active')){
			return false;
		}
		var parClass = $(this).data('par');
		var comClass = $(this).data('com');
		$(this).addClass('active').siblings('.active').removeClass('active');
		var className = $(this).data('class');
		$(this).closest('.'+parClass).find('.'+comClass).addClass('nodis').siblings('.'+className).removeClass('nodis');
	}).on('mouseenter mouseleave','.contentBox .types ul.typelist li a',function(e){
		var $img = $(this).find('img');
		if(!$img.data('hoversrc')){
			var src = $img.prop('src');
			var hoverSrc = src.substring(0,src.indexOf('.png')) + '_active.png' + src.substring(src.substring(0,src.indexOf('.png')).length + 4);

			$img.data('hoversrc',hoverSrc).data('src',src);
		}

		if(e.type == 'mouseenter'){
			$img.attr('src',$img.data('hoversrc'));
		}else{
			$img.attr('src',$img.data('src'));
		}
	}).on('mouseenter mouseleave','.contentBox .types ul.typelist li a',function(e){
		var index = $(this).index();
		if(index == 0){
			return false;
		}
		if(e.type == 'mouseenter'){
			$(this).closest('li').find('a:nth-child('+(index+1)+')').addClass('noBefor');
		}else{
			$(this).closest('li').find('a:nth-child('+(index+1)+')').removeClass('noBefor');
		}
	}).on('mouseenter mouseleave','.recommendCon li:first-child',function(e){
		var $span = $(this).closest('.recommend').find('.title').find('span.active');
		if(e.type == 'mouseenter'){
			/*移入*/
			$span.addClass('active1');
		}else{
			/*移出*/
			$span.removeClass('active1');
		}
	}).on('click','.contentBox .books .sexBox .changeBox .bookInfo,.dszq .books li,.nanshengzhuanqu .books li .book,.nvshengzhuanqu .books li .book',function(e){
		if(e.target.tagName.toLowerCase() != 'a'){
			e.stopPropagation();
			var $a = $($(this).find('a')[0]);
			var url = $a.prop('href');
			var tar = $a.prop('target').toLowerCase();
			if(tar == '_blank'){
				window.open(url);
			}else{
				window.location.href = url;
			}
			return false;
		}
	});
});