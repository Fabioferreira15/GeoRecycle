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



let utilizacaoID = "648b863a4650c2ac61c03a81";
describe("Valida uma utilização", () => {
  test("deve validar uma utilização", async () => {
    const res = await request(app)
      .put(`/utilizacao/${utilizacaoID}`)
      .set("Authorization", `Bearer ${token2}`)
      .send({
        vistoAdmin: true,
        utilizacaoAprovada: true,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Utilização validada com sucesso.");
  });
});





describe("Get utilizações pendentes",( )=>{
    test("deve retornar as utilizações pendentes", async()=>{
        const res = await request(app)
        .get(`/utilizacao/pendentes`)
        .set("Authorization", `Bearer ${token2}`);
        expect(res.statusCode).toBe(200);
    })
    test("deve retornar erro de autenticação", async()=>{
        const res = await request(app)
        .get(`/utilizacao/pendentes`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(401);
    })
})


describe("Get utilizações por utilizador",( )=>{
    test("nenhuma utilização registada", async()=>{
        const res = await request(app)
        .get(`/utilizacao/${userID}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe("Não existe nenhuma utilização!");
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
