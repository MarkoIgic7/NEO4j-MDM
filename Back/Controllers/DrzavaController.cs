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
    public class DrzavaController : ControllerBase
    {
        private readonly IGraphClient _client;

        public DrzavaController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPost]
        [Route("DodajDrzavu/{naziv}")]
        public ActionResult DodajDrzavu(string naziv)
        {
            Drzava d = new Drzava();
            d.Naziv = naziv;
            _client.Cypher.Create("(d:Drzava $d)")
                            .WithParam("d",d)
                            .ExecuteWithoutResultsAsync();
            return Ok();
        }
        [HttpGet]
        [Route("PreuzmiDrzavu/{drzava}")]
        public async Task<ActionResult> PreuzmiDrzavu(string drzava)
        {
            var users = await _client.Cypher
                        .Match("(d:Drzava)")
                        .Where("d.Naziv='"+drzava+"'")
                        .With("d{.*, Id:id(d)} AS drzava")
                        .Return(drzava => drzava.As<Drzava>())
                        .ResultsAsync;
            return Ok(users);
        }
    }
}
