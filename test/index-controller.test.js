const request = require("request");
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

const urlBase = "http://localhost:3000"


describe("Teste API",function(){
    it("Verificando se o servidor está no ar",function(done){
      request.get(
        {
          url : urlBase + "/server-info"
        },
        function(error, response, body){
        
          console.log("response", response);
          console.log("body", body);

          var _body = {};
          try{
            _body = JSON.parse(body);
          }
          catch(e){
            _body = {};
          }
          console.log("_body", _body);
          //expect(response.statusCode).to.equal(200);
          // agora, verificamos se retornou a propriedade cards
          /*if( _body.should.have.property('message') ){
            console.log(_body.message);
            expect(_body.message).to.have.to.be.equal("The server is running!");
          }*/
  
          done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
        }
      );
    });
});

