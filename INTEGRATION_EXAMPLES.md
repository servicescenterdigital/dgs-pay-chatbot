# DGS-Pay Chatbot Integration Examples

This guide provides practical examples for integrating the DGS-Pay chatbot into various platforms and websites.

## 🌐 Basic HTML Integration

### Option 1: CDN Link

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    
    <!-- DGS-Pay Chatbot Styles -->
    <link rel="stylesheet" href="https://your-cdn.com/chatbot-styles.css">
</head>
<body>
    <!-- Your website content -->
    <h1>Welcome to My Site</h1>
    <p>Check out our payment integration docs...</p>
    
    <!-- DGS-Pay Chatbot Script -->
    <script src="https://your-cdn.com/chatbot-script.js"></script>
</body>
</html>
```

### Option 2: Local Files

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="/assets/chatbot-styles.css">
</head>
<body>
    <!-- Your content -->
    
    <script src="/assets/chatbot-script.js"></script>
</body>
</html>
```

### Option 3: Inline Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        /* Paste chatbot-styles.css content here or link it */
    </style>
</head>
<body>
    <!-- Chat Widget HTML -->
    <div class="dgs-chatbot-container">
        <!-- Paste chatbot-widget.html content here -->
    </div>
    
    <!-- Toggle Button -->
    <button class="dgs-chatbot-toggle" id="dgs-chatbot-toggle">💬</button>
    
    <script>
        // Paste chatbot-script.js content here
    </script>
</body>
</html>
```

## 📱 WordPress Integration

### Method 1: Using Code Snippets Plugin

1. Install "Code Snippets" plugin
2. Add a new snippet
3. Paste this code:

```php
<?php
// Add to header
function dgs_chatbot_header() {
    ?>
    <link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__); ?>chatbot-styles.css">
    <?php
}
add_action('wp_head', 'dgs_chatbot_header');

// Add to footer
function dgs_chatbot_footer() {
    ?>
    <script src="<?php echo plugin_dir_url(__FILE__); ?>chatbot-script.js"></script>
    <?php
}
add_action('wp_footer', 'dgs_chatbot_footer');
?>
```

### Method 2: Theme Functions.php

Add to your theme's `functions.php`:

```php
<?php
// Enqueue chatbot styles and scripts
function dgs_chatbot_assets() {
    // Adjust path to where you uploaded the files
    $chatbot_url = get_stylesheet_directory_uri() . '/chatbot';
    
    wp_enqueue_style('dgs-chatbot-css', 
        $chatbot_url . '/chatbot-styles.css', 
        array(), '1.0');
    
    wp_enqueue_script('dgs-chatbot-js', 
        $chatbot_url . '/chatbot-script.js', 
        array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'dgs_chatbot_assets');
?>
```

### Method 3: Page-Specific Integration

Only show chatbot on documentation pages:

```php
<?php
function dgs_chatbot_conditional() {
    // Check if we're on a documentation page
    if (is_page('api-docs') || is_page('payment-integration')) {
        $chatbot_url = get_stylesheet_directory_uri() . '/chatbot';
        
        wp_enqueue_style('dgs-chatbot-css', 
            $chatbot_url . '/chatbot-styles.css');
        
        wp_enqueue_script('dgs-chatbot-js', 
            $chatbot_url . '/chatbot-script.js');
    }
}
add_action('wp_enqueue_scripts', 'dgs_chatbot_conditional');
?>
```

## ⚛️ React Integration

### React Component Wrapper

```jsx
// DGSPayChatbot.jsx
import React, { useEffect, useRef } from 'react';

const DGSPayChatbot = ({ 
    autoOpen = false,
    openDelay = 2000,
    stylesUrl = '/chatbot-styles.css',
    scriptUrl = '/chatbot-script.js'
}) => {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = stylesUrl;
        document.head.appendChild(link);

        // Load JavaScript
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        script.onload = () => {
            if (autoOpen) {
                setTimeout(() => {
                    if (window.dgsChatbot) {
                        window.dgsChatbot.toggleChat();
                    }
                }, openDelay);
            }
        };
        document.body.appendChild(script);

        // Cleanup
        return () => {
            document.head.removeChild(link);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [autoOpen, openDelay, stylesUrl, scriptUrl]);

    return null;
};

export default DGSPayChatbot;
```

### Usage in React App

```jsx
import DGSPayChatbot from './components/DGSPayChatbot';

function App() {
    return (
        <div className="App">
            <header>
                <h1>My Payment Platform</h1>
            </header>
            
            <main>
                {/* Your app content */}
            </main>
            
            {/* Add chatbot */}
            <DGSPayChatbot 
                autoOpen={true}
                openDelay={2000}
            />
        </div>
    );
}

export default App;
```

### With Custom Configuration

```jsx
<DGSPayChatbot 
    autoOpen={false}
    stylesUrl="https://cdn.mysite.com/chatbot-styles.css"
    scriptUrl="https://cdn.mysite.com/chatbot-script.js"
/>
```

## 🖖 Vue.js Integration

### Vue Component

```vue
<!-- DGSPayChatbot.vue -->
<template>
  <div></div>
</template>

<script>
export default {
  name: 'DGSPayChatbot',
  props: {
    autoOpen: {
      type: Boolean,
      default: false
    },
    openDelay: {
      type: Number,
      default: 2000
    },
    stylesUrl: {
      type: String,
      default: '/chatbot-styles.css'
    },
    scriptUrl: {
      type: String,
      default: '/chatbot-script.js'
    }
  },
  mounted() {
    this.loadChatbot();
  },
  methods: {
    loadChatbot() {
      // Load CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.stylesUrl;
      document.head.appendChild(link);

      // Load JavaScript
      const script = document.createElement('script');
      script.src = this.scriptUrl;
      script.async = true;
      
      script.onload = () => {
        if (this.autoOpen) {
          setTimeout(() => {
            if (window.dgsChatbot) {
              window.dgsChatbot.toggleChat();
            }
          }, this.openDelay);
        }
      };
      
      document.body.appendChild(script);
    }
  }
};
</script>
```

### Usage in Vue App

```vue
<template>
  <div id="app">
    <h1>My Payment Site</h1>
    
    <router-view />
    
    <!-- Add chatbot -->
    <DGSPayChatbot :autoOpen="true" :openDelay="1500" />
  </div>
</template>

<script>
import DGSPayChatbot from './components/DGSPayChatbot';

export default {
  name: 'App',
  components: {
    DGSPayChatbot
  }
};
</script>
```

## 🅰️ Angular Integration

### Angular Service

```typescript
// src/app/services/dgs-chatbot.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DGSPayChatbotService {
  private loaded = false;

  constructor() {}

  loadChatbot(options: {
    stylesUrl?: string;
    scriptUrl?: string;
    autoOpen?: boolean;
    openDelay?: number;
  } = {}): void {
    if (this.loaded) return;
    this.loaded = true;

    const {
      stylesUrl = '/chatbot-styles.css',
      scriptUrl = '/chatbot-script.js',
      autoOpen = false,
      openDelay = 2000
    } = options;

    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesUrl;
    document.head.appendChild(link);

    // Load JavaScript
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    script.onload = () => {
      if (autoOpen && (window as any).dgsChatbot) {
        setTimeout(() => {
          (window as any).dgsChatbot.toggleChat();
        }, openDelay);
      }
    };
    
    document.body.appendChild(script);
  }
}
```

### Usage in Angular Component

```typescript
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DGSPayChatbotService } from './services/dgs-chatbot.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>My Angular App</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  constructor(private chatbotService: DGSPayChatbotService) {}

  ngOnInit() {
    this.chatbotService.loadChatbot({
      autoOpen: true,
      openDelay: 2000
    });
  }
}
```

## 🟣 Next.js Integration

### Next.js Page Component

```jsx
// pages/_app.js or pages/layout.js
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Only load chatbot on client side
    if (typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/chatbot-styles.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = '/chatbot-script.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```

### With Dynamic Import

```jsx
import { useState, useEffect } from 'react';

export default function DocsPage() {
  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  useEffect(() => {
    // Load chatbot when user scrolls
    const handleScroll = () => {
      if (window.scrollY > 500 && !chatbotLoaded) {
        loadChatbot();
        setChatbotLoaded(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chatbotLoaded]);

  const loadChatbot = async () => {
    // Load CSS
    await import('/chatbot-styles.css');
    
    // Load script
    const script = document.createElement('script');
    script.src = '/chatbot-script.js';
    document.body.appendChild(script);
  };

  return (
    <div>
      <h1>API Documentation</h1>
      {/* Your docs content */}
    </div>
  );
}
```

## 🚀 Static Site Generators

### Hugo

```html
<!-- layouts/partials/chatbot.html -->
<link rel="stylesheet" rel="stylesheet" href="{{ "chatbot-styles.css" | absURL }}">
<script src="{{ "chatbot-script.js" | absURL }}"></script>
```

Add to your base template:
```html
<!-- layouts/_default/baseof.html -->
<!DOCTYPE html>
<html>
<head>
    <!-- ... -->
    {{ partial "chatbot.html" . }}
</head>
<body>
    <!-- ... -->
</body>
</html>
```

### Jekyll

Add to `_includes/chatbot.html`:
```html
<link rel="stylesheet" href="{{ '/assets/chatbot-styles.css' | relative_url }}">
<script src="{{ '/assets/chatbot-script.js' | relative_url }}"></script>
```

Add to `_layouts/default.html`:
```html
{% include chatbot.html %}
```

### Gatsby

```jsx
//gatsby-browser.js
export const onClientEntry = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/chatbot-styles.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = '/chatbot-script.js';
  script.async = true;
  document.body.appendChild(script);
};
```

## 🔧 CDN Deployment

### Using Cloudflare CDN

```html
<link rel="stylesheet" href="https://cdn.yourdomain.com/chatbot-styles.css">
<script src="https://cdn.yourdomain.com/chatbot-script.js"></script>
```

### Using jsDelivr

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/yourusername/repo@main/chatbot-styles.css">
<script src="https://cdn.jsdelivr.net/gh/yourusername/repo@main/chatbot-script.js"></script>
```

### Using UNPKG

```html
<link rel="stylesheet" href="https://unpkg.com/your-package@latest/chatbot-styles.css">
<script src="https://unpkg.com/your-package@latest/chatbot-script.js"></script>
```

## 📊 Analytics Integration

### Google Analytics

```javascript
// After chatbot loads
document.addEventListener('DOMContentLoaded', () => {
    const originalSend = window.dgsChatbot.sendMessage;
    
    window.dgsChatbot.sendMessage = function() {
        const message = this.input.value.trim();
        
        // Track to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'chatbot_question', {
                'question': message,
                'page_location': window.location.href
            });
        }
        
        return originalSend.call(this);
    };
});
```

### Custom Analytics Endpoint

```javascript
// Add to your backend
app.post('/api/chatbot-analytics', (req, res) => {
    const { event, data } = req.body;
    
    // Log to your analytics system
    console.log('Chatbot Event:', event, data);
    
    // Save to database
    // Analytics.create({ event, data, timestamp: new Date() });
    
    res.json({ success: true });
});
```

## 🎯 Advanced Scenarios

### Multi-Tenant Chatbot

```javascript
// Different knowledge base per tenant
const TENANT_KNOWLEDGE_BASES = {
    'tenant1': { /* knowledge base */ },
    'tenant2': { /* knowledge base */ }
};

// Load based on current tenant
const currentTenant = getCurrentTenant();
const knowledgeBase = TENANT_KNOWLEDGE_BASES[currentTenant];
```

### A/B Testing

```javascript
// Test different welcome messages
const WELCOME_VARIANTS = [
    "Hello! How can I help?",
    "Hi there! Need payment help?",
    "Welcome! Ask me anything about payments"
];

const variant = Math.floor(Math.random() * WELCOME_VARIANTS.length);
```

### Conditional Features

```javascript
// Show different quick actions based on user role
if (userRole === 'developer') {
    // Show technical quick actions
    quickActions = ['Authentication', 'API Endpoints', 'Error Codes'];
} else if (userRole === 'merchant') {
    // Show business quick actions
    quickActions = ['Make Payment', 'Payment History', 'Refunds'];
}
```

## 📱 Mobile App Integration

### WebView (React Native)

```javascript
import { WebView } from 'react-native-webview';

const ChatbotWebView = () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${chatbotStyles}</style>
      </head>
      <body>
        ${chatbotHTML}
        <script>${chatbotScript}</script>
      </body>
    </html>
  `;

  return <WebView source={{ html }} />;
};
```

## 🌐 Multi-Language Sites

```html
<!-- Only load chatbot on English pages -->
{% if lang == 'en' %}
<link rel="stylesheet" href="/chatbot-styles.css">
<script src="/chatbot-script.js"></script>
{% endif %}
```

## ✅ Checklist Before Going Live

- [ ] Upload all files to your server
- [ ] Update file paths in your HTML
- [ ] Test on desktop browsers
- [ ] Test on mobile devices
- [ ] Verify quick action buttons work
- [ ] Test all knowledge base queries
- [ ] Check responsive design
- [ ] Verify page load performance
- [ ] Test fallback responses
- [ ] Set up analytics (optional)
- [ ] Update welcome message for your brand
- [ ] Customize colors to match your brand

Need help? Check the main README.md and CUSTOMIZATION_GUIDE.md files!