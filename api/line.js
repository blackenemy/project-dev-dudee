import axios from 'axios';

export default async function handler(req, res) {
    const token = 'pLDyq0ID/UApVff75E8Y81yMSF4NO7frbHTcf3OtwYQqGVUqngKZWe6avv9Rqx1+RX9ITNj9JajgI8T5ifqdO5rxnDb6/vRDHkL0COupH5fAGU7vaOGpC/g5+t6t7ZizAQRNPtCklkoY/t7EFH/x9AdB04t89/1O/w1cDnyilFU=';

    try {
        const response = await axios.post('https://api.line.me/v2/bot/message/push', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.message,
        });
    }
}
