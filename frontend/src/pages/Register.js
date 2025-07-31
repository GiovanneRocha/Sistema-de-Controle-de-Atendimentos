import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/register', { name, email, password });
    setSuccess(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Cadastrar</button>
      {success && <div>Cadastro realizado! Faça login.</div>}
    </form>
  );
}