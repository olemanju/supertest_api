import supertest from "supertest";
import { expect } from "chai";
import { describe } from "mocha";
import qa from "../config/qa";

const request = supertest(qa.baseurl)

const TOKEN = "d4c89a22b28a3b6eab182636ab4e67f63798688668164eb241ad46c637b30f8f"

describe("First Post call", () => {

    it("Post call", () => {

        const payload =
        {
            email: `test${Math.floor(Math.random() * 9999)}@gmail.com`,
            name: "Rajini kanth",
            gender: "male",
            status: "active"
        }
        var endpoint = 'users'
        request.post(endpoint)
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(payload)
            .then((res) => {
                console.log(res.body)
                //Status code is
                console.log(res.body.code)

                expect(res.body.code).to.be.equal(201)
                console.log(res.body.data.gender)
                expect(res.body.data.gender).to.be.equal(payload.gender)
                expect(res.body.data.status).to.be.equal(payload.status)
            })
        //console.log(response.body)


    })
})