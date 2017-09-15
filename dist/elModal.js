/**
 * elModal.js
 *
 * Plugin jQuery for creating a simple modal with some types and templates.
 *
 * Usage :
 * $('button').elmahbubModal({ options });
 *
 * License : MIT
 * Author  : Habib mahbub (El-Mahbub) @elmahbub14021993@gmail.com , Pasuruan - East java - Indonesia.
 * Version : 1.0 .
 * Created : 2017-09-19.
 *
 */

if (typeof jQuery === 'undefined') {
  throw new Error('elModal.js requires jQuery');
}

+function ($) {

	var setting,
	elmahbub,
	template,
	template_viewer,
	indexSlide,
	files,
	captions,
	contents,
	thumbnails,
	img_loading,
	playing;
	
	$.fn.elModal = function(opt){												// Prototype plugin
		elmahbub = $.extend({													// Options plugin
		type : 'normal',														// Type modal : 'normal', 'viewer', 'gallery', 'iframe', 'normal and iframe'. Default : 'normal'. 
		size : 'small',															// Size modal : 'small', 'medium', 'large', 'fullscreen'. Default : 'small'.
		autoClose : true, 														// Option auto close modal
		timeOut : 240000, 														// 3 minutes for auto close -> default.
		escapeClose : true, 													// Close modal with escape key
		outsideClose : false,													// Close modal with click outside modal
		templates : '', 														// Default template
		idTarget : '',
		styles : {																// Styling template
			backgroundModal : 'transparent',
			backgroundContent : '#fff',
			colorContent : '#000',
			borderRadius : '0',
			border: '0',
			zIndexModal : '1065',
			zIndexContent : '1065',
			heightContent : '',
			widthContent : ''
		},
		items : {																						// Items modal normal. It also for normal + iframe instead
			close : '&times;',
			header : 'Title modal',																		// Content header modal normal
			content : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'+		// Content body modal normal
				'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+
				'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'+
				'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'+
				'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non'+
				'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			footer : 'Finish',																			// Content footer modal normal
			sourceIframe : ''																			// Source for modal iframe
		},
		itemsViewer : {																					// Items modal viewer and gallery
			close : '&times;',
			typeFile : 'image',																			// Type file modal viewer : 'image', 'video'. Default : 'image'.
			arrowLeft : '&#10094;',																		// Icon arrow left
			arrowRight : '&#10095;',																	// Icon arrow right
			toggleFullscreen : '&#8599;',																// Icon toggle fullscreen
			playSlideShow : '&#9654;',																	// Icon play slideshow
			stopSlideShow : '&#9725;',																	// Icon stop slideshow
			captions : '<p style="margin-left:10px">Lorem ipsum dolor sit amet.</p>',					// Captions files modal viewer and gallery
			files : '',																					// Target files modal viewer and gallery.
			attributes : '',																			// Attributes files. (ex: controls,loop,autobuffer,autoloop etc for video).
			contents : '<p style="margin:10px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'+		// Content right side (user side) from modal viewer
				'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'+
				'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'+
				'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'+
				'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non'+
				'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
		},
		titleButtons : {																				// Title buttons
			closeModal : 'Close',
			prevSlide : 'Previous',
			nextSlide : 'Next',
			playSlide : 'Play slideshow',
			stopSlide : 'Stop slideshow',
			toggleFullscreen : 'Fullscreen mode'
		},
		thumbnailsEnabled : false,																		// Option enabled and disabled thumbnails.
		setPosition : 'C', 																				// Options modal normal position, TL : Top left, TR : Top right, BL : Bottom left, BR : Bottom right, C : Center. Default : C.
		slideShow : false,																				// Option for slide show. Default : false.
		timeSlideShow : 2000,																			// Time repeat slide show.
		arrowKeyboard : true,																			// Option arrow keyboard for slideshow.
		speed: 'fast', 																					// Speed for show and hide modal. Default : fast.
		fullscreenMode : true,																			// Fullscreen mode for modal viewer and gallery. Default : false.
		targetFullscreen : 'data-elmahbub-fullscreen',
		textError : 'Sorry, could not be loaded'
	},opt);
console.log(elmahbub.items.sourceIframe);
	var _self, arrowLeft = elmahbub.itemsViewer.arrowLeft, arrowRight = elmahbub.itemsViewer.arrowRight,toggleFullscreen = elmahbub.itemsViewer.toggleFullscreen, playSlideShow = elmahbub.itemsViewer.playSlideShow, stopSlideShow = elmahbub.itemsViewer.stopSlideShow;
	typeof(arrowLeft) === 'undefined' ? elmahbub.itemsViewer.arrowLeft = '&#10094;' : typeof(arrowRight) === 'undefined' ? elmahbub.itemsViewer.arrowRight = '&#10095;' : typeof(toggleFullscreen) === 'undefined' ? elmahbub.itemsViewer.toggleFullscreen ='&#10096;' : typeof(playSlideShow) === 'undefined' ? elmahbub.itemsViewer.playSlideShow = '&#9654;' : typeof(stopSlideShow) === 'undefined' ? elmahbub.itemsViewer.stopSlideShow = '&#9725;' : '' ;
	template = $('<div class="elmahbub-modal" id="'+elmahbub.idTarget+'">'+															// Base template
	'<button type="button" class="elmahbub-btn-close" title="'+elmahbub.titleButtons.closeModal+'">'+elmahbub.items.close+'</button>'+
		'<div class="elmahbub-modal-small" tabindex="-1">'+
			'<div class="elmahbub-modal-content">'+
			'<div class="elmahbub-modal-header">'+
			elmahbub.items.header+
			'</div>'+
			'<div class="elmahbub-modal-body">'+
				elmahbub.items.content+
			'</div>'+
			'<div class="elmahbub-modal-footer">'+
			elmahbub.items.footer+
			'</div>'+
			'</div>'+
		'</div>'+
	'</div>');
	template_viewer = $('<div class="elmahbub-modal-viewer" tabindex="-1">'+
			'<div class="elmahbub-viewer-left">'+
			'<button type="button" class="elmahbub-arrow-left" title="'+elmahbub.titleButtons.prevSlide+'">'+elmahbub.itemsViewer.arrowLeft+'</button>'+
			'<button type="button" class="elmahbub-arrow-right" title="'+elmahbub.titleButtons.nextSlide+'">'+elmahbub.itemsViewer.arrowRight+'</button>'+
			'<button type="button" class="elmahbub-button-fullscreen" title="'+elmahbub.titleButtons.toggleFullscreen+'">'+elmahbub.itemsViewer.toggleFullscreen+'</button>'+
				'<div class="elmahbub-viewer-slide">'+
					'<div class="elmahbub-viewer-caption">'+
					
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="elmahbub-viewer-right">'+
			elmahbub.itemsViewer.contents+
			'</div>'+
		'</div>');
	img_loading = '<img src="loading.gif" style="width:35px; height:auto; margin:auto" />';
	indexSlide = 1;
	files = $(elmahbub.itemsViewer.files).clone();
	captions = elmahbub.itemsViewer.captions;
	contents = elmahbub.itemsViewer.contents;
	thumbnails = $(elmahbub.itemsViewer.files).clone();
	_self = this;
	return _self.each(function(index, el) {
		try {
			$.elModal(_self);
		} catch(e) {
			console.log(e);
		}
	});
	}
	$.elModal = function(elm){
		$.mahbub = {
			init : function () {
				setting = elmahbub;
				var new_template;
				switch (setting.type) {
				case 'normal':
					new_template = $.mahbub._style(template.replaceWith(template),setting.size);
					setting.templates = new_template;
					break;
				case 'viewer':
					$.mahbub._slideShow(indexSlide,files,captions,contents);
					new_template = $.mahbub._viewer(template);
					setting.templates = new_template;
					break;
				case 'gallery':
					$.mahbub._slideShow(indexSlide,files,captions,contents);
					new_template = $.mahbub._gallery(template);
					setting.templates = new_template;
					break;
				case 'iframe':
					new_template = $.mahbub._iframe(template.replaceWith(template),setting.size,'iframe');
					setting.templates = new_template;
					break;
				case 'normal and iframe':
					new_template = $.mahbub._iframe(template.replaceWith(template),setting.size,'normal+iframe');
					setting.templates = new_template;
					break;
				default:
					setting.templates = template.replaceWith(template);
					break;
				}
				$.mahbub._show($(setting.templates));
			},
			_show : function (el) {
				setting = elmahbub;
				$(el).appendTo('body').fadeIn(setting.speed);
				$.mahbub._bind();
			},
			_style : function(preview_template,sizes) {
				setting = elmahbub;
				var old_template = $(preview_template);
				isNaN(setting.styles.zIndexModal) ? setting.styles.zIndexModal = 0 : isNaN(setting.styles.zIndexContent) ? setting.styles.zIndexContent = 0 : '';
				var cssModal = old_template.find('.elmahbub-modal');
				cssModal.css({
					backgroundColor: setting.styles.backgroundModal,
					zIndex: setting.styles.zIndexModal
				});
				var cssContent = old_template.find('.elmahbub-modal-content');
				cssContent.css({
					backgroundColor: setting.styles.backgroundContent,
					border: setting.styles.border,
					borderRadius: setting.styles.borderRadius,
					zIndex: setting.styles.zIndexContent,
					height: setting.styles.heightContent,
					width: setting.styles.widthContent,
					color: setting.styles.colorContent
				});
				var modal_size = old_template.find('.elmahbub-modal-small');
				$.mahbub._setPosition(modal_size,setting.setPosition);
					if (sizes === 'small') {
						old_template;
					}
					else if (sizes === 'medium') {
						modal_size.removeClass('elmahbub-modal-small').addClass('elmahbub-modal-medium');
					}
					else if (sizes === 'large') {
						modal_size.removeClass('elmahbub-modal-small').addClass('elmahbub-modal-large');
					}
					else if (sizes === 'fullscreen') {
						modal_size.removeClass('elmahbub-modal-small').addClass('elmahbub-modal-fullscreen');
					}
				return old_template;
			},
			_viewer : function (preview_template) {
				setting = elmahbub;
				var old_template = $(preview_template),buttonSlideShow;
				old_template.find('.elmahbub-btn-close').html(setting.itemsViewer.close).nextAll().replaceWith(template_viewer);
				if(typeof(captions) === 'string' || typeof(captions) === 'object') { captions = captions; } else{ throw new Error('Captions must be a string or object'); }
				typeof captions === 'object' ? textCaption = captions[0] : typeof captions === 'string' ? textCaption = captions : '';
				switch (setting.itemsViewer.typeFile) {
					case 'image':
						setting.slideShow ? buttonSlideShow = $('<button type="button" />').addClass('elmahbub-button-slideshow').attr('title', setting.titleButtons.playSlide).addClass('play').html(setting.itemsViewer.playSlideShow) : buttonSlideShow = '';
						old_template.find('.elmahbub-viewer-caption').html(textCaption).before($(files)).before(buttonSlideShow);
						old_template.find('.elmahbub-button-fullscreen').after('<i class="index-slide" style="font-size:13px; color:white; z-index:1068; position: absolute;">'+indexSlide+'/'+$(files).length+'</i>');
						break;
					case 'video':
						setting.slideShow ? buttonSlideShow = $('<button type="button" />').addClass('elmahbub-button-slideshow').attr('title', setting.titleButtons.playSlide).addClass('play').html(setting.itemsViewer.playSlideShow) : buttonSlideShow = '';
						old_template.find('.elmahbub-viewer-caption').html(textCaption).before($(files).add(setting.itemsViewer.attributes).css({cursor: 'pointer',outline: 'none'})).before(buttonSlideShow);
						old_template.find('.elmahbub-button-fullscreen').after('<i class="index-slide" style="font-size:13px; color:white; z-index:1068; position: absolute;">'+indexSlide+'/'+$(files).length+'</i>');
						break;
					default:

						break;
				}
				return old_template;
			},
			_gallery : function (preview_template) {
				setting = elmahbub;
				var old_template = $(preview_template),buttonSlideShow,textCaption;
				old_template.find('.elmahbub-btn-close').html(setting.itemsViewer.close).nextAll().replaceWith(template_viewer);
				old_template.find('.elmahbub-viewer-left').removeClass('elmahbub-viewer-left').addClass('elmahbub-modal-gallery').find('.elmahbub-viewer-caption').after('<div class="elmahbub-gallery-thumbnails"/>');
				old_template.find('.elmahbub-viewer-right').remove();
				if(typeof(captions) === 'string' || typeof(captions) === 'object') { captions = captions; } else{ throw new Error('Captions must be a string or object'); }
				typeof captions === 'object' ? textCaption = captions[0] : typeof captions === 'string' ? textCaption = captions : '';
				switch (setting.itemsViewer.typeFile) {
					case 'image':
						setting.slideShow ? buttonSlideShow = $('<button type="button" />').addClass('elmahbub-button-slideshow').attr('title', setting.titleButtons.playSlide).addClass('play').html(setting.itemsViewer.playSlideShow) : buttonSlideShow = '';
						old_template.find('.elmahbub-viewer-caption').html(textCaption).before($(files)).before(buttonSlideShow);
						setting.thumbnailsEnabled ? old_template.find('.elmahbub-gallery-thumbnails').html($.mahbub._thumbnailsGallery(thumbnails)) : old_template.find('.elmahbub-gallery-thumbnails').css('border', '0px');
						setting.thumbnailsEnabled ? '' : old_template.find('.elmahbub-viewer-caption').css({
							top: '85%',
							bottom: '0',
							backgroundColor: '#000',
							color: '#fff',
							margin: 'auto',
							zIndex: '1078'
						});
						old_template.find('.elmahbub-button-fullscreen').after('<i class="index-slide" style="font-size:13px; color:white; z-index:1068; position: absolute;">'+indexSlide+'/'+$(files).length+'</i>');
						break;
					case 'video':
						setting.slideShow ? buttonSlideShow = $('<button type="button" />').addClass('elmahbub-button-slideshow').attr('title', setting.titleButtons.playSlide).addClass('play').html(setting.itemsViewer.playSlideShow) : buttonSlideShow = '';
						old_template.find('.elmahbub-viewer-caption').html(textCaption).before($(files).add(setting.itemsViewer.attributes).css({cursor: 'pointer',outline: 'none'})).before(buttonSlideShow);
						setting.thumbnailsEnabled ? old_template.find('.elmahbub-gallery-thumbnails').html($.mahbub._thumbnailsGallery(thumbnails)) : old_template.find('.elmahbub-gallery-thumbnails').css('border', '0px');
						setting.thumbnailsEnabled ? '' : old_template.find('.elmahbub-viewer-caption').css({
							top: '85%',
							bottom: '0',
							backgroundColor: '#000',
							color: '#fff',
							margin: 'auto',
							zIndex: '1078'
						});
						old_template.find('.elmahbub-button-fullscreen').after('<i class="index-slide" style="font-size:13px; color:white; z-index:1068; position: absolute;">'+indexSlide+'/'+$(files).length+'</i>');
						break;
					default:

						break;
				}
				return old_template;
			},
			_iframe : function (preview_template,sizes,args) {
				setting = elmahbub;
				var old_template = $(preview_template).replaceWith(template);
				isNaN(setting.styles.zIndexModal) ? setting.styles.zIndexModal = 0 : isNaN(setting.styles.zIndexContent) ? setting.styles.zIndexContent = 0 : '';
				var cssModal = old_template.find('.elmahbub-modal');
				cssModal.css({
					backgroundColor: setting.styles.backgroundModal,
					zIndex: setting.styles.zIndexModal
				});
				var cssContent = old_template.find('.elmahbub-modal-content');
				cssContent.css({
					backgroundColor: setting.styles.backgroundContent,
					border: setting.styles.border,
					borderRadius: setting.styles.borderRadius,
					zIndex: setting.styles.zIndexContent,
					height: setting.styles.heightContent,
					width: setting.styles.widthContent,
					color: setting.styles.colorContent
				});
				var tag_iframe = '<div class="elmahbub-modal-iframe"><iframe src="'+setting.items.sourceIframe+'" frameborder="0" allowfullscreen></iframe></div>';
				var modal_size = old_template.find('.elmahbub-modal-small');
				args === 'iframe' ? cssContent.html(tag_iframe) : args === 'normal+iframe' ? cssContent.find('.elmahbub-modal-body').prepend(tag_iframe) : '';
				$.mahbub._setPosition(modal_size,setting.setPosition);
					if (sizes === 'small') {
						old_template;
					}
					else if (sizes === 'medium') {
						modal_size.removeClass('elmahbub-modal-small').addClass('elmahbub-modal-medium');
					}
					else if (sizes === 'large') {
						modal_size.removeClass('elmahbub-modal-small').addClass('elmahbub-modal-large');
					}
					else if (sizes === 'fullscreen') {
						modal_size.removeClass('elmahbub-modal-small').addClass('elmahbub-modal-fullscreen');
					}
				return old_template;
			},
			_bind : function () {
				setting = elmahbub;
				$(document).on('click', '.elmahbub-btn-close,[data-dismiss=elmahbub-modal]', function(event) {
					$.mahbub._close();
				});
				$('.elmahbub-modal-small,.elmahbub-modal-medium,.elmahbub-modal-large,.elmahbub-modal-fullscreen,.elmahbub-modal-viewer').on('blur',function () { setting.outsideClose ? $.mahbub._close() : ''; });
				$(document).on('keydown', function(e) {
					if (e.keyCode === 27 || e.which === 27) {
						setting.escapeClose ? $.mahbub._close() : '';
					}
					else if (e.keyCode === 37 || e.which === 37) {
						setting.arrowKeyboard && setting.type === 'viewer' || setting.type === 'gallery' ? $.mahbub._slide(-1,'') : '';
					}
					else if (e.keyCode === 39 || e.which === 39) {
						setting.arrowKeyboard && setting.type === 'viewer' || setting.type === 'gallery' ? $.mahbub._slide(+1,'') : '';
					}
				});
				$(document).on('click', '.elmahbub-arrow-left', function(event) {
					$.mahbub._slide(-1,'');
				});
				$(document).on('click', '.elmahbub-arrow-right', function(event) {
					$.mahbub._slide(+1,'');
				});
				$(document).on('click', '.elmahbub-button-slideshow', function(event) {
					event.preventDefault();
					if ($(this).hasClass('play')) {
						indexSlide = 0;
						$.mahbub._playSlideShow();
						$(this).removeClass('play');
						$(this).html(setting.itemsViewer.stopSlideShow).attr('title', setting.titleButtons.stopSlide);
					}
					else {
						$.mahbub._stopSlideShow($(this));
					}
				});
				$(thumbnails).each(function(i, el) {
					$(document).on('click', '.elmahbub-thumb'+i, function(event) {
						$.mahbub._slide(i+1,'thumbs');
					});
				});
				$('.elmahbub-button-fullscreen').on('click', function(event) {
					setting.fullscreenMode ? $.mahbub._fullscreen() : '';
				});
				setting.autoClose ? setTimeout($.mahbub._close, setting.timeOut) : '';
			}, 
			_slide : function (value,args) {
				setting = elmahbub;
				var total;
				args === '' ? total = (indexSlide += value) : args === 'thumbs' ? total = (indexSlide = value) : '';
				$.mahbub._slideShow(total,files,captions,contents);
			},
			_slideShow : function (value,element,captions,contents) {
				setting = elmahbub;
				var i,e,x;
				x = $(element);
				e = x.length;
				if (value > e) { indexSlide = 1; }
				if (value < 1) { indexSlide = e; }
				for (i = 0; i < e; i++) {
				    x.eq(i).css('display', 'none');
				}
				x.eq(indexSlide-1).css('display', 'block');
				typeof(captions === 'string') ? captions = captions : typeof(captions === 'object') ? captions[indexSlide-1] = captions[indexSlide-1] : '';
				if (typeof captions === 'object'){
					if (indexSlide-1 < captions.length){
						$('.elmahbub-viewer-caption').html(captions[indexSlide-1]);
					}
					else if (indexSlide-1 > captions.length-1){
						$('.elmahbub-viewer-caption').html('');
					}
				}
				else if (typeof captions === 'string') {
					$('.elmahbub-viewer-caption').html(captions);
				}
				$('.elmahbub-viewer-right').html(contents);
				value > e ? value = 1 : value = value;
				$(element).parents($('.index-slide').html(value+'/'+$(files).length));
				return ;
			},
			_playSlideShow : function () {
				setting = elmahbub;
				indexSlide = indexSlide;
				$(document).find('.elmahbub-button-slideshow').hasClass('play') ? $(template_viewer).find('.elmahbub-button-slideshow').removeClass('play') : '';
				$(document).find('.elmahbub-arrow-left').hide().siblings('button').hide().next('.index-slide').hide();
				$(document).find('.elmahbub-viewer-caption').hide().next('.elmahbub-gallery-thumbnails').hide();
				var i,e,x;
				x = $(files);
				x.each(function(index, el) {
					$(el).css('display', 'block');
				});
				e = x.length;
				for (i = 0; i < e; i++) {
				    x.eq(i).css('display', 'none');
				}
				indexSlide ++;
				if (indexSlide > e) { indexSlide = 1; }
				x.eq(indexSlide-1).css('display', 'block');
				playing = setTimeout($.mahbub._playSlideShow,setting.timeSlideShow);
			},
			_stopSlideShow : function (element) {
				setting = elmahbub;
				$(element).addClass('play').html(setting.itemsViewer.playSlideShow).attr('title', setting.titleButtons.playSlide);
				$(document).find('.elmahbub-arrow-left').show().siblings('button').show().next('.index-slide').show();
				$(document).find('.elmahbub-viewer-caption').show().next('.elmahbub-gallery-thumbnails').show();
				clearTimeout(playing);
			},
			_thumbnailsGallery : function (element) {
				setting = elmahbub;
				var i,e,x;
				x = $(element);
				e = x.length;
				for (i = 0; i < e; i++) {
					x.eq(i).css('display', 'block');
					x.eq(i).addClass('elmahbub-thumb'+i);
				}
				return x;
			},
			_setPosition : function (modal,position) {
				setting = elmahbub;
				switch (position) {
					case 'TL':
						$(modal).css({
							top: '0',
							left: '0',
							position: 'fixed'
						});
						break;
					case 'TR':
						$(modal).css({
							top: '0',
							right: '0',
							position: 'fixed'
						});
						break;
					case 'BL':
						$(modal).css({
							bottom: '0',
							left: '0',
							position: 'fixed'
						});
						break;
					case 'BR':
						$(modal).css({
							bottom: '0',
							right: '0',
							position: 'fixed'
						});
						break;
					case 'C':
						$(modal);
						break;
					default:
						$(modal);
						break;
				}
			},
			_fullscreen : function () {
				setting = elmahbub;
				$('.elmahbub-viewer-slide').toggleClass('elmahbub-modal-full').find('.elmahbub-viewer-right').hide();
			},
			_close : function () {
				setting = elmahbub;
				var c = $('.elmahbub-modal').fadeOut(setting.speed).off().find('.elmahbub-viewer-slide');
				c.hasClass('elmahbub-modal-full') ? c.removeClass('elmahbub-modal-full') : '';
				window.location.reload(true)
			}
		}
		$(elm).on('click',function(event) {
			event.preventDefault();
			event.stopPropagation();
			$.mahbub.init();
		});
	}
}(jQuery);