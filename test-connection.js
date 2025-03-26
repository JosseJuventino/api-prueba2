const { Connection } = require('tedious');

const config = {
  server: 'localhost\\SQLEXPRESS',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'NuevaContraseñaFuerte123',
    },
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    database: 'task_manager_db',
  },
};

const connection = new Connection(config);

connection.on('connect', (err) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('¡Conexión exitosa!');
    connection.close();
  }
});