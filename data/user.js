const bcrypt = require('bcryptjs');

const users = [
  {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john_doe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane_doe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

exports.users = users;
