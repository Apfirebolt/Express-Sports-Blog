const expect = require("chai").expect;
const mongoose = require('mongoose');


describe("test mongodb connection", () => {
  it("should connect and disconnect to mongodb", async () => {
      mongoose.disconnect();
      mongoose.connection.on('test database disconnected', () => {
        expect(mongoose.connection.readyState).to.equal(0);
      });
      mongoose.connection.on('test database connected', () => {
        expect(mongoose.connection.readyState).to.equal(1);
      });
      mongoose.connection.on('error', () => {
        expect(mongoose.connection.readyState).to.equal(99);
      });
      
      await mongoose.connect("mongodb://localhost/express-sports-test", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
  });
});