// -------------------------------------------------------------
// 4. CLEAN WEB APP BOT HANDLER (Bots.business Alternate)
// -------------------------------------------------------------

// Installation Route: Is URL par token laga kar hit karoge toh webhook set ho jayega
// Example URL: https://your-domain.vercel.app/api/setup-webapp?token=YOUR_BOT_TOKEN
app.get('/api/setup-webapp', async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ status: "error", message: "Please provide a bot token!" });
    }

    const domain = req.headers['x-forwarded-host'] || req.headers.host;
    // Yeh request niche wale webapp webhook handler par bhejegi data
    const webhookUrl = `https://${domain}/api/webapp-webhook?token=${token}`;

    const data = await sendTelegramRequest(token, 'setWebhook', { url: webhookUrl });
    
    if (data.ok) {
        return res.json({ status: "success", message: "Web App Bot successfully configured!" });
    } else {
        return res.status(400).json({ status: "error", telegram_error: data.description });
    }
});

// Webhook Route: Jo sirf /start par aapka exact message aur Web App button bhejega
app.post('/api/webapp-webhook', async (req, res) => {
    const { token } = req.query;
    const update = req.body;

    if (!token) return res.sendStatus(200);

    // Agar user private message bhejta hai
    if (update.message && update.message.chat.type === 'private') {
        const message = update.message;
        const chatId = message.chat.id;
        const msgText = message.text ? message.text.trim() : "";
        const user = message.from;

        if (msgText === '/start') {
            const webPage = "https://magic-scripts-reactions.vercel.app";
            
            // First name aur Last name ka validation
            const firstName = user.first_name || "";
            const lastName = user.last_name || "";
            const fullName = `${firstName} ${lastName}`.trim();

            const textMessage = `*Hello Dear ${fullName}*\n*👇👇 Make free unlimited channels/groups Reactions bots without VPN, without coding.👇👇*`;

            await sendTelegramRequest(token, 'sendMessage', {
                chat_id: chatId,
                text: textMessage,
                disable_web_page_preview: true,
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Create Free Bots", web_app: { url: webPage } }]
                    ]
                }
            });
        }
    }

    res.sendStatus(200);
});
      
