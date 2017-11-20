(function() {

    var canvas = document.getElementById('app');
    var transformed = document.getElementById('transformed');
    var spinner = document.getElementById('spinner');

    var defosize = 1.0;
    var defocolor = "#fff";
    var defoalpha = 1.0;

    var mouseX = "";
    var mouseY = "";

    var randomIndex = 1;

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 1000, 1000);

    canvas.width *= devicePixelRatio;
    canvas.height *= devicePixelRatio;
    canvas.style.width = String(canvas.width / devicePixelRatio) + "px";
    canvas.style.height = String(canvas.height / devicePixelRatio) + "px";

    canvas.addEventListener('mousemove', onMove, false);
    canvas.addEventListener('mousedown', onClick, false);
    canvas.addEventListener('mouseup', drawEnd, false);
    canvas.addEventListener('mouseout', drawEnd, false);

    function onMove(e) {
        if (e.buttons === 1 || e.witch === 1) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left) * devicePixelRatio;
            var Y = ~~(e.clientY - rect.top) * devicePixelRatio;;
            draw(X, Y);
        };
    };

    function onClick(e) {
        if (e.button === 0) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left) * devicePixelRatio;;
            var Y = ~~(e.clientY - rect.top) * devicePixelRatio;;

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
      ctx.fillRect(0, 0, 1000, 1000);

    }, false);

    document.getElementById("random").addEventListener("click", function() {

      randomIndex = (randomIndex < 4) ? randomIndex + 1 : 1;
      ctx.drawImage(document.getElementById('a' + randomIndex), 0, 0);
      transformed.src = './examples/B' + randomIndex + '.jpg';
    }, false);

    document.getElementById("transform").addEventListener("click", function() {

      var data = canvas.toDataURL();
      spinner.style.visibility = 'visible';

      var params = new URLSearchParams();
      params.append('data', data.replace(/^.*,/, ''));
      params.append('model', 'edges2architecture_pix2pix');

      axios.post('https://e2a.ytakzk.me/generate', params)
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

    ctx.drawImage(document.getElementById('a1'), 0, 0);

})();
