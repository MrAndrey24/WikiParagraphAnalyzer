using App_Logic;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Web_API.Controllers
{
    public class ParagraphController : ApiController
    {
        [HttpGet]
        [Route("api/Text/GetAllText")]
        public async Task<object> GetTextByRequest()
        {
            return await TextManager.GetTextAnalyticsAsync();
        }
    }
}
