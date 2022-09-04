window.addEventListener('load', function () {
    var audio = this.document.querySelector('audio');
    var ctrls = this.document.querySelector('.ctrls');
    var lis = ctrls.querySelectorAll('li');
    var change = this.document.querySelector('#change');
    var playBtn = this.document.querySelector('#play');
    var turnDown = this.document.querySelector('#turnDown');
    var turnUp = this.document.querySelector('#turnUp');
    var prev = this.document.querySelector('#prev');
    var next = this.document.querySelector('#next');
    var con = this.document.querySelector('.con');
    var test = this.document.querySelector('.test');
    var volume = this.document.querySelector('.volume');
    var totalVolume = this.document.querySelector('#volume');
    var isPlaying = false;
    var songNames = new Array(
        '松本文紀 - 夢の歩みを見上げて',
        '松本文紀 - 夜の向日葵',
        'Active Planets - Musa',
        'Active Planets - 言の葉',
        'Angel Note - 未来を描いて',
        'Angel Note,井ノ原智 - 縁結び',
        'Angel Note,青田新名 - とおりゃんせ～甘美風来 ＜Instrument Version＞',
        'M.Graveyard - you',
        'Peak A Soul+ - 雨を待ってる',
        'ばんばんしー - 秋姉妹のなく頃に in the autumn sky',
        '松本文紀 - 君の筆は世界を奏でる'
    )
    var indexs = new Array(1);
    indexs[0] = Math.floor((Math.random() * songNames.length));
    var times = 1;
    changeArray();
    audio.src = './audio/' + (indexs[(times % songNames.length) - 1] + 1) + '.mp3';
    con.innerHTML = songNames[indexs[(times % songNames.length) - 1]];
    test.innerHTML = con.innerHTML;

    for (var i = 0; i < lis.length; ++i) {
        lis[i].addEventListener('mouseover', function () {
            this.firstElementChild.style.visibility = 'hidden';
            this.firstElementChild.style.zIndex = 0;
        })
        lis[i].addEventListener('mouseout', function () {
            this.firstElementChild.style.visibility = 'visible';
            this.firstElementChild.style.zIndex = 1;
        })
    }

    audio.volume = 0.5;
    playBtn.addEventListener('click', function () {
        if (isPlaying) {
            playBtn.innerHTML = '';
            audio.pause();
            isPlaying = false;
            change.src = './images/3.png';
        } else {
            playBtn.innerHTML = '';
            audio.play();
            isPlaying = true;
            change.src = './images/6.png';
        }
    })

    turnDown.addEventListener('click', function () {
        if (audio.volume <= 0.01) {
            return false;
        } else {
            lis[3].querySelector('a').style.cursor = 'pointer';
        }
        audio.volume -= 0.1;
        clearTimeout(volume.preTime);
        clearTimeout(volume.showTime);
        volume.preTime = setTimeout(function () {
            volume.style.display = 'block';
            animate_h(volume, 337.5 + (audio.volume - 0.5) * 10 * 67.5, 35, function () {
                volume.showTime = setTimeout(function () {
                    volume.style.display = 'none';
                    clearTimeout(volume.preTime);
                }, 2000);
            });
        }, 200);
        if (audio.volume <= 0.01) {
            lis[1].querySelector('a').style.cursor = 'default';
        }
    });
    turnUp.addEventListener('click', function () {
        if (audio.volume >= 0.99) {
            return false;
        } else {
            lis[1].querySelector('a').style.cursor = 'pointer';
        }
        audio.volume += 0.1;
        clearTimeout(volume.preTime);
        clearTimeout(volume.showTime);
        volume.preTime = setTimeout(function () {
            volume.style.display = 'block';
            animate_h(volume, 337.5 + (audio.volume - 0.5) * 10 * 67.5, 35, function () {
                volume.showTime = setTimeout(function () {
                    volume.style.display = 'none';
                    clearTimeout(volume.preTime);
                }, 2000);
            });
        }, 200);
        if (audio.volume >= 0.99) {
            lis[3].querySelector('a').style.cursor = 'default';
        }
    });

    prev.addEventListener('click', function () {
        if (times == 1)
            times = songNames.length;
        times--;
        audio.src = './audio/' + (indexs[(times - 1) % songNames.length] + 1) + '.mp3';
        playBtn.innerHTML = '';
        con.innerHTML = songNames[indexs[(times - 1) % songNames.length]];
        test.innerHTML = con.innerHTML;
        audio.play();
        isPlaying = true;
        change.src = './images/6.png';
        if (times == 1) {
            changeArray();
        }
    })

    next.addEventListener('click', function () {
        times++;
        audio.src = './audio/' + (indexs[(times - 1) % songNames.length] + 1) + '.mp3';
        playBtn.innerHTML = '';
        con.innerHTML = songNames[indexs[(times - 1) % songNames.length]];
        test.innerHTML = con.innerHTML;
        audio.play();
        isPlaying = true;
        change.src = './images/6.png';
        if (times == songNames.length) {
            changeArray();
        }
    })

    totalVolume.addEventListener('mouseenter', function () {
        volume.style.display = 'block';
    })

    totalVolume.addEventListener('mouseleave', function () {
        volume.style.display = 'none';
    })

    audio.addEventListener('ended', function () {
        next.click();
    })

    function changeArray() {
        var len = indexs.length;
        var lastindex = indexs[len - 1];
        indexs.splice(0, len);
        indexs[0] = lastindex;

        while (indexs.length < songNames.length) {
            var index = Math.floor((Math.random() * songNames.length));
            if (indexs.indexOf(index) == -1) {
                indexs.push(index);
            }
        }
        times = 1;
    }
})