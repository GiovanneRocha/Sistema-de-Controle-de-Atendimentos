import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchTickets() {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:3001/api/tickets', {
        headers: { Authorization: token }
      });
      setTickets(data);
    }
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Chamados</h2>
      <Link to="/tickets/new">Novo Chamado</Link>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link> - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
}