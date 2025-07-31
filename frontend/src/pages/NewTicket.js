import React, { useState } from 'react';
import axios from 'axios';

export default function NewTicket() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3001/api/tickets', { title, description }, {
      headers: { Authorization: token }
    });
    window.location.href = '/';
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Chamado</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
      <button type="submit">Criar</button>
    </form>
  );
}