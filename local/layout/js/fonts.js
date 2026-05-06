var html = document.documentElement;

// if (sessionStorage.fontsLoaded) {
if (true) {
    html.classList.add('fonts-loaded');
} else {
    var script = document.createElement('script');
    script.src = 'local/layout/js/fontfaceobserver.js';
    script.async = true;

    script.onload = function () {
        var fontMerriweather300 = new FontFaceObserver('Merriweather', {
            weight: '300'
        });
        var fontMerriweather400 = new FontFaceObserver('Merriweather', {
            weight: 'normal'
        });
        var fontMerriweather700 = new FontFaceObserver('Merriweather', {
            weight: 'bold'
        });
        var fontRoboto300 = new FontFaceObserver('Roboto', {
            weight: '300'
        });
        var fontRoboto400 = new FontFaceObserver('Roboto', {
            weight: 'normal'
        });
        var fontRoboto500 = new FontFaceObserver('Roboto', {
            weight: '500'
        });

        Promise.all([
            fontMerriweather300.load(),
            fontMerriweather400.load(),
            fontMerriweather700.load(),
            fontRoboto300.load(),
            fontRoboto400.load(),
            fontRoboto500.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}
