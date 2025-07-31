import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    async function fetchTicket() {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:3001/api/tickets', {
        headers: { Authorization: token }
      });
      setTicket(data.find(t => t.id === Number(id)));
    }
    fetchTicket();
  }, [id]);

  async function handleStatusChange(newStatus) {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:3001/api/tickets/${id}/status`, { status: newStatus }, {
      headers: { Authorization: token }
    });
    setTicket({ ...ticket, status: newStatus });
  }

  async function handleComment(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:3001/api/tickets/${id}/comments`, { message: comment }, {
      headers: { Authorization: token }
    });
    setTicket({
      ...ticket,
      comments: [...(ticket.comments || []), { message: comment, user: { name: 'Você' } }]
    });
    setComment('');
  }

  if (!ticket) return <div>Carregando...</div>;

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <button onClick={() => handleStatusChange('em_andamento')}>Em Andamento</button>
      <button onClick={() => handleStatusChange('resolvido')}>Resolvido</button>
      <button onClick={() => handleStatusChange('fechado')}>Fechado</button>
      <h3>Comentários</h3>
      <ul>
        {(ticket.comments || []).map((c, i) => (
          <li key={i}><b>{c.user?.name}:</b> {c.message}</li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Novo comentário" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}