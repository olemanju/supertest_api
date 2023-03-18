import { describe } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import qa from "../config/qa";

const request = supertest(qa.baseurl)

const TOKEN = "d4c89a22b28a3b6eab182636ab4e67f63798688668164eb241ad46c637b30f8f"

describe("First Get call ", () => {
    it("Get API Call First way", (done) => {
        request.get(`users?access-token=${TOKEN}`)
            .end((err, res) => {
                //console.log(res.body)
                expect(res.body.data).not.to.be.empty
                done()
            })
    })
    it("Get Api to featch the details of females and status is active in page 5 ", () => {
        const url = `users?access-token=${TOKEN}page=5&gender=female&status=active`
        request.get(url)
            .then((res) => {
                var response = res.body.data
                console.log(response)
                //console.log(res.body.data)
                //For each loop to verify the value
                res.body.data.forEach(val => {
                    expect(val.gender).to.be.equal('female')
                    expect(val.status).to.be.equal('active')
                    //console.log(val.gender)
                    // console.log(val.status)
                });
            })
    })

    it("Get API Call last way way", async () => {
        //Standard method to call get
        request.get(`users?access-token=${TOKEN}`)
            .then((res) => {
                //Printing the status code
                console.log(res.statusCode)
                //assert status code should be 200
                expect(res.statusCode).to.equal(200)
                //it will print the result in string
                const GET_API_RESPONSE = JSON.stringify(res.body)
                //console.log(GET_API_RESPONSE)

                console.log(res.body.meta)
                //To get the pagination details 
                //{ pagination: { total: 2491, pages: 250, page: 1, limit: 10 } }
                console.log(res.body.meta.pagination.total)
                //to know the total records
                expect(res.body.meta.pagination.total).to.be.equal(2491)
            })
    })
})
