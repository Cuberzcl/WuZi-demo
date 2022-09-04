window.addEventListener('load', function () {
    this.document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    var board = this.document.querySelector('.board');
    var victory_img = board.querySelector('.victory_img');
    var v_img = victory_img.querySelector('img');
    var chess = 0;

    var chooseChess = this.document.querySelector('.chooseChess');
    var statement = this.document.querySelector('.statement');
    var nene = this.document.querySelector('.nene');
    var riri = this.document.querySelector('.riri');
    var nene_player = this.document.querySelector('.nene_player');
    var riri_player = this.document.querySelector('.riri_player');
    var black = this.document.querySelector('.black');
    var afterChoose = this.document.querySelector('.afterChoose');
    var confirm = this.document.querySelector('.confirm');
    var anew = this.document.querySelector('.anew');
    var chooseOver = false;

    var player1 = new Player(chess + 1);
    var player2 = new Player(2 - chess);

    // load();

    nene.addEventListener('click', function () {
        if (chooseOver) return false;

        this.style.width = '68px';
        this.style.height = '68px';
        this.style.top = '10px';

        nene.style.border = '4px dotted white';
        nene.style.cursor = 'default';
        riri.style.border = '4px dashed yellow';
        riri.style.cursor = 'default';

        nene_player.innerHTML = 'Player1';
        riri_player.innerHTML = 'Player2';

        chooseChess.firstElementChild.src = './images/afterChoose.png';
        afterChoose.style.display = 'block';
        statement.innerHTML = '请确认';

        chess = 0;
        chooseOver = true;
    });

    nene.addEventListener('mouseenter', function () {
        if (chooseOver) return false;

        this.style.width = '75px';
        this.style.height = '75px';
        this.style.top = '7px';
    });
    nene.addEventListener('mouseleave', function () {
        this.style.width = '68px';
        this.style.height = '68px';
        this.style.top = '10px';
    });

    riri.addEventListener('click', function () {
        if (chooseOver) return false;

        this.style.width = '68px';
        this.style.height = '68px';
        this.style.bottom = '11px';

        nene.style.border = '4px dotted white';
        nene.style.cursor = 'default';
        riri.style.border = '4px dashed yellow';
        riri.style.cursor = 'default';

        nene_player.innerHTML = 'Player2';
        riri_player.innerHTML = 'Player1';

        chooseChess.firstElementChild.src = './images/afterChoose.png';
        afterChoose.style.display = 'block';
        statement.innerHTML = '请确认';

        chess = 1;
        chooseOver = true;
    });

    riri.addEventListener('mouseenter', function () {
        if (chooseOver) return false;

        this.style.width = '75px';
        this.style.height = '75px';
    });
    riri.addEventListener('mouseleave', function () {
        this.style.width = '68px';
        this.style.height = '68px';
    });

    confirm.addEventListener('click', function () {
        anew.click();
        chooseChess.style.display = 'none';
        black.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    anew.addEventListener('click', function () {
        nene.style.border = '0px dotted white';
        nene.style.cursor = 'pointer';
        riri.style.border = '0px dashed yellow';
        riri.style.cursor = 'pointer';

        nene_player.innerHTML = '綾地寧々';
        riri_player.innerHTML = '鹿島理々';

        chooseChess.firstElementChild.src = './images/chooseChess.png';
        afterChoose.style.display = 'none';
        statement.innerHTML = '请玩家1选择自己的棋子';

        chooseOver = false;
    });
    var isOver = false;

    function Player(id) {
        this.id;
        this.chesses = new Array();
    }

    for (var i = 0; i < 15; i++) {
        var ul = this.document.createElement('ul');
        ul.setAttribute('row', i + 1);
        for (var j = 0; j < 15; ++j) {
            var li = this.document.createElement('li');
            li.setAttribute('row', i + 1);
            li.setAttribute('column', j + 1);
            li.setAttribute('data-id', i * 15 + j + 1);

            var img = this.document.createElement('img');
            img.src = './images/blank.png';
            img.setAttribute('state', '0');
            img.addEventListener('mouseenter', function (e) {
                if (isOver) return false;
                if (this.getAttribute('state') == '0') {
                    this.setAttribute('state', '1');
                    if (chess === 0) {
                        this.src = './images/nene.png';
                        // this.src = player1.chessImg;
                    } else if (chess === 1) {
                        this.src = './images/riri.png';
                        // this.src = player2.chessImg;
                    }
                    this.style.opacity = 0.5;
                }
            });

            img.addEventListener('mouseleave', function () {
                if (this.getAttribute('state') == '1') {
                    this.setAttribute('state', '0');
                    this.src = './images/blank.png';
                    this.style.opacity = 1;
                }
            });

            img.addEventListener('click', function () {
                if (isOver) return false;

                if (this.getAttribute('state') == '1') {
                    this.setAttribute('state', '2');

                    var father = this.parentNode;
                    var chessIndex = parseInt(father.getAttribute('data-id'));
                    if (chess === 0) {
                        this.src = './images/nene.png';
                        // this.src = player1.chessImg;
                        chess = 1;

                        player1.chesses.push(chessIndex);

                        if (victory(player1.chesses) == true) {
                            this.style.opacity = 1;
                            this.className = 'chessed';
                            isOver = true;
                            victory_img.style.display = 'block';
                            v_img.src = './images/nene_win.png';
                            setTimeout(function () {
                                alert('寧々の勝利！');
                            }, 100);

                            setTimeout(function () {
                                victory_img.style.display = 'none';
                            }, 5000);
                        }
                    } else if (chess === 1) {
                        this.src = './images/riri.png';
                        // this.src = player2.chessImg;
                        chess = 0;

                        player2.chesses.push(chessIndex);

                        if (victory(player2.chesses) == true) {
                            this.style.opacity = 1;
                            this.className = 'chessed';
                            isOver = true;
                            victory_img.style.display = 'block';
                            v_img.src = './images/riri_win.png';
                            setTimeout(function () {
                                alert('理々の勝利！');
                            }, 100);

                            setTimeout(function () {
                                victory_img.style.display = 'none';
                            }, 5000);
                        }
                    }
                    this.style.opacity = 1;
                    this.className = 'chessed';

                    // save();
                }
            });

            li.appendChild(img);
            ul.appendChild(li);
        }

        board.appendChild(ul);
    }

    function save() {
        localStorage.setItem("chess", chess);
        localStorage.setItem("player1", JSON.stringify(player1));
        localStorage.setItem("player2", JSON.stringify(player2));
    }

    function load() {
        var _player1 = JSON.parse(localStorage.getItem("player1"));
        var _player2 = JSON.parse(localStorage.getItem("player2"));

        if (_player1 === null && _player2 === null) {
            return false;
        } else {
            player1 = _player1;
            player2 = _player2;
            chess = localStorage.setItem("chess", chess);


            chooseChess.style.display = 'none';
            black.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    var uls = board.querySelectorAll('ul');

    for (var i = 1; i < 14; ++i) {
        uls[0].children[i].className = 'top';
        uls[14].children[i].className = 'bottom';
        uls[i].firstElementChild.className = 'left';
        uls[i].lastElementChild.className = 'right';
    }
    uls[0].firstElementChild.className = 'top_left';
    uls[0].lastElementChild.className = 'top_right';
    uls[14].firstElementChild.className = 'bottom_left';
    uls[14].lastElementChild.className = 'bottom_right';

    var retract = this.document.querySelector('.retract');
    retract.addEventListener('mouseenter', function () {
        this.className = 'retract_change';

        if ((player1.chesses.length == 0 && player2.chesses.length == 0) || isOver == true) {
            this.style.cursor = 'default';
        }
    });
    retract.addEventListener('mouseleave', function () {
        this.className = 'retract';
        this.style.cursor = 'pointer';
    });

    retract.addEventListener('click', retractChess);
    var lis = board.querySelectorAll('li');

    this.setInterval(function () {
        if (isOver == true) {
            for (var i = 0; i < lis.length; ++i) {
                lis[i].firstElementChild.style.cursor = 'default';
            }
        }
    }, 5000);

    function retractChess() {
        if ((player1.chesses.length == 0 && player2.chesses.length == 0) || isOver == true) {
            return false;
        }

        if (chess == 0) {
            var len = player2.chesses.length;
            var lastChess = player2.chesses[len - 1];
            player2.chesses.splice(len - 1, 1);
            console.dir(lastChess);
            lis[lastChess - 1].firstElementChild.src = './images/blank.png';
            lis[lastChess - 1].firstElementChild.setAttribute('state', 0);
            chess = 1;
        } else {
            var len = player1.chesses.length;
            var lastChess = player1.chesses[len - 1];
            player1.chesses.splice(len - 1, 1);
            console.dir(lastChess);
            lis[lastChess - 1].firstElementChild.src = './images/blank.png';
            lis[lastChess - 1].firstElementChild.setAttribute('state', 0);
            chess = 0;
        }

        // save();
    }

    var newGame = this.document.querySelector('.newGame');
    newGame.addEventListener('mouseenter', function () {
        this.className = 'newGame_change';
    });
    newGame.addEventListener('mouseleave', function () {
        this.className = 'newGame';
    });

    var question = this.document.querySelector('#question');
    var title = this.document.querySelector('#title');
    var bg = this.document.querySelector('#bg');
    var yes = this.document.querySelector('#yes');
    var no = this.document.querySelector('#no');

    newGame.addEventListener('click', function () {
        question.style.display = 'block';
        bg.style.display = 'block';
    });

    no.addEventListener('click', function () {
        question.style.display = 'none';
        bg.style.display = 'none';
    })

    title.addEventListener('mousedown', function (e) {
        var x = e.pageX - question.offsetLeft;
        var y = e.pageY - question.offsetTop;

        document.addEventListener('mousemove', move)

        function move(e) {
            question.style.left = e.pageX - x + 'px';
            question.style.top = e.pageY - y + 'px';
        }
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
        })
    })

    yes.addEventListener('click', function () {
        isOver = false;

        for (var i = 0; i < lis.length; ++i) {
            var img = lis[i].firstElementChild;
            img.src = './images/blank.png';
            img.setAttribute('state', '0');
            img.style.cursor = 'pointer';
        }

        player1.chesses.splice(0, player1.chesses.length);
        player2.chesses.splice(0, player2.chesses.length);

        question.style.display = 'none';
        bg.style.display = 'none';

        chooseChess.style.display = 'block';
        black.style.display = 'block';

        localStorage.clear();
    })

});