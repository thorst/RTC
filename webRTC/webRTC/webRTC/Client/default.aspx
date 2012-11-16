<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="webRTC.Client._default" %>

<!DOCTYPE html>

<html lang="en">
<head runat="server">
    <meta charset="utf-8" />
    <title>Client</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <%--This wasnt stretching the buttons to fit the text inside. Havent checked into why--%>
    <%--<link href="../Content/bootstrap.min.css" rel="stylesheet" />--%>
    <link href="../Content/bootstrap-alt.css" rel="stylesheet" />
    <style>
        body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
        }

        video {
            border-style: solid;
            border-width: 1px;
        }
    </style>
    <link href="../Content/bootstrap-responsive.min.css" rel="stylesheet" />
    <link href="../Content/font-awesome.css" rel="stylesheet" />
</head>

<body id="body">
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
            <div class="container">
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <a class="brand" href="#">oRTC</a>
                <%--<div class="nav-collapse collapse">
                <ul class="nav">
                  <li class="active"><a href="#">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>--%><!--/.nav-collapse -->
            </div>
        </div>
    </div>

    <div id="login" class="container">
        <div class="row-fluid">
            <div class="span12">
                <input id="name" type="text" placeholder="Name" class="span12" style="font-size: 75px; height: 100px; line-height: 100px;">
            </div>
        </div>
        <div class="row-fluid">
            <div class="span6">
                <button id="text" type="submit" class="btn btn-large btn-block disabled" type="button">
                    <i style="font-size: 340px;" class="icon-comments-alt"></i>
                    <div style="font-size: 150px;">Text</div>
                </button>
            </div>
            <div class="span6">
                <button type="submit" id="video" class="btn btn-large btn-block" type="button">
                    <i style="font-size: 340px;" class="icon-facetime-video"></i>
                    <div style="font-size: 150px;">Video</div>
                </button>
            </div>
        </div>
    </div>
    <div id="video" class="hide container">
        <div class="row-fluid">
            <div class="span12" style="position: relative">
                <video id="vid2" autoplay style="width: 100%;"></video>
                <video id="vid1" autoplay style="width: 300px; max-height: 300px; position: absolute; bottom: 0; right: 0;"></video>
            </div>
        </div>
    </div>
    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/jquery.signalR-0.5.2.js"></script>
    <script src="client.js"></script>
</body>
</html>
