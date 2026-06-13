const req = await fetch('http://localhost:8000/api/v1/me/update', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New Name' })
});
console.log(await req.json());
