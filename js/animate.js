window.addEventListener('load', function () {
    var sliderbar = this.document.querySelector('.sliderbar');
    var span = sliderbar.firstElementChild;
    var con = this.document.querySelector('.con');
    var prev = this.document.querySelector('#prev');
    var next = this.document.querySelector('#next');
    var test = this.document.querySelector('.test');

    var audio = this.document.querySelector('audio');
    audio.addEventListener('play', function () {
        timeShow();
        span.style.display = 'block';
    })


    audio.addEventListener('pause', function () {
        span.style.display = 'none';
    })

    span.addEventListener('mouseenter', function () {
        showSongName();
    });

    span.addEventListener('mouseleave', function () {
        hideSongName();
    });

    prev.addEventListener('click', function () {
        clearInterval(con.timer);
        clearTimeout(con.timeout);
        con.style.left = '40px';
        timeShow();
        span.style.display = 'block';
    })
    next.addEventListener('click', function () {
        clearInterval(con.timer);
        clearTimeout(con.timeout);
        con.style.left = '40px';
        timeShow();
        span.style.display = 'block';
    })

    function showSongName() {
        var distance = test.offsetWidth + 10;
        span.innerHTML = ' ';
        animate(con, -distance, 45, function () {
            span.innerHTML = '';
        })
    }

    function hideSongName() {
        span.innerHTML = ' ';
        animate(con, 40, 50, function () {
            span.innerHTML = '';
        })
    }

    function timeShow() {
        clearTimeout(con.timeout);
        showSongName();
        con.timeout = setTimeout(function () {
            hideSongName();
        }, 5000);
    }


})

function animate(obj, target, time, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, time);
}

function animate_h(obj, target, time, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.offsetHeight) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (((obj.offsetHeight + 1) >= target && step >= 0) || ((obj.offsetHeight - 1) <= target && step < 0)) {
            clearInterval(obj.timer);
            obj.offsetHeight = target;
            callback && callback();
        }
        obj.style.height = obj.offsetHeight + step + 'px';
    }, time);
}