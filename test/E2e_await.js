import supertest from "supertest";
import { expect } from "chai";
import { describe } from "mocha";
import qa from "../config/qa";
import { faker } from "@faker-js/faker";

let resourceId;
const request = supertest(qa.baseurl)

const TOKEN = "d4c89a22b28a3b6eab182636ab4e67f63798688668164eb241ad46c637b30f8f"

describe.only("This suite will do all CRUD opearations and dynamically using aync", () => {

    it.only("First insert the record in the system Post Call", async () => {
        const payload =
        {
            email: `test${Math.floor(Math.random() * 9999)}@gmail.com`,
            name: faker.name.firstName(),
            gender: 'male',
            status: "active"
        }

        var endpoint = 'users'
        const response = await request.post(endpoint)
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(payload)

        console.log("***********Post Call starts******************")
        console.log(response.body)
        console.log(response.body.data.id)
        resourceId = response.body.data.id
       // expect(response.body.data).to.deep.include(payload)
        console.log("***********Post Call ends******************")
        // expect(response.body.resourceId)
    })


    it.only("Get call using", async () => {

        var endpoint = `users/${resourceId}`

        const response = await request.get(endpoint)
            .set("Authorization", `Bearer ${TOKEN}`)
            .expect(200)

        console.log("***********Get Call starts******************")
        console.log(response.body)
        console.log("***********Get Call Ends******************")
        //console.log(response.body.data.id)

        // expect(response.body.resourceId)
    })

    it.only("put call", async () => {

        const payload =
        {
            name: `achintya - ${Math.floor(Math.random() * 9999)}`,
            status: "inactive"
        }

        var endpoint = `users/${resourceId}`

        const response = await request.put(endpoint)
            .set("Authorization", `Bearer ${TOKEN}`)
            .send(payload)
            .expect(200)

        console.log("***********Put Call starts******************")
        console.log(response.body)
        //Status code is
        console.log(response.body.code)
        //assertion
        expect(response.body.data.status).to.be.equal(payload.status)
        console.log("***********Put Call Ends******************")




        //console.log(response.body)


    })
    it.only("Delete call", async () => {

        const payload =
        {
            name: `achintya - ${Math.floor(Math.random() * 9999)}`,
            status: "inactive"
        }

        var endpoint = `users/${resourceId}`

        const response = await request.delete(endpoint)
            .set("Authorization", `Bearer ${TOKEN}`)
            .expect(200)


        console.log("***********Delete Call starts******************")
        console.log(response.body)
        //Status code is
        console.log(response.body.code)
        //assertion
        expect(response.body.code).to.be.equal(204)
        console.log("***********Put Call Ends******************")

    })


})