/// <reference path="../Scripts/jquery-1.8.2.js" />

var session = {
    start: function (isvideo) {
        var request = {
            name: $("#name").val()
            , isvideo: isvideo
        };
        $.when(
            $.ajax({
                type: "GET",
                url: "../data.asmx/SessionStart?request=" + JSON.stringify(request),
                contentType: "application/json; charset=utf-8"
            })
        )
        .fail(function (jqXHR, textStatus, errorThrown) {

        })
        .done(function (data) {
            data = data.d;
            if (data.successful == null || !data.successful) {
                return;
            }
            alert('done');
        });
    }
};

$(function () {

    //User clicks the video button
    $("#video").click(function () {

        //Abort if there isnt a name
        if ($.trim($("#name").val()) === "") {
            alert("Need a name");
            return false;
        }


        //Get session guid
        session.start(true);
    });


    //Starting websockets
    hub = $.connection.pC;
    $.extend(hub, {
        iceAdded: function (cid, ice, index) {

            if (cid != $.connection.hub.id) {
                console.log("Received Ice #" + index + ":" + ice);
                var ec = JSON.parse(ice);

                ec = new RTCIceCandidate(ec);
                // ec.sdpMLineIndex = index;
                pc2.addIceCandidate(ec);
            }
        },
        offerAdded: function (cid, ice) {

            if (cid != $.connection.hub.id) {
                console.log("offerAdded:");
                var ec = JSON.parse(ice);
                ec = new RTCSessionDescription(ec)
                pc2.setRemoteDescription(ec);
                pc2.createAnswer(gotDescription2, null, { 'has_audio': true, 'has_video': true });
            }

        },
        answerAdded: function (cid, ice) {

            if (cid != $.connection.hub.id) {
                console.log("answerAdded:");
                var ec = JSON.parse(ice);
                ec = new RTCSessionDescription(ec);
                pc1.setRemoteDescription(ec);
            }

        }
    });

    //Start socket server, then start the video conf
    $.connection.hub.start().done(function () {
        hub.joinSession(session);

        setTimeout(start(), 1);
    });
});