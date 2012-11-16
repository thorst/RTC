/// <reference path="../Scripts/jquery-1.8.2.js" />

var
    hub = null
    , iceindex = 1
    , pc2 =null
    , remoteStream
    , servers
;


pc2 = new webkitRTCPeerConnection(servers);
pc2.onicecandidate = iceCallback2;
pc2.onaddstream = gotRemoteStream;

function iceCallback2(event) {
    if (event.candidate) {
        hub.addIce(session, JSON.stringify(event.candidate), iceindex);
        console.log("Sent Ice #" + iceindex);
        iceindex++;
    }
}

function gotRemoteStream(e) {
    console.log("Received remote stream");
    remoteStream = e.stream;
    waitForRemoteVideo();

}
function waitForRemoteVideo() {
    // console.log("waitForRemoteVideo");
    // console.log(remoteStream);
    // if (remoteStream.videoTracks.length === 0 || remoteVideo.currentTime > 0) {
    setTimeout(function () { vid2.src = webkitURL.createObjectURL(remoteStream); }, 1000);
    //} else {
    //   setTimeout(waitForRemoteVideo, 100);
    // }
}
function gotDescription2(desc) {
    pc2.setLocalDescription(desc);

    AdminDesc = desc;

    console.log('Answer from pc2');
    hub.addAnswer(session, JSON.stringify(desc));
}

function start() {
    console.log("Requesting local stream");
    navigator.webkitGetUserMedia(
            { audio: true, video: true },
            function (stream) {
                console.log("Received local stream");
                vid1.src = webkitURL.createObjectURL(stream);
                // localstream = stream;
                pc2.addStream(stream);                             //Add the stream
                console.log("Adding Local Stream to peer connection");

            },
            function () { }
        );
}

var session = {
    token: null,
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
            session.token = data.session;
            $("#login").hide();
            $("#video").show();
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

        start();
    });
});