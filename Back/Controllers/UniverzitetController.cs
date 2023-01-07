using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Neo4jClient;
using Neo4jClient.Cypher;
using Newtonsoft.Json;

namespace NeoProba.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UniverzitetController : ControllerBase
    {
        private readonly IGraphClient _client;

        public UniverzitetController(IGraphClient client)
        {
            _client = client;
        }
        [HttpPost]
        [Route("DodajUniverzitet/{naziv}/{opis}/{kontakt}/{adresa}/{skolarina}")]
        public async Task<ActionResult> DodajUniverzitet(string naziv,string opis,string kontakt,string adresa,int skolarina)
        {
            Univerzitet u = new Univerzitet();
            u.Id = Guid.NewGuid().ToString();
            u.Naziv = naziv;
            u.Opis = opis;
            u.Kontakt = kontakt;
            u.Adresa = adresa;
            u.Skolarina = skolarina;
            await _client.Cypher.Create("(u:Univerzitet $u)")
                            .WithParam("u",u)
                            .ExecuteWithoutResultsAsync();
            
            return Ok("Dodat univerzitet");

        }
        [HttpGet]
        [Route("PreuzmiSveUniverzitete")]
        public async Task<ActionResult> PreuzmiSveUniverzitete()
        {
            var uni = await _client.Cypher.Match("(u:Univerzitet)")
                                            .Return(u => u.As<Univerzitet>())
                                            .ResultsAsync;
            return Ok(uni);
        }
        [HttpPost]
        [Route("DodajUniverzitetGradu/{idUniverziteta}/{idGrada}")]
        public async Task<ActionResult> DodajUniverzitetGradu(string idUniverziteta,string idGrada)
        {
            await _client.Cypher.Match("(u:Univerzitet),(g:Grad)")
                                .Where((Univerzitet u, Grad g)=>u.Id==idUniverziteta && g.Id==idGrada)
                                .Create("((u)-[r:Pripada]->(g))")
                                .ExecuteWithoutResultsAsync();
            return Ok("Univerzitet dodat gradu");
        }
    }
}