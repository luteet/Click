
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-

	
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

const video = document.querySelectorAll('.video');
let videoArray = [];

const videoStart = document.querySelectorAll('.video._start'),
	  videoInfinite = document.querySelectorAll('.video._infinite');

let videoTimer;
videoStart.forEach(videoStart => {

	//function videoStartFunc() {  }
	videoStart.addEventListener('canplaythrough', function () {
		videoStart.play();
		//videoStart.classList.add('_playing');
		clearTimeout(videoTimer);
		videoTimer = setTimeout(() => {
			videoInfinite.forEach(videoInfinite => {
				//videoInfinite.play();
				videoInfinite.classList.remove('_loaded');
			})
			//videoStart.classList.remove('_loading');
			if(!videoStart.classList.contains('_loaded')) {
				videoStart.classList.add('_loaded');
				videoInfinite.forEach(videoInfinite => {
					videoInfinite.play();
					videoInfinite.classList.add('_loaded');
				})
			}
	
			
		},videoStart.duration*1000-175);
		
	})

	
	/* videoStart.addEventListener('ended', function () {
		
		
	}) */
})

function startVideo() {
	//console.log(videoStart)
	videoStart.forEach(videoStart => {
		//videoStart.classList.add('_loading');
		videoStart.classList.remove('_loaded');
		videoStart.load();
		
	})

	videoInfinite.forEach(videoInfinite => {
		videoInfinite.load();
		
		/* videoInfinite.addEventListener('canplaythrough', function () {
			
			
		}) */
	})
}

video.forEach((video, index) => {
	//const source = video.querySelectorAll('source');

	videoArray[index] = {
		video: video,
		mob_src: video.getAttribute('src'),
		tab_src: video.dataset.tabletSrc,
		desktop_src: video.dataset.desktopSrc,
		//sources: [],
	}

	/* source.forEach((source, sourceIndex) => {
		videoArray[index]['sources'][sourceIndex] = {
			source: source,
			mob_src: source.getAttribute('src'),
			tablet_src: source.dataset.tabletSrc,
			desktop_src: source.dataset.desktopSrc,
		}
	}) */
})

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

function resize() {

	windowSize = window.innerWidth;
	html.style.setProperty("--height-screen", window.innerHeight + "px");

	resizeCheckFunc(550,
		function () {  // screen >

			Array.from(videoArray).forEach(videoElement => {
				videoElement['video'].setAttribute('src', videoElement['tab_src'])
				/* Array.from(videoElement['sources']).forEach(source => {
					source['source'].setAttribute('src', source['tablet_src']);
				}) */

				
				startVideo();
				
			})

		},
		function () {  // screen <

			Array.from(videoArray).forEach(videoElement => {
				videoElement['video'].setAttribute('src', videoElement['mob_src'])
				/* Array.from(videoElement['sources']).forEach(source => {
					source['source'].setAttribute('src', source['mob_src']);
				}) */
			})

			startVideo();

		}
	);

	resizeCheckFunc(992,
		function () {  // screen >

			Array.from(videoArray).forEach(videoElement => {
				videoElement['video'].setAttribute('src', videoElement['desktop_src']);
				/* Array.from(videoElement['sources']).forEach(source => {
					source['source'].setAttribute('src', source['mob_src']);
				}) */
			})

			startVideo();

			/* Array.from(videoArray).forEach(videoElement => {
				Array.from(videoElement['sources']).forEach(source => {
					source['source'].setAttribute('src', source['desktop_src']);
				})
			})

			startVideo(); */

		},
		function () {  // screen <

			Array.from(videoArray).forEach(videoElement => {
				videoElement['video'].setAttribute('src', videoElement['tab_src'])
				/* Array.from(videoElement['sources']).forEach(source => {
					source['source'].setAttribute('src', source['tablet_src']);
				}) */

				
				startVideo();
				
			})

		}
	);

	

}

resize();

window.onresize = resize;

const imageBody = document.querySelectorAll('.image-body');
imageBody.forEach(imageBody => {
	const img = imageBody.querySelector('img');
	
	if(img.getAttribute('width') && img.getAttribute('height')) {
		let width = Number(img.getAttribute('width')),
			height = Number(img.getAttribute('height'));

		imageBody.style.paddingTop = height / width * 100 + '%';
	}
})

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=




var canvas = document.getElementById('canvas');

function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

function draw(arg) {
	let canvas = arg.canvas;
	if (canvas.getContext) {

		let width = canvas.offsetWidth,
			height = canvas.offsetHeight;

		let ctx = canvas.getContext('2d');
		
		ctx.canvas.width  = canvas.offsetWidth;
  		ctx.canvas.height = canvas.offsetHeight;
		
		let lineWidth = (arg.lineWidth) ? arg.lineWidth : 4, 
		angleSize = (arg.angleSize) ? arg.angleSize : 55, outerCircleSize = arg.outerCircleSize, 
		dashArray = (arg.dashArray) ? arg.dashArray : [10, 10],
		lastLine = (arg.lastLine) ? arg.lastLine : 1;

		lastLine = lastLine / 100 * canvas.offsetHeight;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = "#C7C7C7";
		ctx.setLineDash(dashArray);
		ctx.beginPath();

		if(arg.reverse == true) {
			ctx.moveTo(outerCircleSize, outerCircleSize * 3);
			if(arg.disableAngle == true) {
				ctx.lineTo(outerCircleSize, height - (angleSize * 2) - lastLine);
				ctx.arc(angleSize + outerCircleSize, height - angleSize - outerCircleSize - (lineWidth/2), angleSize, getRadians(-180), Math.PI / 2, true);
				ctx.lineTo(width - outerCircleSize*3, height - (lineWidth/2) - outerCircleSize);
			} else {
				ctx.lineTo(outerCircleSize, height - (angleSize * 2) - lastLine);
				ctx.arc(angleSize + outerCircleSize, height - (angleSize * 2) - lastLine, angleSize, getRadians(-180), Math.PI / 2, true);
				ctx.lineTo(width - (angleSize * 2), height - angleSize - lastLine);
				ctx.arc(width - angleSize - lineWidth - (outerCircleSize), height - lastLine, angleSize, getRadians(-90), getRadians(0), false);
				ctx.lineTo(width - lineWidth - outerCircleSize, height - (outerCircleSize*2.5));
			}
		} else {

			ctx.moveTo(width - lineWidth - outerCircleSize, outerCircleSize * 3);
			if(arg.disableAngle == true) {
				ctx.lineTo(width - lineWidth - outerCircleSize, height - angleSize - outerCircleSize);
				ctx.arc(width - angleSize - outerCircleSize - lineWidth, height - angleSize - (lineWidth/2) - outerCircleSize, angleSize, getRadians(0), Math.PI / 2, false);
				ctx.lineTo((outerCircleSize*2.5) + lineWidth, height - (lineWidth/2) - outerCircleSize);
			} else {
				ctx.lineTo(width - lineWidth - outerCircleSize, height - (angleSize * 2) - lastLine);
				ctx.arc(width - angleSize - outerCircleSize - lineWidth, height - (angleSize * 2) - lastLine, angleSize, getRadians(0), Math.PI / 2, false);
				ctx.lineTo(angleSize * 2, height - angleSize - lastLine);
				ctx.arc(angleSize + outerCircleSize, height - lastLine, angleSize, getRadians(-90), getRadians(180), true);
				ctx.lineTo(outerCircleSize+lineWidth, height+lastLine);
			}
			
		}

		ctx.stroke();

		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.fillStyle = '#1E1E1E';
		ctx.lineWidth = 0;
		ctx.strokeStyle = "transparent";

		if(arg.accentLastCircle == true) {
			if(arg.reverse == true) {
				ctx.arc(width - outerCircleSize*1.2, height - outerCircleSize-1, outerCircleSize, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.stroke();

				ctx.beginPath();
				ctx.setLineDash([]);
				ctx.fillStyle = '#6B56DF';
				ctx.lineWidth = 0;
				ctx.strokeStyle = "transparent";

				ctx.arc(outerCircleSize, outerCircleSize, outerCircleSize, 0, Math.PI * 2, true);

				ctx.fill();
				ctx.stroke();

			} else {
				ctx.arc(width - outerCircleSize*1.2, outerCircleSize, outerCircleSize, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.stroke();

				ctx.beginPath();
				ctx.setLineDash([]);
				ctx.fillStyle = '#6B56DF';
				ctx.lineWidth = 0;
				ctx.strokeStyle = "transparent";

				ctx.arc(outerCircleSize, height - outerCircleSize-1, outerCircleSize, 0, Math.PI * 2, true);

				ctx.fill();
				ctx.stroke();
			}
		} else {
			if(arg.reverse == true) {
				ctx.arc(outerCircleSize, outerCircleSize, outerCircleSize, 0, Math.PI * 2, true);
				ctx.arc(width - outerCircleSize*1.2, height - outerCircleSize-1, outerCircleSize, 0, Math.PI * 2, true);

				ctx.fill();
				ctx.stroke();
				
			} else {
				ctx.arc(outerCircleSize, height - outerCircleSize-1, outerCircleSize, 0, Math.PI * 2, true);
				ctx.arc(width - outerCircleSize*1.2, outerCircleSize, outerCircleSize, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.stroke();
			}
		}

		
		
		
	}
}

setTimeout(() => {
	//draw();
}, 50);


const canvasLine = document.querySelectorAll('.about__item--number canvas');
canvasLine.forEach(canvasLine => {
	let width = 0, height = 0;
	function canvasLineDraw() {
		if(canvasLine.offsetWidth != width || canvasLine.offsetHeight != height) {
			width = canvasLine.offsetWidth;
			height = canvasLine.offsetHeight;
			draw({
				canvas: canvasLine,
				reverse: (canvasLine.dataset.lineReverse == "true") ? true : false,
				lastLine: (canvasLine.dataset.lineLastline && canvasLine.dataset.lineLastlinemob) ? (window.innerWidth >= 768) ? Number(canvasLine.dataset.lineLastline) : Number(canvasLine.dataset.lineLastlinemob) : 20,
				angleSize: (window.innerWidth >= 768) ? 90 : 50,
				dashArray: [14,10],
				disableAngle: (canvasLine.dataset.lineDisableAngle == "true") ? true : false,
				lineWidth: 2,
				outerCircleSize: (window.innerWidth >= 768) ? 16 : 10,
				accentLastCircle: (canvasLine.dataset.lineAccentlastcircle == "true") ? true : false,
			});
		}
	}
	setInterval(canvasLineDraw,100)
})


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
