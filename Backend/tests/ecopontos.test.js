const mongoose = require("mongoose");
const request = require("supertest");
const { app, server } = require("../index");
const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");
const database = process.env.DB_URL;

beforeAll(async () => {
  await mongoose.connect(database, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  server.close();
});

let token, token2, userID, adminID;
describe("Registar utilizador", () => {
  test("deve registar um utilizador", async () => {
    const res = await request(app).post("/utilizadores/registo").send({
      nome: "Teste",
      email: "teste@gmail.com",
      password: "teste",
      confirmPassword: "teste",
    });
    expect(res.statusCode).toBe(201);
  },10000);
});

describe("Login utilizador", () => {
  test("deve fazer login", async () => {
    const data = await request(app).post("/utilizadores/registo").send({
      nome: "Teste",
      email: "teste@gmail.com",
      password: "teste",
      confirmPassword: "teste",
    });
    const res = await request(app).post("/utilizadores/login").send({
      nome: "Teste",
      password: "teste",
    });
    token = res.body.accessToken;
    let decode = jwt.verify(token, config.SECRET);
    userID = decode.id;
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login efetuado com sucesso");
  });
  test("deve fazer login como admin", async () => {
    const res = await request(app).post("/utilizadores/login").send({
      nome: "Admin",
      password: "Esmad_2223",
    });
    token2 = res.body.accessToken;
    let decode = jwt.verify(token2, config.SECRET);
    adminID = decode.id;
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login efetuado com sucesso");
  });
});

describe("ver ecopontos", () => {
  test("deve ver todos os ecopontos", async () => {
    const res = await request(app)
      .get("/ecopontos")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});

let ecopontoID = "646dd687cbc7e85364c204f5";
describe("ver ecoponto por id", () => {
  test("deve ver ecoponto por id", async () => {
    const res = await request(app)
      .get(`/ecopontos/${ecopontoID}`)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200);
  });
});


describe('Obter ecopontos por validar', () => {
    test('deve obter ecopontos por validar', async () => {
        const res = await request(app)
            .get('/ecopontos/pendentes')
            .set('Authorization', `Bearer ${token2}`)
        expect(res.statusCode).toBe(200)	
    })
})



describe("delete User", () => {
  test("deve eliminar um utilizador", async () => {
    const res = await request(app)
      .delete(`/utilizadores/${userID}`)
      .set("Authorization", `Bearer ${token2}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Utilizador apagado com sucesso");
  });
});




