(function() {

    var canvas = document.getElementById('app');
    var transformed = document.getElementById('transformed');
    var spinner = document.getElementById('spinner');

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 700, 400);

    var defosize = 2.5;
    var defocolor = "#fff";
    var defoalpha = 0.98;

    var mouseX = "";
    var mouseY = "";

    canvas.addEventListener('mousemove', onMove, false);
    canvas.addEventListener('mousedown', onClick, false);
    canvas.addEventListener('mouseup', drawEnd, false);
    canvas.addEventListener('mouseout', drawEnd, false);

    function onMove(e) {
        if (e.buttons === 1 || e.witch === 1) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left);
            var Y = ~~(e.clientY - rect.top);
            draw(X, Y);
        };
    };

    function onClick(e) {
        if (e.button === 0) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left);
            var Y = ~~(e.clientY - rect.top);

            draw(X, Y);
        }
    };

    function draw(X, Y) {
        ctx.beginPath();
        ctx.globalAlpha = defoalpha;
        //マウス継続値によって場合分け、直線の moveTo（スタート地点）を決定
        if (mouseX === "") {
            //継続値が初期値の場合は、現在のマウス位置をスタート位置とする
            ctx.moveTo(X, Y);
        } else {
            //継続値が初期値ではない場合は、前回のゴール位置を次のスタート位置とする
            ctx.moveTo(mouseX, mouseY);
        }
        //lineTo（ゴール地点）の決定、現在のマウス位置をゴール地点とする
        ctx.lineTo(X, Y);
        //直線の角を「丸」、サイズと色を決める
        ctx.lineCap = "round";
        ctx.lineWidth = defosize * 2;
        ctx.strokeStyle = defocolor;
        ctx.stroke();
        //マウス継続値に現在のマウス位置、つまりゴール位置を代入
        mouseX = X;
        mouseY = Y;
    };

    //左クリック終了、またはマウスが領域から外れた際、継続値を初期値に戻す
    function drawEnd() {
        mouseX = "";
        mouseY = "";
    }

    //メニューのアイコン関係
    document.getElementById("clear").addEventListener("click", function() {

      ctx.beginPath();
      ctx.fillStyle = "#000";
      ctx.globalAlpha = 1.0;
      ctx.fillRect(0, 0, 700, 400);

    }, false);

    document.getElementById("transform").addEventListener("click", function() {

      var data = canvas.toDataURL();
      spinner.style.visibility = 'visible';

      var params = new URLSearchParams();
      params.append('data', data.replace(/^.*,/, ''));

      axios.post('http://127.0.0.1:4999/generate', params)
      .then(function(response) {
        transformed.src = 'data:image/png;base64,' + response.data;

        spinner.style.visibility = 'hidden';
      })
      .catch(function() {
        alert('tranform failed');
        spinner.style.visibility = 'hidden';
      });

    }, false);

    spinner.style.top = (window.outerHeight - spinner.clientHeight) * 0.48 + 'px';
})();
