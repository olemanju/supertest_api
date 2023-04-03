
import request from "../config/common"

import { expect } from "chai";
import { describe } from "mocha";
import { faker } from '@faker-js/faker';
//const faker = require('faker')
require('dotenv').config()

//const TOKEN = "d4c89a22b28a3b6eab182636ab4e67f63798688668164eb241ad46c637b30f8f"
const TOKEN = process.env.USER_TOKEN

describe("This suite will cover all the negetive flows", () => {
    
    it("401 Post authentication Fail", async () => {
        const payload =
        {
            email: `test${Math.floor(Math.random() * 9999)}@gmail.com`,
            name: faker.name.firstName(),
            gender: faker.name.gender(),
            status: "active"
        }

        var endpoint = 'users'
        const response = await request.post(endpoint)
                         .send(payload)

        console.log("***********Post 401 authentication Call starts******************")
        console.log(response.body)
        expect(response.body.code).to.eq(401)
        expect(response.body.data.message).to.eq("Authentication failed")
        console.log("***********Post 401 authentication Call ends******************")
    })

    it("422 Validation Failed", async () => {
        const payload =
        {
            email: `test${Math.floor(Math.random() * 9999)}@gmail.com`,
            name: "Rajini kanth",
            // not entered gender and status
        }
        var endpoint = 'users'
        const response = await request.post(endpoint)
                         .set("Authorization", `Bearer ${TOKEN}`)
                         .send(payload)

        console.log("***********Post 422 Validation Call starts******************")
        console.log(response.body)
        expect(response.body.code).to.eq(422)
        const Error_data_array = response.body.data

        //console.log("details are "+ JSON.stringify(Error_data_array))
        /*
        data: [
    {
      field: 'gender',
      message: "can't be blank, can be male of female"
    },
    { field: 'status', message: "can't be blank" }
  ]*/
        //To validate we have 2 ways one is through index other is loop
        expect(response.body.data[0].field).to.eq('gender')
        expect(response.body.data[0].message).to.eq("can't be blank, can be male of female")
        expect(response.body.data[1].field).to.eq('status')
        expect(response.body.data[1].message).to.eq("can't be blank")
        //2nd way
        for (let i = 0; i < Error_data_array.length; i++) {
            const element = Error_data_array[i];
            if (element.field == 'gender') {
                expect(element.message).to.eql("can't be blank, can be male of female")
            } else {
                expect(element.message).to.eql("can't be blank")
            }
        }
        console.log("***********Post 422 Validation Call ends******************")
    })
})