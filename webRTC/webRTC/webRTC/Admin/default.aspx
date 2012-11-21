<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="webRTC.Admin._default" %>

<!DOCTYPE html>

<html lang="en">
<head id="Head1" runat="server">
    <meta charset="utf-8" />
    <title>Admin</title>
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
<body>
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

    <div class="container">
        <div class="row-fluid">
            <div class="span9">
                <video id="vid2" autoplay style="width: 100%;"></video>
            </div>
            <div class="span3">
                <h3>Open Sessions <%--<i class="icon-th-list" title="Sort by type or first in"></i>--%></h3>
                <div class="well sidebar-nav">
                    <div class="nav-header">Text</div>
                    <ul class="nav nav-list" id="PendingIms"></ul>
                    <div class="nav-header">Video</div>
                    <ul class="nav nav-list" id="PendingVideo"></ul>
                </div>
                <video id="vid1" autoplay style="width: 100%;"></video>
            </div>
        </div>
    </div>


    <script src="../Scripts/jquery-1.8.2.min.js"></script>
    <script src="../Scripts/jquery.signalR-0.5.3.js"></script>
    <script type="text/javascript" src='<%= ResolveClientUrl("~/signalr/hubs") %>'></script>
    <script src="../Scripts/jsrender.js"></script>
    <script id="tmplSessions" type="text/x-jsrender">
         <li><a href="#" class="im" data-session="{{:guid}}">{{:name}}</a></li>
    </script>
    <script id="tmplSessionsVideo" type="text/x-jsrender">
         <li><a href="#" class="video" data-session="{{:guid}}">{{:name}} <i class="icon-facetime-video"></i></a></li>
    </script>
    <script src="admin.js"></script>
</body>
</html>
