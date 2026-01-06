# DGS-Pay Chatbot Customization Guide

This guide provides detailed instructions for customizing and extending the DGS-Pay API chatbot.

## 🎨 Appearance Customization

### Color Scheme

The chatbot uses CSS custom properties for easy theming. Edit `chatbot-styles.css`:

```css
:root {
    /* Primary brand color */
    --dgs-primary-color: #1a73e8;
    --dgs-primary-hover: #1557b0;
    
    /* Background colors */
    --dgs-bg-color: #ffffff;
    --dgs-bg-secondary: #f5f5f5;
    
    /* Text colors */
    --dgs-text-color: #333333;
    --dgs-text-secondary: #666666;
    
    /* Message colors */
    --dgs-bot-bg: #f0f4ff;
    --dgs-user-bg: #1a73e8;
    --dgs-user-text: #ffffff;
    
    /* Other elements */
    --dgs-border-color: #e0e0e0;
    --dgs-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    --dgs-radius: 12px;
}
```

### Brand Color Examples

Different brand color schemes:

```css
/* Purple Theme */
:root {
    --dgs-primary-color: #9c27b0;
    --dgs-primary-hover: #7b1fa2;
    --dgs-bot-bg: #f3e5f5;
    --dgs-user-bg: #9c27b0;
}

/* Green Theme */
:root {
    --dgs-primary-color: #4caf50;
    --dgs-primary-hover: #388e3c;
    --dgs-bot-bg: #e8f5e9;
    --dgs-user-bg: #4caf50;
}

/* Orange Theme */
:root {
    --dgs-primary-color: #ff9800;
    --dgs-primary-hover: #f57c00;
    --dgs-bot-bg: #fff3e0;
    --dgs-user-bg: #ff9800;
}
```

### Size Adjustments

To make the chatbot larger or smaller:

```css
/* Larger chatbot */
.dgs-chatbot-container {
    width: 450px;      /* Increase from 380px */
    height: 700px;     /* Increase from 600px */
}

/* Smaller chatbot */
.dgs-chatbot-container {
    width: 320px;      /* Decrease from 380px */
    height: 500px;     /* Decrease from 600px */
}
```

### Position Changes

Move the chatbot to different corners:

```css
/* Bottom-left */
.dgs-chatbot-container {
    bottom: 90px;
    right: auto;
    left: 20px;
}

.dgs-chatbot-toggle {
    bottom: 20px;
    right: auto;
    left: 20px;
}

/* Top-right corner */
.dgs-chatbot-container {
    bottom: auto;
    top: 20px;
    right: 20px;
}

.dgs-chatbot-toggle {
    bottom: auto;
    top: 20px;
}
```

## 🔧 Behavior Customization

### Change Welcome Message

Edit `chatbot-widget.html`:

```html
<div class="dgs-message dgs-bot-message">
    <div class="dgs-message-content">
        <p>👋 Welcome to My Store's payment assistant!</p>
        <p>I can help you with:</p>
        <ul>
            <li>Payment processing questions</li>
            <li>Troubleshooting issues</li>
            <li>Integration help</li>
        </ul>
    </div>
</div>
```

### Modify Quick Action Buttons

Update the buttons in `chatbot-widget.html`:

```html
<div class="dgs-quick-actions" id="dgs-quick-actions">
    <button class="dgs-quick-btn" data-query="How do I make a payment?">
        💳 Make Payment
    </button>
    <button class="dgs-quick-btn" data-query="Payment failed, what do I do?">
        ❓ Payment Failed
    </button>
    <button class="dgs-quick-btn" data-query="How long does payment take?">
        ⏱️ Payment Time
    </button>
    <button class="dgs-quick-btn" data-query="What payment methods do you accept?">
        🏦 Payment Methods
    </button>
</div>
```

### Auto-Open Chat

Add this JavaScript to your page after the chatbot loads:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Open chat after 2 seconds
    setTimeout(() => {
        if (window.dgsChatbot) {
            window.dgsChatbot.toggleChat();
        }
    }, 2000);
});
```

### Show on Specific Pages

Only show chatbot on documentation pages:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Check current URL
    const currentPath = window.location.pathname;
    
    // Only show on docs pages
    if (currentPath.includes('/docs/') || currentPath.includes('/api/')) {
        // Keep chatbot visible
        window.dgsChatbot.toggleChat();
    } else {
        // Hide toggle button on other pages
        document.getElementById('dgs-chatbot-toggle').style.display = 'none';
    }
});
```

## 📚 Knowledge Base Extension

### Understanding the Structure

```javascript
'keyword1|keyword2|keyword3': {
    response: `Response text here...`,
    topic: 'category'
}
```

- **Keywords**: Pipe-separated list of matching keywords (case-insensitive)
- **Response**: The answer text (supports markdown-style formatting)
- **Topic**: Category for organizing responses

### Adding New FAQ Entries

#### Simple Text Response

```javascript
'business hours|support hours|when available': {
    response: `🕐 **Support Hours**

Our payment support team is available:
- Monday-Friday: 8:00 AM - 8:00 PM
- Saturday: 9:00 AM - 5:00 PM
- Sunday: Closed

For urgent issues, please contact support@dgs-pay.com`,
    topic: 'support'
}
```

#### Response with Code Example

```javascript
'curl example|command line|terminal': {
    response: `🖥️ **cURL Example**

Here's how to make a payment request using cURL:

\`\`\`bash
curl -X POST "https://pay.digitalservicescenter.rw/api-v2/token/sandbox" \\
-H "Content-Type: application/x-www-form-urlencoded" \\
-d "account_number=ACC-2322-0001" \\
-d "client_secret=your_sandbox_secret"
\`\`\`

This will return your access token.`,
    topic: 'examples'
}
```

#### Multi-Part Response

```javascript
'integration steps|setup guide|how to start': {
    response: `🚀 **Integration Steps**

**Step 1: Get Credentials**
1. Sign up at dgs-pay.com
2. Navigate to API Credentials
3. Copy your account number

**Step 2: Request Token**
\`\`\`json
POST /api-v2/token/sandbox
\`\`\`

**Step 3: Test Payment**
Make your first test payment in sandbox mode.

**Step 4: Go Live**
- Switch to production environment
- Use live credentials
- Monitor first transactions`,
    topic: 'integration'
}
```

### Adding Synonyms

Help users find answers with different phrasing:

```javascript
// Multiple ways to ask about the same topic
'password|secret|client secret|api key|access key': {
    response: `🔑 **API Credentials**

Your credentials consist of:
- Account Number: ACC-XXXX-XXXX
- Client Secret: Found in API Credentials page

Never share your client secret publicly!`,
    topic: 'authentication'
}
```

### Conditional Responses

Add logic based on specific keywords:

```javascript
'payment|transaction': {
    response: `💳 **Payment Information`,
    topic: 'payments'
},
'payment status|transaction status|check status': {
    response: `📊 **Check Payment Status**

To check payment status:
1. Use the \`tx_ref\` from your initial response
2. Listen for webhook callbacks
3. Or poll the status endpoint

Status values:
- \`pending\` - Awaiting authorization
- \`success\` - Completed
- \`failed\` - Declined`,
    topic: 'status'
}
```

## 🎯 Advanced Customization

### Custom Response Formatting

Extend the `formatMessage` method in `chatbot-script.js`:

```javascript
formatMessage(content) {
    // Existing formatting...
    
    // Add your custom formatting
    content = content.replace(/\[info\](.*?)\[\/info\]/g, 
        '<div class="dgs-info-box">$1</div>');
    
    content = content.replace(/\[warning\](.*?)\[\/warning\]/g, 
        '<div class="dgs-warning-box">⚠️ $1</div>');
    
    return content;
}
```

### Add Custom CSS Classes

```javascript
// In knowledge base
'important|critical|urgent': {
    response: `⚠️ **Important**

[warning]This is critical information you must follow![/warning]`,
    topic: 'general'
}
```

And in CSS:
```css
.dgs-warning-box {
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
}
```

### Analytics Integration

Track chatbot usage:

```javascript
class DGSChatbot {
    // ... existing code ...
    
    sendMessage() {
        const message = this.input.value.trim();
        
        // Track user questions
        this.trackEvent('user_question', {
            question: message,
            timestamp: new Date().toISOString()
        });
        
        // ... rest of method ...
    }
    
    trackEvent(event, data) {
        // Example: Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event, data);
        }
        
        // Example: Send to your analytics endpoint
        // fetch('/api/chatbot-analytics', {
        //     method: 'POST',
        //     body: JSON.stringify({ event, data })
        // });
    }
}
```

### Multi-Language Support

Create a separate knowledge base for each language:

```javascript
const DGS_KNOWLEDGE_BASE_EN = {
    'hello|hi|hey': {
        response: `Hello! How can I help you today?`,
        topic: 'greeting'
    }
};

const DGS_KNOWLEDGE_BASE_FR = {
    'bonjour|salut|hello': {
        response: `Bonjour! Comment puis-je vous aider aujourd'hui?`,
        topic: 'greeting'
    }
};

// Detect language and use appropriate knowledge base
let currentKnowledgeBase = DGS_KNOWLEDGE_BASE_EN;
if (navigator.language.startsWith('fr')) {
    currentKnowledgeBase = DGS_KNOWLEDGE_BASE_FR;
}
```

## 🌐 Integration Examples

### WordPress

Create a plugin or add to theme:

**functions.php:**
```php
function dgs_chatbot_scripts() {
    wp_enqueue_style('dgs-chatbot', 
        get_template_directory_uri() . '/chatbot-styles.css');
    wp_enqueue_script('dgs-chatbot', 
        get_template_directory_uri() . '/chatbot-script.js', 
        array(), null, true);
}
add_action('wp_enqueue_scripts', 'dgs_chatbot_scripts');
```

### React Component

```jsx
import React, { useEffect } from 'react';

const DGSCChatbot = () => {
    useEffect(() => {
        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/chatbot-styles.css';
        document.head.appendChild(link);

        // Load JS
        const script = document.createElement('script');
        script.src = '/chatbot-script.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.head.removeChild(link);
            document.body.removeChild(script);
        };
    }, []);

    return null; // Chatbot renders itself
};

export default DGSCChatbot;
```

### Vue.js

```vue
<template>
  <div></div>
</template>

<script>
export default {
  name: 'DGSChatbot',
  mounted() {
    // Load chatbot
    this.loadChatbot();
  },
  methods: {
    loadChatbot() {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/chatbot-styles.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = '/chatbot-script.js';
      document.body.appendChild(script);
    }
  }
}
</script>
```

## 🧪 Testing Customizations

### Local Testing

1. Start a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

2. Open `http://localhost:8000/demo.html`

3. Test your customizations

### Testing Knowledge Base

```javascript
// Add this to browser console for testing
const testQuestions = [
    'How do I authenticate?',
    'What are the error codes?',
    'Payment failed, help!',
    'What is the webhook secret?'
];

testQuestions.forEach(q => {
    const response = window.dgsChatbot.getResponse(q);
    console.log('Q:', q);
    console.log('A:', response);
    console.log('---');
});
```

## 📊 Performance Optimization

### Minify CSS

```bash
# Using cssnano
npx cssnano chatbot-styles.css chatbot-styles.min.css
```

### Minify JavaScript

```bash
# Using terser
npx terser chatbot-script.js -o chatbot-script.min.js -c -m
```

### Lazy Load

Load chatbot only when needed:

```javascript
// Load chatbot on scroll to bottom
window.addEventListener('scroll', () => {
    if (window.scrollY > 1000 && !window.dgsChatbotLoaded) {
        loadChatbot();
        window.dgsChatbotLoaded = true;
    }
});

function loadChatbot() {
    const script = document.createElement('script');
    script.src = '/chatbot-script.js';
    document.body.appendChild(script);
}
```

## 🎉 Best Practices

1. **Keep responses concise** - Users prefer short, direct answers
2. **Use examples** - Code snippets help developers understand faster
3. **Organize by topic** - Makes knowledge base easier to maintain
4. **Test thoroughly** - Try different phrasings of questions
5. **Update regularly** - Keep knowledge base current with API changes
6. **Monitor usage** - Track which questions are most common
7. **Iterate** - Improve based on user feedback

## 💡 Tips

- Use synonyms to capture different ways users ask the same question
- Include code examples for technical questions
- Add emojis to make responses more engaging
- Keep the total size under 100KB for best performance
- Test on mobile devices regularly
- Consider accessibility when customizing colors

Need more help? Check the main README.md file!