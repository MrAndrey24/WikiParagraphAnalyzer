using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_UI.Controllers
{
    public class ParagraphController : Controller
    {
        // GET: Paragraph
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Paragraphs() 
        {
            return View();
        }


    }
}