// ==UserScript==
// @name         Download Song on Youtube Music w/jQuery
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://music.youtube.com/*
// @require      https://code.jquery.com/jquery-3.3.1.slim.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var lastSongTitle = "";
    var songDiv = null;

    function getSongTitle() {

        var playerBar = $("ytmusic-player-bar");

        if (playerBar.height() > 0) {
            // console.log("player bar visible");

            if (songDiv === null) {
                songDiv = $("div.ytmusic-player-bar > yt-formatted-string.ytmusic-player-bar");
            }

            var title = songDiv.text();
            var artist = $("span.ytmusic-player-bar a.yt-simple-endpoint").get(0).text;

            var currentSongTitle = title + " - " + artist;

            if (lastSongTitle !== currentSongTitle) {
                // Do the updates
                lastSongTitle = currentSongTitle;
                console.log("Downloading info: " + currentSongTitle);
                var blob = new Blob([currentSongTitle], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "nowPlaying.txt");
            }
        }
    }

    // Your code here...
    $(document).ready(function() {
        setInterval(getSongTitle, 5000);
    });
})();