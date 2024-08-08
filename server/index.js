import express from 'express';
import cors from 'cors';
import analyzePerformance from './analyze.js'; 

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.post('/analyze', async (req, res) => {
    const { url } = req.body;
    try {
        const performanceData = await analyzePerformance(url);
        res.json(performanceData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
