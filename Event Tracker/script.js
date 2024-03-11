document.getElementById('eventForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventDescription = document.getElementById('eventDescription').value;

  if (!eventName || !eventDate) {
      alert('Event name and date are required.');
      return;
  }

  const eventId = Date.now(); 
  const event = { id: eventId, name: eventName, date: eventDate, description: eventDescription };
  saveEvent(event);
  displayEvents();
  this.reset(); 
});



function saveEvent(event) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const existingIndex = events.findIndex(e => e.id === event.id);
  if (existingIndex > -1) {
      events[existingIndex] = event; 
  } else {
      events.push(event); 
  }
  localStorage.setItem('events', JSON.stringify(events));
}

function deleteEvent(eventId) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const filteredEvents = events.filter(event => event.id !== eventId);
  localStorage.setItem('events', JSON.stringify(filteredEvents));
  displayEvents();
}

function displayEvents() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const eventsList = document.getElementById('eventsList');
  eventsList.innerHTML = '';

  
  events.forEach(event => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.innerHTML = `
          <strong>${event.name}</strong> - ${event.date} <br>
          ${event.description}
          <button onclick="deleteEvent(${event.id})" class="btn btn-danger btn-sm float-right">Delete</button>
      `;
      eventsList.appendChild(li);
  });
}



document.addEventListener('DOMContentLoaded', displayEvents);
