# DGS-Pay API Chatbot

A lightweight, embeddable chatbot for answering questions about DGS-Pay payment API documentation. **100% free - no API costs, no subscriptions!**

## ✨ Features

- 💰 **Zero Cost** - No external API dependencies, completely free to use
- 🚀 **Lightweight** - Under 100KB total size
- 🔒 **Private** - All data stays on your server, no external calls
- 🎨 **Customizable** - Easy to brand and match your website
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Rule-based keyword matching for instant responses
- 🎯 **Focused** - Strictly limited to payment API topics only

## 📦 Quick Start

### Option 1: Use the Widget Directly

1. Download these files to your website:
   - `chatbot-styles.css`
   - `chatbot-script.js`

2. Add to your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="chatbot-styles.css">
</head>
<body>
    <!-- Your website content -->
    
    <!-- Add chatbot at the end -->
    <script src="chatbot-script.js"></script>
</body>
</html>
```

### Option 2: Use the Complete Widget

Simply include `chatbot-widget.html` in an iframe or copy its structure to your page.

```html
<iframe src="chatbot-widget.html" width="400" height="600" style="border:none;"></iframe>
```

## 🎯 Topics Covered

The chatbot can answer questions about:

### Authentication
- Token request process
- Bearer token authentication
- Token expiration and refresh
- Client secret retrieval

### Payments
- Mobile Money (MTN, Airtel)
- Card payments (local & international)
- Bank payouts
- Mobile money payouts
- Payment initiation and processing

### Technical Details
- API endpoints and parameters
- Response formats (success, pending, failed)
- Error codes and troubleshooting
- Status indicators
- Field validation rules

### Webhooks
- Callback URL setup
- Webhook verification
- Webhook payload structure
- Security best practices

### Best Practices
- Integration setup
- Testing with sandbox
- Security guidelines
- Rate limiting considerations

## 🎨 Customization

### Change Colors

Edit `chatbot-styles.css` to customize the appearance:

```css
:root {
    --dgs-primary-color: #1a73e8;      /* Your brand color */
    --dgs-primary-hover: #1557b0;      /* Hover color */
    --dgs-bg-color: #ffffff;           /* Background color */
    --dgs-text-color: #333333;         /* Text color */
}
```

### Change Chatbot Name

Edit `chatbot-widget.html`:

```html
<h3>Your Chatbot Name</h3>
```

### Modify Quick Action Buttons

Edit the buttons in `chatbot-widget.html`:

```html
<button class="dgs-quick-btn" data-query="Your custom question">
    🎯 Your Button Text
</button>
```

### Adjust Position

Edit the positioning in `chatbot-styles.css`:

```css
.dgs-chatbot-container {
    bottom: 90px;    /* Distance from bottom */
    right: 20px;     /* Distance from right */
}

.dgs-chatbot-toggle {
    bottom: 20px;
    right: 20px;
}
```

## 📚 Extending the Knowledge Base

### Adding New Topics

The knowledge base is stored in `chatbot-script.js` in the `DGS_KNOWLEDGE_BASE` object. Each entry follows this format:

```javascript
'keyword1|keyword2|keyword3': {
    response: `Your detailed response here...
    
    Use markdown-style formatting:
    **Bold text**
    \`code\`
    \`\`\`code blocks\`\`\`
    - Lists
    `,
    topic: 'category-name'
}
```

### Example: Adding a New FAQ

```javascript
'refund|refund policy|payment refund': {
    response: `💳 **Payment Refunds**

To process a refund:
1. Use the \`PAYOUT_MOBILE\` or \`PAYOUT_BANK\` API
2. Set the amount to refund
3. Use the original transaction reference

Example:
\`\`\`json
{
  "pay_info": {
    "api_code": "PAYOUT_MOBILE",
    "amount": 550,
    "reference": "REFUND-001"
  }
}
\`\`\``,
    topic: 'refunds'
}
```

### Adding Multiple Keywords

Use the `|` separator to add multiple keywords:

```javascript
'token|authentication|bearer|login|access token': {
    response: `...`,
    topic: 'authentication'
}
```

The chatbot will match if ANY of these keywords appear in the user's question.

### Modifying Fallback Responses

Edit the `FALLBACK_RESPONSES` array in `chatbot-script.js`:

```javascript
const FALLBACK_RESPONSES = [
    "I can only help with DGS-Pay API questions.",
    "Try asking about authentication, payments, or webhooks.",
    // Add your custom fallbacks
];
```

## 🔧 Configuration Options

### Auto-Open Chat

To open the chat automatically on page load, add this to your page:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.dgsChatbot.toggleChat();
    }, 1000);
});
```

### Hide Quick Actions

Hide quick action buttons by adding CSS:

```css
.dgs-quick-actions {
    display: none;
}
```

### Custom Welcome Message

Edit the welcome message in `chatbot-widget.html`:

```html
<div class="dgs-message dgs-bot-message">
    <div class="dgs-message-content">
        <p>Your custom welcome message here!</p>
    </div>
</div>
```

## 📋 File Structure

```
dgs-pay-chatbot/
├── chatbot-widget.html    # Complete widget (HTML + CSS + JS)
├── chatbot-styles.css      # Styles only (25KB)
├── chatbot-script.js       # Logic + knowledge base (60KB)
├── demo.html              # Example implementation
└── README.md              # This file
```

**Total Size:** ~85KB (under 100KB goal!)

## 🧪 Testing

Open `demo.html` in your browser to see the chatbot in action.

### Test Questions to Try:

- "How do I authenticate to the API?"
- "What's the mobile money endpoint?"
- "How do I handle webhooks?"
- "What are the error codes?"
- "How do I initiate a payment?"
- "What's the token expiration time?"
- "How do I verify webhook secrets?"
- "What are the reference field requirements?"

## 🔍 How It Works

### 1. Rule-Based Matching

The chatbot uses keyword matching - when a user asks a question:
1. Convert question to lowercase
2. Search through knowledge base keywords
3. Find best matching response
4. Return fallback if no match found

### 2. No External APIs

- ✅ All logic runs in the browser
- ✅ No server-side processing needed
- ✅ No API keys required
- ✅ Complete privacy

### 3. Markdown Formatting

Responses support:
- **Bold** text
- `Inline code`
- ```Code blocks```
- Lists
- Line breaks

## 🎯 Best Practices

### 1. Knowledge Base Tips
- Use specific keywords for each topic
- Include common variations of questions
- Add examples in responses
- Keep responses concise but informative

### 2. Performance Tips
- The chatbot is already optimized
- No additional optimization needed
- Runs efficiently on all devices

### 3. UX Tips
- Position chatbot where it's easily accessible
- Customize colors to match your brand
- Update welcome message for context
- Add relevant quick action buttons

## 🛠️ Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 📊 Technical Specifications

- **Total Size:** ~85KB
- **Dependencies:** None (Vanilla JavaScript)
- **External APIs:** 0
- **Response Time:** < 100ms (instant)
- **Browser Memory:** < 5MB
- **Network Requests:** 0 (after initial load)

## 🚀 Deployment

### 1. Static Hosting
Upload files to any static hosting:
- Netlify
- Vercel
- GitHub Pages
- Your own server

### 2. CDN
Host files on CDN for faster loading:
```html
<link rel="stylesheet" href="https://your-cdn.com/chatbot-styles.css">
<script src="https://your-cdn.com/chatbot-script.js"></script>
```

### 3. WordPress
Upload files via FTP and add to theme's footer.php:
```php
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/chatbot-styles.css">
<script src="<?php echo get_template_directory_uri(); ?>/chatbot-script.js"></script>
```

## 🤝 Contributing

To add new topics or improve responses:

1. Edit `chatbot-script.js`
2. Add/modify entries in `DGS_KNOWLEDGE_BASE`
3. Test with demo.html
4. Deploy updated files

## 📝 License

This chatbot is provided as-is for use with DGS-Pay API documentation.

## ❓ FAQ

**Q: Do I need an API key?**
A: No! This chatbot runs entirely in the browser with no external dependencies.

**Q: Can I use this commercially?**
A: Yes, it's free for commercial use with DGS-Pay.

**Q: How do I add new documentation?**
A: Edit the `DGS_KNOWLEDGE_BASE` object in `chatbot-script.js`.

**Q: Can I customize the appearance?**
A: Yes! All styles are in `chatbot-styles.css` and easily editable.

**Q: Does it work offline?**
A: After the initial page load, yes! No ongoing internet connection needed.

**Q: What happens if someone asks about something else?**
A: The chatbot provides a helpful fallback message redirecting back to payment API topics.

**Q: Can I add images or videos to responses?**
A: Currently, text responses with code formatting. Images would require extending the response formatter.

## 📞 Support

For issues or questions about the chatbot implementation, refer to this documentation. For DGS-Pay API questions, use the chatbot itself!

## 🎉 Summary

This chatbot provides:
- ✅ Zero cost deployment
- ✅ Instant setup (3 lines of code)
- ✅ Comprehensive DGS-Pay API knowledge
- ✅ Professional appearance
- ✅ Mobile-friendly design
- ✅ Easy customization
- ✅ No technical expertise required
- ✅ Out-of-scope question handling
- ✅ Quick action buttons
- ✅ Code examples and formatting

Start helping your users today! 🚀