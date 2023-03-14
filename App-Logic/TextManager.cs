using DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace App_Logic
{
    public class TextManager
    {
        public static async Task<object> GetTextAnalyticsAsync()
        {
            try
            {
                var urlwikiReader = "https://wiki-reader-lab.azurewebsites.net/";

                var client = new HttpClient
                {
                    Timeout = new TimeSpan(0, 0, 20)
                };

                var result = await client.GetAsync(urlwikiReader + "api/Text/GetAllText");

                if (result.IsSuccessStatusCode)
                {
                    var jsonObject = await result.Content.ReadAsStringAsync();


                    var dataObject = JsonConvert.DeserializeObject<Text>(jsonObject);
                    var paragraphs = dataObject.paragraphsList;

                    // Get the text that starts with "A"
                    var wordsStartingWithMyName = paragraphs
                                        .SelectMany(p => p.paragraphValue.Split(' ', (char)StringSplitOptions.RemoveEmptyEntries))
                                        .Where(w => w.StartsWith("A", StringComparison.OrdinalIgnoreCase))
                                        .Distinct() // remove duplicates
                                        .ToList();


                    // Get the average words per paragraph
                    var averageWordsPerParagraph = paragraphs.Select(p => p.paragraphValue.Split(' ').Length).Average();

                    // Get the paragraph with the most words
                    var paragraphWithMostWords = paragraphs.OrderByDescending(p => p.paragraphValue.Split(' ').Length).FirstOrDefault();

                    // Get the paragraph with the fewest words
                    var paragraphWithFewestWords = paragraphs.OrderBy(p => p.paragraphValue.Split(' ').Length).FirstOrDefault();

                    return new { wordsStartingWithMyName, averageWordsPerParagraph, paragraphWithMostWords, paragraphWithFewestWords };

                }
                else
                {
                    return new { Response = result.StatusCode };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }





    }
}
