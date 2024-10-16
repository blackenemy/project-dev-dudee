import axios from 'axios';

export default async function handler(req, res) {
    const token = 'PwvFeAbjqKKlue81sEG71DwZlh8EBaULCsnC7S0V9PuczeP62SW01/OlnMLB14DcBiDiPSxvGv8XNP2aP3qYVF2RGUWLcO/yL44zKNZTzK3sS1r+C7WOyj2TLnFMjItrm9eVA51+jZ0e6SVSblCcTwdB04t89/1O/w1cDnyilFU=';

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
