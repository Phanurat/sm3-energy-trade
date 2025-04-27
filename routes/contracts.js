const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'sm3-energy-trade_db',  
  user: 'admin',
  password: '1111',
  database: 'database_contracts',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();
db.getConnection()
  .then(() => console.log('เชื่อมต่อฐานข้อมูลสำเร็จ'))
  .catch(err => console.error('การเชื่อมต่อฐานข้อมูลล้มเหลว:', err));

router.get('/contracts', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM contracts ORDER BY id DESC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/contracts', async (req, res) => {
  const { id_contracts } = req.body;

  if (!id_contracts) {
    return res.status(400).json({ error: 'กรุณาระบุ id_contracts' });
  }

  try {
    const [result] = await db.query('INSERT INTO contracts (id_contracts) VALUES (?)', [id_contracts]);
    res.status(201).json({ message: 'บันทึก Smart Contract สำเร็จ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
