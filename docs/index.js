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
        if (mouseX === "") {
            ctx.moveTo(X, Y);
        } else {
            ctx.moveTo(mouseX, mouseY);
        }
        ctx.lineTo(X, Y);
        ctx.lineCap = "round";
        ctx.lineWidth = defosize * 2;
        ctx.strokeStyle = defocolor;
        ctx.stroke();
        mouseX = X;
        mouseY = Y;
    };

    function drawEnd() {
        mouseX = "";
        mouseY = "";
    }

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

      axios.post('https://n2p.ytakzk.me/generate', params)
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
