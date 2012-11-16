var
           servers = null
           , hub = null
           , pc1 = null
           , localstream = null
           , session = null
           , iceindex = 1
;

pc1 = new webkitRTCPeerConnection(servers);             //Create local peer connection
pc1.onicecandidate = iceCallback1;



Chat = {
    GetOpen: function () {
        $.when(
            $.ajax({
                type: "GET",
                url: "../data.asmx/SessionGetOpen",
                contentType: "application/json; charset=utf-8"
            })
        )
        .fail(function (jqXHR, textStatus, errorThrown) {

        })
        .done(function (data) {
            console.log(data);

            data = data.d;
            if (data.successful == null || !data.successful) {
                return;
            }

            $("#PendingIms").html($("#tmplSessions").render(data.text));
            $("#PendingVideo").html($("#tmplSessionsVideo").render(data.video));

        });
    },
    ClaimOpen: function (d) {

        var request = {
            session: d.session
            , isvideo: d.isvideo
        };
      
        $.when(
            $.ajax({
                type: "GET",
                url: "../data.asmx/SessionClaimOpen?request=" + JSON.stringify(request),
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
            d.o.remove();

            hub.joinSession(session);
            start();
        });
    }

};



//  pc1.onaddstream = gotRemoteStream;
// function gotRemoteStream(e) {
//     console.log("Received remote stream");
//     vid2.src = webkitURL.createObjectURL(e.stream);
// }
function iceCallback1(event) {
    if (event.candidate) {
        //console.log("Uploaded Ice");
        hub.addIce(session, JSON.stringify(event.candidate), iceindex);
        console.log("Sent Ice #" + iceindex);
        iceindex++;
    }
}
function gotDescription1(desc) {
    pc1.setLocalDescription(desc);
    console.log("Offer from pc1")
    hub.addOffer(session, JSON.stringify(desc));
}

function start() {
    console.log("Requesting local stream");
    navigator.webkitGetUserMedia(
            { audio: true, video: true },
            function (stream) {
                console.log("Received local stream");
                vid1.src = webkitURL.createObjectURL(stream);
                localstream = stream;
                pc1.addStream(localstream);                             //Add the stream
                console.log("Adding Local Stream to peer connection");
                pc1.createOffer(gotDescription1, null, { 'has_audio': true, 'has_video': true });
            },
            function () { }
        );
}


$(function () {
    /*
    Get the sessions that are open
    */
    Chat.GetOpen();
    hub = $.connection.pC;

    $.extend(hub, {
        iceAdded: function (cid, ice, index) {

            if (cid != $.connection.hub.id) {
                console.log("Received Ice #" + index + ":" + ice);
                var ec = JSON.parse(ice);

                ec = new RTCIceCandidate(ec);
                // ec.sdpMLineIndex = index;
                pc1.addIceCandidate(ec);
            }
        },
        offerAdded: function (cid, ice) {

            if (cid != $.connection.hub.id) {
                console.log("offerAdded:");
            }

        },
        answerAdded: function (cid, ice) {

            if (cid != $.connection.hub.id) {
                console.log("answerAdded:");
                var ec = JSON.parse(ice);
                ec = new RTCSessionDescription(ec);
                pc1.setRemoteDescription(ec);
                console.log(pc1);
                waitForRemoteVideo();
                //setTimeout(function () { vid2.src = webkitURL.createObjectURL(pc1.remoteStreams[0]); }, 1000);
            }

        }
    });
    function waitForRemoteVideo() {
        console.log("waitForRemoteVideo");
        console.log(pc1);
        // if (remoteStream.videoTracks.length === 0 || remoteVideo.currentTime > 0) {
        setTimeout(function () { vid2.src = webkitURL.createObjectURL(pc1.remoteStreams[0]); }, 1000);
        //} else {
        //  setTimeout(waitForRemoteVideo, 100);
        //}
    }
    $.connection.hub.start().done(function () {

        //hub.addIce("hy");
        //hub.addOffer("hy");
        //hub.addAnswer("hy");
    });
    $("#PendingIms,#PendingVideo").on('click', "a", function () {
        var o = $(this);
        //o.text()
        var d = {
            o: o
            ,session :o.attr('data-session')
            ,isvideo:o.hasClass('video')
            ,name:o.text()

        };
  
        session = d.session;
        Chat.ClaimOpen(d);

    });
});