import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container, TextField, Button, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Box, Typography
} from "@mui/material";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const API = "http://127.0.0.1:5000/users";

  // Fetch all users
  const loadUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`${API}/${editingId}`, form);
    } else {
      await axios.post(API, form);
    }
    setForm({ name: "", email: "" });
    setEditingId(null);
    loadUsers();
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadUsers();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" mb={3}>
          User Management
        </Typography>

        {/* FORM */}
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit} color="primary">
            {editingId ? "Update" : "Add"}
          </Button>
        </Box>

        {/* TABLE */}
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(u)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Paper>
    </Container>
  );
}

export default App;
