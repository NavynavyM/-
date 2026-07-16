
   (function() {
    const _onError = Graphics.printError;

    Graphics.printError = function(name, message) {
        _onError.call(this, name, message);

        const img = document.createElement("img");
        img.src = "img/pictures/error.png";
        img.style.position = "absolute";
        img.style.left = "50%";
        img.style.top = "20px";
        img.style.transform = "translateX(-50%)";
        img.style.zIndex = "1000";

        document.body.appendChild(img);
    };
})();