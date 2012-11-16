using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR.Hubs;
namespace webRTC
{
    [HubName("pC")]
    public class MoveShapeHub : Hub
    {
        /*
         * PC2
         * 
         */
        public void AddIce(string session, string ice, int index)
        {
            Clients[session].iceAdded(Context.ConnectionId, ice, index);
        }

        public void AddOffer(string session, string offer)
        {
            Clients[session].offerAdded(Context.ConnectionId, offer);
        }

        public void AddAnswer(string session, string answer)
        {
            Clients[session].answerAdded(Context.ConnectionId, answer);
        }
        public void PauseSession(string session)
        {
            Clients[session].sessionPaused(Context.ConnectionId);
        }
        public void JoinSession(string session)
        {
            Groups.Add(Context.ConnectionId, session);
        }
    }
}