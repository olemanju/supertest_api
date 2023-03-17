import supertest from "supertest";
import { expect } from "chai";
import { describe } from "mocha";


const request = supertest("https://gorest.co.in/public-api/")

const TOKEN = "d4c89a22b28a3b6eab182636ab4e67f63798688668164eb241ad46c637b30f8f"

describe("First PUT call", () => {

    it("put call", () => {

        const payload =
        {
            name: `achintya - ${Math.floor(Math.random() * 9999)}`,
            status: "active"
        }

        var endpoint = 'users/132'

        request.put(endpoint)
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(payload)
            .then((res) => {
                console.log(res.body)
                //Status code is
                console.log(res.body.code)
                //assertion
                expect(res.body.status).to.be.equal(payload.status)
                

                
            })
        //console.log(response.body)


    })
})