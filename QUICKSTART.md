# ⚡ DGS-Pay Chatbot Quick Start

Get the chatbot running in 2 minutes!

## 🚀 Method 1: Direct Embed (Fastest)

### Step 1: Download Files
Download these 2 files:
- `chatbot-styles.css`
- `chatbot-script.js`

### Step 2: Add to Your Website
Add these 2 lines to your HTML:

```html
<head>
    <link rel="stylesheet" href="path/to/chatbot-styles.css">
</head>
<body>
    <!-- Your content -->
    
    <script src="path/to/chatbot-script.js"></script>
</body>
```

### Step 3: Done! 🎉
The chatbot will appear as a floating button in the bottom-right corner.

---

## 🖥️ Method 2: Test Locally

### Step 1: Open Demo
Simply open `demo.html` in your browser.

### Step 2: Test the Chatbot
Click the floating button and ask questions like:
- "How do I authenticate?"
- "What's the mobile money API?"
- "Payment failed, help!"

---

## 🌐 Method 3: WordPress (One-Click)

### Step 1: Install Plugin
Create a simple plugin by adding this to `wp-content/plugins/dgs-chatbot/dgs-chatbot.php`:

```php
<?php
/*
Plugin Name: DGS-Pay Chatbot
Description: DGS-Pay API documentation chatbot
Version: 1.0
*/

function dgs_chatbot_load() {
    ?>
    <link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__); ?>chatbot-styles.css">
    <script src="<?php echo plugin_dir_url(__FILE__); ?>chatbot-script.js"></script>
    <?php
}
add_action('wp_head', 'dgs_chatbot_load');
```

### Step 2: Upload Files
Upload `chatbot-styles.css` and `chatbot-script.js` to the plugin folder.

### Step 3: Activate
Activate the plugin in WordPress admin.

---

## ⚛️ Method 4: React

```jsx
// Add to your main App.jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/chatbot-styles.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = '/chatbot-script.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <h1>My App</h1>
    </div>
  );
}

export default App;
```

---

## 🎨 Quick Customization

### Change Colors
Edit `chatbot-styles.css`:

```css
:root {
    --dgs-primary-color: #your-color;  /* Main color */
    --dgs-bot-bg: #your-bg-color;      /* Bot message background */
    --dgs-user-bg: #your-user-color;    /* User message background */
}
```

### Change Welcome Message
Edit `chatbot-widget.html` (or add to your page):

```html
<div class="dgs-message dgs-bot-message">
    <div class="dgs-message-content">
        <p>👋 Welcome! I'm here to help with payment questions.</p>
    </div>
</div>
```

---

## 📋 What Users Can Ask

The chatbot answers questions about:

### Authentication
- "How do I get an API token?"
- "Where do I find my client secret?"
- "How long do tokens last?"

### Payments
- "How do I make a mobile money payment?"
- "What are the supported payment types?"
- "How do I initiate a payment?"

### Errors
- "What does error 10400 mean?"
- "Payment failed, what do I do?"
- "How do I fix validation errors?"

### Webhooks
- "How do I handle webhooks?"
- "How do I verify webhook secrets?"
- "What's the webhook payload format?"

### Testing
- "How do I test payments?"
- "What's the sandbox environment?"
- "How do I simulate payments?"

### Security
- "Is my client secret secure?"
- "What are the security best practices?"
- "How do I protect my API keys?"

---

## 🧪 Testing

### Quick Test Checklist

- [ ] Chat button appears on page
- [ ] Chat opens when clicked
- [ ] Can send messages
- [ ] Bot responds correctly
- [ ] Code blocks display properly
- [ ] Quick action buttons work
- [ ] Mobile responsive design
- [ ] Close/minimize works
- [ ] Out-of-scope questions show fallback

### Test Questions

Try these to verify it works:

1. "How do I authenticate?" → Should show authentication guide
2. "What are the error codes?" → Should show error documentation
3. "How do I handle webhooks?" → Should show webhook guide
4. "What's the weather today?" → Should show fallback message

---

## 📱 Testing on Mobile

### Browser Testing
Open demo.html on your phone:
- Chrome (Android)
- Safari (iOS)
- Firefox (Android)

### What to Check
- Button is reachable with thumb
- Chat window fits screen
- Keyboard doesn't overlap input
- Messages are readable

---

## 🔧 Troubleshooting

### Chatbot doesn't appear

**Solution:** Check file paths in your HTML

```html
<!-- Wrong -->
<link rel="stylesheet" href="chatbot-styles.css">

<!-- Right (adjust path as needed) -->
<link rel="stylesheet" href="/assets/chatbot-styles.css">
```

### Styles look broken

**Solution:** Ensure CSS file loads before JavaScript

```html
<head>
    <link rel="stylesheet" href="chatbot-styles.css">
</head>
<body>
    <script src="chatbot-script.js"></script>
</body>
```

### No responses

**Solution:** Check browser console for errors
- Right-click → Inspect → Console
- Look for JavaScript errors
- Ensure script loads completely

### Can't click send button

**Solution:** Check if z-index conflicts with other elements
- Add to `chatbot-styles.css`:

```css
.dgs-chatbot-container {
    z-index: 99999 !important;
}
```

---

## 📊 Performance Check

Your chatbot is optimized:
- ✅ Total size: ~48KB
- ✅ Load time: < 1 second
- ✅ Response time: < 100ms
- ✅ No external requests

---

## 🎯 Next Steps

1. **Customize colors** to match your brand
2. **Update welcome message** for your context
3. **Add quick actions** for common questions
4. **Test with users** and gather feedback
5. **Extend knowledge base** if needed (see CUSTOMIZATION_GUIDE.md)

---

## 📚 Need More Help?

- **Full Documentation:** README.md
- **Customization:** CUSTOMIZATION_GUIDE.md
- **Integration Examples:** INTEGRATION_EXAMPLES.md
- **Project Details:** PROJECT_SUMMARY.md

---

## ✅ Done?

You now have a working chatbot that:

- ✅ Costs $0
- ✅ Answers API questions
- ✅ Works on any website
- ✅ Requires no API keys
- ✅ Is under 100KB
- ✅ Handles out-of-scope questions
- ✅ Is mobile-friendly
- ✅ Has quick action buttons
- ✅ Shows code examples
- ✅ Is fully customizable

**Ready to help your users! 🎉**