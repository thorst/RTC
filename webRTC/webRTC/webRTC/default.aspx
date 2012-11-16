<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="webRTC._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>oRTC Home</title>
    <link href="Content/bootstrap.min.css" rel="stylesheet" />
    <style>
        body {
            padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
        }
    </style>
    <link href="Content/bootstrap-responsive.min.css" rel="stylesheet" />
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
        <h1>Getting Started</h1>
        <p>In one tab open up the <a href="Client">Client</a></p>
        <p>In another tab open up the <a href="Admin">Admin</a></p>
    </div>
    <!-- /container -->


</body>
</html>
