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
    public class ProgramController : ControllerBase
    {
        private readonly IGraphClient _client;

        public ProgramController(IGraphClient client)
        {
            _client = client;
        }
        [HttpPost]
        [Route("DodajProgram/{naziv}/{trajanje}/{brojMesta}/{nivoStudija}/{opis}/{jezik}/{oblasti}/{idUniverziteta}")]
        public async Task<ActionResult> DodajProgram(string naziv,int trajanje,int brojMesta,string nivoStudija,string opis,string jezik,string oblasti,string idUniverziteta)
        {
            Program p = new Program();
            p.Id = Guid.NewGuid().ToString();
            p.Naziv = naziv;
            p.Trajanje = trajanje;
            p.BrojMesta = brojMesta;
            p.NivoStudija = nivoStudija;
            p.Opis = opis;
            p.Jezik = jezik;

            

            await _client.Cypher.Create("(p:Program $p)")
                                .WithParam("p",p)
                                .ExecuteWithoutResultsAsync();
            
            string[] pojedinacniID = oblasti.Split("#");
            foreach(string s in pojedinacniID)
            {
                await _client.Cypher.Match("(p:Program),(o:Oblast)")
                                    .Where((Program p, Oblast o)=> o.Id==s)
                                    .Create("(p)-[r:Obuhvata]->(o)")
                                    .Create("(p)<-[r1:PripadaProgramu]-(o)")
                                    .ExecuteWithoutResultsAsync();
            }
            await _client.Cypher.Match("(u:Univerzitet),(p:Program)")
                                .Where((Univerzitet u,Program p)=> u.Id==idUniverziteta)
                                .Create("(u)-[r:Sadrzi]->(p)")
                                .ExecuteWithoutResultsAsync();

            return Ok();
        }
    }
}