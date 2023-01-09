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
using System.Text.Json;

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
                await _client.Cypher.Match("(pr:Program),(o:Oblast)")
                                    .Where((Program pr, Oblast o)=> o.Id==s && pr.Id==p.Id)
                                    .Create("(pr)-[r:Obuhvata]->(o)")
                                    .Create("(pr)<-[r1:PripadaProgramu]-(o)")
                                    .ExecuteWithoutResultsAsync();
            }
            await _client.Cypher.Match("(u:Univerzitet),(pr:Program)")
                                .Where((Univerzitet u,Program pr)=> u.Id==idUniverziteta && pr.Id==p.Id)
                                .Create("(u)-[r:Sadrzi]->(pr)")
                                .ExecuteWithoutResultsAsync();

            return Ok();
        }
        [HttpGet]
        [Route("VratiProgram/{idPrograma}")]
        public async Task<ActionResult> VratiProgram(string idPrograma)
        {
            var program = await _client.Cypher.Match("(p:Program)")
                                        .Where((Program p)=> p.Id==idPrograma)
                                        .Return(p => p.As<Program>())
                                        .ResultsAsync;
            if(program!=null)
            {
                return Ok(program.Select(r=>
                            new{
                                id=r.Id,
                                naziv=r.Naziv,
                                trajanje=r.Trajanje,
                                brojMesta=r.BrojMesta,
                                nivoStudija=r.NivoStudija,
                                opis=r.Opis,
                                jezik=r.Jezik
                            }));
            }
            else
            {
                return BadRequest("Ne postoji program");
            }
        }
        [HttpGet]
        [Route("VratiSvePrograme/{drzavaId}/{gradId}/{uniId}/{nivo}/{listaOblasti}")]
        public async Task<ActionResult> VratiSvePrograme(string drzavaId,string gradId,string uniId,string nivo,string listaOblasti)
        {
            if (listaOblasti=="nema")
            {
                if(String.IsNullOrWhiteSpace(nivo))
                {
                    if(String.IsNullOrWhiteSpace(drzavaId))
                    {
                        return BadRequest("Morate uneti neki parametar za pretragu!");
                    }
                    else
                    {
                         if(String.IsNullOrWhiteSpace(gradId))// preetraga samo po drzavi
                        {
                            var res= await _client.Cypher.Match("(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                        .Where((Drzava d)=>d.Id==drzavaId)
                                                        .Return(p=>p.As<Program>())
                                                        .ResultsAsync;
                            if(res.Count()!=0)
                            {
                                 return Ok(res.Select(r=>
                                    new{
                                        id=r.Id,
                                        naziv=r.Naziv,
                                        trajanje=r.Trajanje,
                                        brojMesta=r.BrojMesta,
                                        nivoStudija=r.NivoStudija,
                                        opis=r.Opis,
                                        jezik=r.Jezik
                                    }));
                            }
                            else
                            {
                                return BadRequest("Nema rezultata pretrage");
                            }
                           
                        }
                        else
                        {
                            if(String.IsNullOrWhiteSpace(uniId))// grad i drzava
                                {
                                    var res= await _client.Cypher.Match("(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                            .Where((Drzava d,Grad g)=>d.Id==drzavaId && g.Id==gradId)
                                                            .Return(p=>p.As<Program>())
                                                            .ResultsAsync;
                                    if(res.Count()!=0)
                                    {
                                        return Ok(res.Select(r=>
                                            new{
                                                id=r.Id,
                                                naziv=r.Naziv,
                                                trajanje=r.Trajanje,
                                                brojMesta=r.BrojMesta,
                                                nivoStudija=r.NivoStudija,
                                                opis=r.Opis,
                                                jezik=r.Jezik
                                            }));
                                    }
                                    else
                                    {
                                        return BadRequest("Nema rezultata pretrage");
                                    }
                                }
                            else
                            {
                                var res= await _client.Cypher.Match("(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                    .Where((Drzava d,Grad g,Univerzitet u)=>d.Id==drzavaId && g.Id==gradId && u.Id==uniId)
                                                    .Return(p=>p.As<Program>())
                                                    .ResultsAsync;
                                if(res.Count()!=0)
                                {
                                    return Ok(res.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                            }
                        }

                    }
                }
                else
                {
                    if(String.IsNullOrWhiteSpace(drzavaId))
                    {
                        var res= await _client.Cypher.Match("(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                    .Where((Program p)=>p.NivoStudija==nivo)
                                                    .Return(p=>p.As<Program>())
                                                    .ResultsAsync;
                                if(res.Count()!=0)
                                {
                                    return Ok(res.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                    }
                    else
                    {
                        if(String.IsNullOrWhiteSpace(gradId))
                        {
                            var res= await _client.Cypher.Match("(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                    .Where((Drzava d,Program p)=>d.Id==drzavaId && p.NivoStudija==nivo)
                                                    .Return(p=>p.As<Program>())
                                                    .ResultsAsync;
                                if(res.Count()!=0)
                                {
                                    return Ok(res.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                        }
                        else
                        {
                            if(String.IsNullOrWhiteSpace(uniId))
                            {
                                var res= await _client.Cypher.Match("(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                    .Where((Drzava d,Grad g,Program p)=>d.Id==drzavaId && g.Id==gradId && p.NivoStudija==nivo)
                                                    .Return(p=>p.As<Program>())
                                                    .ResultsAsync;
                                if(res.Count()!=0)
                                {
                                    return Ok(res.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                            }
                            else
                            {
                                var res= await _client.Cypher.Match("(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                    .Where((Drzava d,Grad g,Univerzitet u,Program p)=>d.Id==drzavaId && g.Id==gradId && u.Id==uniId && p.NivoStudija==nivo)
                                                    .Return(p=>p.As<Program>())
                                                    .ResultsAsync;
                                if(res.Count()!=0)
                                {
                                    return Ok(res.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                if(String.IsNullOrWhiteSpace(nivo))
                {
                    if(String.IsNullOrWhiteSpace(drzavaId))
                    {
                        string[] pojedinacniID = listaOblasti.Split("#");
                        List<string> programi= new List<string>();
                        List<Program> deserializedProg= new List<Program>();

                        foreach(string s in pojedinacniID)
                        {
                            var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                        .Where((Oblast o)=>o.Id==s)
                                                        .Return(p=>p.As<Program>())
                                                        .ResultsAsync;
                            foreach (var r in res)
                                if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                    {
                                        programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                        deserializedProg.Add(r);
                                    }
                        }
                        
                        if(deserializedProg.Count()!=0)
                        {
                            return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                        }
                        else
                        {
                            return BadRequest("Nema rezultata pretrage");
                        }
                        
                    }
                    else
                    {
                        if(String.IsNullOrWhiteSpace(gradId))
                        {
                            string[] pojedinacniID = listaOblasti.Split("#");
                            List<string> programi= new List<string>();
                            List<Program> deserializedProg= new List<Program>();

                            foreach(string s in pojedinacniID)
                            {
                                var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                            .Where((Oblast o,Drzava d)=>o.Id==s && d.Id==drzavaId)
                                                            .Return(p=>p.As<Program>())
                                                            .ResultsAsync;
                                foreach (var r in res)
                                    if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                        {
                                            programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                            deserializedProg.Add(r);
                                        }
                            }
                    
                            if(deserializedProg.Count()!=0)
                            {
                                 return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                            }
                            else
                            {
                                return BadRequest("Nema rezultata pretrage");
                            }
                        }
                        else
                        {
                            if(String.IsNullOrWhiteSpace(uniId))
                            {
                                string[] pojedinacniID = listaOblasti.Split("#");
                                List<string> programi= new List<string>();
                                List<Program> deserializedProg= new List<Program>();

                                foreach(string s in pojedinacniID)
                                {
                                    var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                                .Where((Oblast o,Drzava d,Grad g)=>o.Id==s&&d.Id==drzavaId&&g.Id==gradId)
                                                                .Return(p=>p.As<Program>())
                                                                .ResultsAsync;
                                    foreach (var r in res)
                                        if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                            {
                                                programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                                deserializedProg.Add(r);
                                            }
                                }
                                
                                if(deserializedProg.Count()!=0)
                                {
                                     return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                            }
                            else
                            {
                                string[] pojedinacniID = listaOblasti.Split("#");
                                List<string> programi= new List<string>();
                                List<Program> deserializedProg= new List<Program>();

                                foreach(string s in pojedinacniID)
                                {
                                    var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                                .Where((Oblast o,Drzava d,Grad g,Univerzitet u)=>o.Id==s&&d.Id==drzavaId&&g.Id==gradId&&u.Id==uniId)
                                                                .Return(p=>p.As<Program>())
                                                                .ResultsAsync;
                                    foreach (var r in res)
                                        if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                            {
                                                programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                                deserializedProg.Add(r);
                                            }
                                }
                                
                                if(deserializedProg.Count()!=0)
                                {
                                     return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                            }
                        }
                    }
                }
                else
                {
                    if(String.IsNullOrWhiteSpace(drzavaId))
                    {
                        string[] pojedinacniID = listaOblasti.Split("#");
                        List<string> programi= new List<string>();
                        List<Program> deserializedProg= new List<Program>();

                        foreach(string s in pojedinacniID)
                        {
                            var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                        .Where((Oblast o,Program p)=>o.Id==s&&p.NivoStudija==nivo)
                                                        .Return(p=>p.As<Program>())
                                                        .ResultsAsync;
                            foreach (var r in res)
                                if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                    {
                                        programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                        deserializedProg.Add(r);
                                    }
                        }
                    
                       if(deserializedProg.Count()!=0)
                        {
                             return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                        }
                        else
                        {
                            return BadRequest("Nema rezultata pretrage");
                        }
                    }
                    else
                    {
                        if(String.IsNullOrWhiteSpace(gradId))
                        {
                            string[] pojedinacniID = listaOblasti.Split("#");
                            List<string> programi= new List<string>();
                            List<Program> deserializedProg= new List<Program>();

                            foreach(string s in pojedinacniID)
                            {
                                var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                            .Where((Oblast o,Program p,Drzava d)=>d.Id==drzavaId&& o.Id==s&&p.NivoStudija==nivo)
                                                            .Return(p=>p.As<Program>())
                                                            .ResultsAsync;
                                foreach (var r in res)
                                    if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                        {
                                            programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                            deserializedProg.Add(r);
                                        }
                            }
                        
                            if(deserializedProg.Count()!=0)
                            {
                                 return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                            }
                            else
                            {
                                return BadRequest("Nema rezultata pretrage");
                            }
                        }
                        else
                        {
                            if(String.IsNullOrWhiteSpace(uniId))
                            {
                                string[] pojedinacniID = listaOblasti.Split("#");
                                List<string> programi= new List<string>();
                                List<Program> deserializedProg= new List<Program>();

                                foreach(string s in pojedinacniID)
                                {
                                    var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                                .Where((Oblast o,Program p,Drzava d,Grad g)=>d.Id==drzavaId&& o.Id==s&&p.NivoStudija==nivo&&g.Id==gradId)
                                                                .Return(p=>p.As<Program>())
                                                                .ResultsAsync;
                                    foreach (var r in res)
                                        if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                            {
                                                programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                                deserializedProg.Add(r);
                                            }
                                }
                            
                                if(deserializedProg.Count()!=0)
                                {
                                     return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                            }
                            else
                            {
                                string[] pojedinacniID = listaOblasti.Split("#");
                                List<string> programi= new List<string>();
                                List<Program> deserializedProg= new List<Program>();

                                foreach(string s in pojedinacniID)
                                {
                                    var res= await _client.Cypher.Match("(o:Oblast)-[r5:PripadaProgramu]->(p:Program)<-[r:Sadrzi]-(u:Univerzitet)-[r1:Pripada]->(g:Grad)-[r2:seNalazi]->(d:Drzava)")
                                                                .Where((Oblast o,Program p,Drzava d,Grad g,Univerzitet u)=>d.Id==drzavaId&& o.Id==s&&p.NivoStudija==nivo&& g.Id==gradId&&u.Id==uniId)
                                                                .Return(p=>p.As<Program>())
                                                                .ResultsAsync;
                                    foreach (var r in res)
                                        if(!programi.Contains(System.Text.Json.JsonSerializer.Serialize<Program>(r)))
                                            {
                                                programi.Add(System.Text.Json.JsonSerializer.Serialize<Program>(r));
                                                deserializedProg.Add(r);
                                            }
                                }
                            
                                if(deserializedProg.Count()!=0)
                                {
                                     return Ok(deserializedProg.Select(r=>
                                        new{
                                            id=r.Id,
                                            naziv=r.Naziv,
                                            trajanje=r.Trajanje,
                                            brojMesta=r.BrojMesta,
                                            nivoStudija=r.NivoStudija,
                                            opis=r.Opis,
                                            jezik=r.Jezik
                                        }));
                                }
                                else
                                {
                                    return BadRequest("Nema rezultata pretrage");
                                }
                            }
                        }
                    }
                }
            }
        
        }
    }
}