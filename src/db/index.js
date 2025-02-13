
import pkg from "pg";
const {Pool} = pkg;

async function connect() { 
    const pool = new Pool({
      connectionString: process.env.URL_BD,
    });
    return pool.connect();
}

async function selectUsuarios() {
    const client = await connect();
    const res = await client.query("SELECT * FROM usuario");
    client.release();
    return res.rows;
}

async function selectUsuario(id) {
  const client = await connect();
  const query = "SELECT * FROM usuario WHERE id = $1";
  const usuario = [id];
  const res = await client.query(query, usuario);
  client.release();
  return res.rows;
}

//bd.js
async function insertUsuario(data) {
  const client = await connect();
  const query = "INSERT INTO usuario (nome,senha,email) VALUES ($1,$2,$3) ";
  const usuario = [data.nome, data.senha, data.email];
  await client.query(query, usuario);
  client.release();
}

async function autenticarUsuario(email, senha) {
  const client = await connect();
  const query = "SELECT * FROM usuario WHERE email = $1 AND senha = $2";
  const usuario = [email, senha];
  const res = await client.query(query, usuario);
  return res.rows[0];
}

//bd.js
export { selectUsuarios, selectUsuario, insertUsuario, autenticarUsuario};