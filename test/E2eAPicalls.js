import supertest from "supertest";
import { expect } from "chai";
import { describe } from "mocha";
import qa from "../config/qa";


const request = supertest(qa.baseurl)

const TOKEN = "d4c89a22b28a3b6eab182636ab4e67f63798688668164eb241ad46c637b30f8f"

let resourceId;

describe("This suite will do all CRUD opearations and dynamically", () => {

    it("First insert the record in the system", () => {
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
                //Status code is
                console.log(res.body)
                console.log(res.body.code)
                //get the Id and store in global variable
                resourceId = res.body.data.id
                console.log(res.body.data.id)
            })
    })
})
    describe("lets try", () => {
        it("Get the details of the created record ", () => {

            //request.get(`users/${resourceId}?access-token=${TOKEN}`)
            request.get(`users/${resourceId}?access-token=${TOKEN}`)
                .then((res) => {
                    console.log("**************GET API*************")
                    console.log(res.body.data)
                    console.log(`${resourceId1}`)
                    console.log("**************End*************")
                })

        })
    })



