const req = await fetch('http://localhost:8000/api/v1/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test', email: 'test@example.com', password: 'password123' })
});
console.log(await req.json());
