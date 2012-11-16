/*
 * This is a simple service. Most of the transactions are handled by websockets, such as the exchange of information to create
 * a peerconnection. 
 * 
 * However I need some way for the server to assign a client a session, and then logged the session details into a database.
 * 
 * For this fake environment im simply writting the files out to a directory. Since this is throw away code, I havent spent
 * much time making it look pretty.
 * 
 */ 





using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

//To allow service calls
using System.Web.Script.Services;

//To create file 
using System.IO;

namespace webRTC
{
    /// <summary>
    /// Summary description for data
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class data : System.Web.Services.WebService
    {


        [Serializable()]
        public class BaseReply
        {
            public bool successful = true;
            public string error = "";
        }



        #region "Starting A Session"
        [Serializable()]
        public class SessionStartReply : BaseReply
        {
            public string session;
        }

        [Serializable()]
        public class SessionStartRequest
        {
            public string name;
            public bool isvideo;
        }

        /*
         * User calls in to start their session
         * They send in their name and if its video or text
         * They are sent their session guid
         */
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public SessionStartReply SessionStart(SessionStartRequest request)
        {
            SessionStartReply reply = new SessionStartReply();

            try
            {
                //Get user their session
                reply.session = Guid.NewGuid().ToString("N");

                //Write session
                //(In real life you replace this with a sql database)
                string filepath;
                if (request.isvideo)
                {
                    filepath = System.Web.HttpRuntime.AppDomainAppPath + "Sessions\\Video\\" + reply.session;
                }
                else
                {
                    filepath = System.Web.HttpRuntime.AppDomainAppPath + "Sessions\\Text\\" + reply.session;
                }

                using (StreamWriter sw = File.AppendText(filepath))
                {
                    sw.WriteLine(request.name);
                }
            }
            catch (Exception ex)
            {

                reply.error += "\n" + ex.Message;
                reply.successful = false;
            }

            return reply;
        }
        #endregion

        #region "Get List Of Open Sessions"
        [Serializable()]
        public class SessionGetOpenReply : BaseReply
        {
            public List<Session> video;
            public List<Session> text;
        }
        [Serializable()]
        public class Session
        {
            public string name;
            public string guid;
        }

        /*
         * Admin calls this to get a list of open session
         * They are sent a list of names|guids
         */ 
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public SessionGetOpenReply SessionGetOpen()
        {
            SessionGetOpenReply reply = new SessionGetOpenReply();
            reply.video = new List<Session>();
            reply.text = new List<Session>();
            try
            {
                string filepath = System.Web.HttpRuntime.AppDomainAppPath + "Sessions\\Video";
                string[] files = Directory.GetFiles(filepath, "*", SearchOption.TopDirectoryOnly);
                foreach (string f in files)
                {
                    string readText = File.ReadAllText(f);
                    reply.video.Add(new Session
                    {
                         guid = System.IO.Path.GetFileName(f),
                         name= readText
                    });
                }


                filepath = System.Web.HttpRuntime.AppDomainAppPath + "Sessions\\Text";
                files = Directory.GetFiles(filepath, "*", SearchOption.TopDirectoryOnly);
                foreach (string f in files)
                {
                    string readText = File.ReadAllText(f);
                    reply.text.Add(new Session
                    {
                        guid = System.IO.Path.GetFileName(f),
                        name = readText
                    });
                }
            }
            catch (Exception ex)
            {
                reply.error += "\n" + ex.Message;
                reply.successful = false;
            }

            return reply;
        }
        #endregion


        #region "Claim A Sessions"
        [Serializable()]
        public class SessionGetOpenRequest
        {
            public string session;
            public bool isvideo;
        }
      

        /*
         * Admin calls this to get a list of open session
         * They are sent a list of names|guids
         */
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public BaseReply SessionClaimOpen(SessionGetOpenRequest request)
        {
            BaseReply reply = new BaseReply(); 
            try
            {
                string filepath;
                if (request.isvideo) {
                   filepath  = System.Web.HttpRuntime.AppDomainAppPath + "Sessions\\Video\\";
                } else {
                     filepath = System.Web.HttpRuntime.AppDomainAppPath + "Sessions\\Text\\";
                }
                filepath += request.session;

                if (File.Exists(filepath))
                {
                    File.Delete(filepath);
                }
            }
            catch (Exception ex)
            {
                reply.error += "\n" + ex.Message;
                reply.successful = false;
            }

            return reply;
        }
        #endregion
    }
}
