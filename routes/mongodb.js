const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const path = require('path'); // pathモジュールを追加

// MongoDB接続設定
const uri = 'mongodb+srv://cu-admin:3vZs0IF3PyaLK84A@notes.8wywgm8.mongodb.net/?retryWrites=true&w=majority&appName=notes';
const client = new MongoClient(uri);

// データ取得API
router.get('/api/notes', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('notes');
    const notes = database.collection('notes');
    
    const result = await notes.find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'データの取得に失敗しました' });
  }
});

// 一覧ページ表示
router.get('/mongodb-list', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/mongodb-list.html'));
});

module.exports = router; 