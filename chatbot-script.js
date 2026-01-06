/**
 * DGS-Pay API Chatbot
 * A lightweight, rule-based chatbot for payment API documentation
 * No external API dependencies - completely free to use!
 */

// Knowledge Base - Comprehensive DGS-Pay API Documentation
const DGS_KNOWLEDGE_BASE = {
    // Authentication
    'authentication|auth|token|bearer|login': {
        response: `🔑 **API Authentication**

All DGS API endpoints require Bearer Token authentication.

**Authentication Header:**
\`\`\`
Authorization: Bearer YOUR_DGS_API_TOKEN
Content-Type: application/json
\`\`\`

**Base URL:**
\`\`\`
https://pay.digitalservicescenter.rw/api-v2
\`\`\`

**Requesting a Token:**
\`\`\`
POST /api-v2/token/{environment}
\`\`\`

**Parameters:**
- \`account_number\` (string): Your DGS-assigned client account number
- \`client_secret\` (string): Secret key assigned for the environment
- \`{environment}\` must be either \`live\` or \`sandbox\`

**Example Request:**
\`\`\`
curl -X POST "https://pay.digitalservicescenter.rw/api-v2/token/live" \\
-H "Content-Type: application/x-www-form-urlencoded" \\
-d "account_number=ACC-2322-0001" \\
-d "client_secret=your_live_secret"
\`\`\`

**Response:**
\`\`\`
{
  "access_token": "a3f4e2d5b1c9f0...",
  "token_type": "Bearer",
  "expires_in": 600,
  "environment": "live"
}
\`\`\`

⚠️ **Important:** Tokens expire after 10 minutes (600 seconds). Implement token refresh logic in your application.`,
        topic: 'authentication'
    },

    'secret key|client secret|get secret|secret key?': {
        response: `🔐 **Client Secret**

To get your client secret:

1. **Login** to your DGS-Pay account or **create a new account**
2. Navigate to the **API Credentials** page
3. Go to the **Client Secret Section**
4. You'll find secrets for both sandbox and live environments

Keep your client secret secure and never share it publicly!`,
        topic: 'authentication'
    },

    'token expired|token expire|refresh token|expires_in': {
        response: `⏰ **Token Expiration**

**Token Validity:** 10 minutes (600 seconds)

**Best Practice:** Implement token refresh logic in your application:

\`\`\`javascript
// Check if token is about to expire
function shouldRefreshToken(expiresAt) {
    return Date.now() >= expiresAt - 60000; // Refresh 1 minute before expiry
}

// Refresh token if needed
if (shouldRefreshToken(tokenExpiry)) {
    token = await requestNewToken();
}
\`\`\`

This prevents API calls from failing due to expired tokens.`,
        topic: 'authentication'
    },

    // API Codes
    'api code|available codes|payin|payout|mobile|card|bank': {
        response: `📋 **Available API Codes`

DGS-Pay supports the following payment types:

**Collection (Payin):**
- \`PAYIN_MOBILE\` - Mobile Money Collection
- \`PAYIN_CARD_LOCAL\` - Local Card Collection
- \`PAYIN_CARD_INTL\` - International Card Collection

**Payout:**
- \`PAYOUT_BANK\` - Bank Payouts
- \`PAYOUT_MOBILE\` - Mobile Money Payouts

Use these codes in your \`api_code\` parameter when initiating payments.`,
        topic: 'api-codes'
    },

    // Mobile Money
    'mobile money|mtn|airtel|vodafone|mpesa': {
        response: `📱 **Mobile Money API**

Seamlessly integrate with MTN, Airtel, and Vodafone mobile money platforms.

**Supported Countries:** RW, UG, NG, KE

**Supported Providers:**
- MTN Mobile Money - Leading mobile money provider
- Airtel Money - Reliable mobile payments

**Endpoint:**
\`\`\`
POST /api/init_payment
\`\`\`

**Required Parameters:**

\`\`\`json
{
  "pay_info": {
    "amount": 100,
    "currency": "RWF",
    "api_code": "PAYIN_MOBILE",
    "reference": "MMTEST001",
    "callback_url": "https://your-callback.url",
    "description": "Test Mobile Money Payment"
  },
  "from": {
    "payment_type": "mobile_money",
    "provider": "MTN",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "782589800",
    "country_code": "250"
  }
}
\`\`\`

**Important:** Always provide the correct currency, country code, and provider for successful processing.`,
        topic: 'mobile-money'
    },

    'initiate payment|start payment|collect payment|payment request': {
        response: `💳 **Initiating a Payment**

Use this endpoint to collect funds:

\`\`\`
POST /api/init_payment
\`\`\`

**Pay Info Parameters:**
- \`amount\` (numeric, required): Payment amount
- \`currency\` (string, required): ISO 4217 currency code (RWF, UGX, KES)
- \`api_code\` (string, required): Payment type code
- \`reference\` (string, required): Unique alphanumeric transaction reference (6-50 chars)
- \`callback_url\` (string, required): HTTPS URL for status updates
- \`description\` (string, optional): Payment description

**From Parameters:**
- \`payment_type\` (string, required): Payment method type
- \`provider\` (string, required): Provider name (for mobile money)
- \`name\` (string, required): Customer full name (2-50 characters)
- \`email\` (string, required): Customer email address
- \`phone\` (string, required): Customer phone number
- \`country_code\` (string, required): International country code

See the mobile money documentation for a complete example.`,
        topic: 'payments'
    },

    'complete request|full example|example request': {
        response: `📝 **Complete Request Example`

Here's a complete mobile money payment request:

\`\`\`json
{
  "pay_info": {
    "amount": 100,
    "currency": "RWF",
    "api_code": "PAYIN_MOBILE",
    "reference": "MMTEST001",
    "callback_url": "https://your-callback.url",
    "description": "Test Mobile Money Payment"
  },
  "from": {
    "payment_type": "mobile_money",
    "provider": "MTN",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "782589800",
    "country_code": "250"
  },
  "metadata": {
    "order_id": "12345",
    "custom_info": "DGS Mobile Money Test"
  },
  "simulation": {
    "context": "auth_pin",
    "response": "approved"
  }
}
\`\`\``,
        topic: 'payments'
    },

    // Response Formats
    'response format|pending|success|failed|status': {
        response: `📊 **Response Formats`

**Pending/Success Response:**
\`\`\`json
{
  "status": "pending",
  "message": "Charge created",
  "code": "02",
  "transaction_id": 100,
  "tx_ref": "MM1764319676",
  "payment_type": "mobile_money",
  "amount": 550,
  "currency": "RWF",
  "customer_id": "cus_haqG7fRTfv",
  "reference": "MM1764319676",
  "network": "MTN",
  "phone_number": "0782589800",
  "fee": 39,
  "next_action": {
    "type": "payment_instruction",
    "note": "Please authorise this payment on your mobile device..."
  }
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "status": "failed",
  "message": "Request is not valid",
  "code": "10400",
  "transaction_id": 95,
  "tx_ref": "MM_1764318847",
  "payment_type": "mobile_money",
  "errors": {
    "reference": "must be an alphanumeric string"
  }
}
\`\`\`

**Status Indicators:**
- \`pending\` - Awaiting customer authorization
- \`success\` - Payment completed successfully
- \`failed\` - Payment failed or was declined`,
        topic: 'responses'
    },

    'next action|payment instruction|authorize|authorise': {
        response: `🔔 **Next Action - Payment Authorization**

When a payment is \`pending\`, check the \`next_action\` field:

\`\`\`json
"next_action": {
  "type": "payment_instruction",
  "note": "Please authorise this payment on your mobile device..."
}
\`\`\`

This means the customer needs to:
1. Check their mobile device
2. Authorize the payment using their PIN
3. Wait for the status to update via webhook

The payment will complete once the customer authorizes it.`,
        topic: 'responses'
    },

    // Error Codes
    'error code|error codes|error 10400|error 400|failed|errors': {
        response: `⚠️ **Error Codes**

Common error responses include:

**Error Response Structure:**
\`\`\`json
{
  "status": "failed",
  "message": "Request is not valid",
  "code": "10400",
  "errors": {
    "reference": "must be an alphanumeric string"
  }
}
\`\`\`

**Common Validation Errors:**
- \`reference\` - must be alphanumeric (6-50 characters)
- \`name\` - must be 2-50 characters, letters/spaces/punctuation only
- Missing required fields
- Invalid phone number format
- Invalid currency code

**Error Codes:**
- \`10400\` - Bad Request / Validation Error
- Check the \`errors\` object for specific field validation messages.`,
        topic: 'errors'
    },

    // Webhooks
    'webhook|callback|webhook secret|callback url|webhook verification': {
        response: `🔗 **Webhook Handling**

DGS sends final payment status updates to your configured \`callback_url\`.

**Webhook Security:**
All webhook requests include the \`HTTP_DGS_WEBHOOK_SECRET\` header for verification.

**Verification Example (PHP):**
\`\`\`php
$webhookSecret = $_SERVER['HTTP_DGS_WEBHOOK_SECRET'];
if ($webhookSecret !== 'YOUR_WEBHOOK_SECRET') {
    http_response_code(401);
    exit('Unauthorized');
}
\`\`\`

**Success Webhook Payload:**
\`\`\`json
{
  "event": "transaction.completed",
  "status": "success",
  "direction": "collection",
  "reference": "PpSDagadPyP5",
  "transaction_id": 56,
  "amount": 550,
  "currency": "RWF",
  "fee": 38.5,
  "net_amount": 511.5,
  "payment_type": "mobile_money",
  "customer": {
    "phone": "2500782589800",
    "email": "serge.alain@gmail.com",
    "name": "Alain"
  },
  "beneficiary": null,
  "metadata": {
    "order_id": "1111",
    "custom_info": "Data analysis"
  },
  "created_at": "2025-12-15T12:42:32.453Z"
}
\`\`\`

⚠️ **Always verify the webhook secret before processing webhook data!**`,
        topic: 'webhooks'
    },

    // Field Requirements
    'reference field|reference requirement|alphanumeric|reference validation': {
        response: `📝 **Reference Field Requirements**

The \`reference\` field has strict validation rules:

**Requirements:**
- **Length:** 6 to 50 characters
- **Allowed characters:** Letters (A-Z, a-z) and numbers (0-9) only
- **No special characters** (no spaces, hyphens, underscores, etc.)
- Must be unique for each transaction

**Valid Examples:**
- \`PAY2024001\`
- \`ORD-123456\` ❌ (contains hyphen - invalid)
- \`Ref001\` ❌ (too short - must be 6+ chars)
- \`TRANSACTIONID12345\` ✅

**Invalid Examples:**
- \`PAY-001\` (contains hyphen)
- \`PAY_001\` (contains underscore)
- \`PAY 001\` (contains space)
- \`abc\` (too short)

**Best Practice:** Use a combination of your order ID and timestamp to ensure uniqueness.`,
        topic: 'validation'
    },

    'customer name|name requirement|name validation': {
        response: `👤 **Customer Name Requirements**

The \`name\` field for customer information has specific requirements:

**Requirements:**
- **Length:** 2 to 50 characters
- Must be at least 2 characters

**Allowed Characters:**
- Letters (a-z, A-Z)
- Spaces
- Commas (,)
- Periods (.)
- Apostrophes (')
- Hyphens (-)

**Valid Examples:**
- \`John Doe\` ✅
- \`Mary-Jane Smith\` ✅
- \`O'Connor\` ✅
- \`Dr. John Smith\` ✅

**Invalid Examples:**
- \`J\` (too short - minimum 2 characters)
- \`John123\` (contains numbers)
- \`John@Doe\` (contains special character)

**Best Practice:** Use the customer's full name as it appears on their payment account.`,
        topic: 'validation'
    },

    // Rate Limits
    'rate limit|limits|usage|throttle|rate-limit': {
        response: `⚡ **Rate Limits**

Current DGS-Pay API does not specify explicit rate limits in the documentation.

**Best Practices:**
- Implement exponential backoff for failed requests
- Cache authentication tokens and refresh before expiration
- Use webhooks instead of polling for payment status
- Handle errors gracefully and retry where appropriate

**If you encounter rate limiting:**
- Implement proper error handling
- Add delays between retry attempts
- Contact DGS support for specific rate limit information

For production systems, consider implementing a request queue to manage high-volume traffic efficiently.`,
        topic: 'rate-limits'
    },

    // Card Payments
    'card payment|card local|card international|visa|mastercard': {
        response: `💳 **Card Payments**

DGS-Pay supports two types of card collections:

**PAYIN_CARD_LOCAL**
- Local card collection
- Supports domestic payment cards
- Lower fees for local transactions

**PAYIN_CARD_INTL**
- International card collection
- Supports Visa, Mastercard, and other major cards
- Higher fees for international processing

**Basic Card Payment Structure:**
\`\`\`json
{
  "pay_info": {
    "api_code": "PAYIN_CARD_LOCAL",
    "amount": 50000,
    "currency": "RWF",
    "reference": "CARD001",
    "callback_url": "https://your-callback.url"
  },
  "from": {
    "payment_type": "card",
    // Additional card details required
  }
}
\`\`\`

For complete card payment documentation, please refer to the official DGS-Pay API docs or contact support for specific card integration details.`,
        topic: 'card-payments'
    },

    // Bank Payouts
    'bank payout|bank transfer|payout bank|withdraw bank': {
        response: `🏦 **Bank Payouts`

DGS-Pay supports bank payouts using the \`PAYOUT_BANK\` API code.

**Use Cases:**
- Paying vendors and suppliers
- Transferring funds to company accounts
- Customer refunds to bank accounts

**Basic Structure:**
\`\`\`json
{
  "pay_info": {
    "api_code": "PAYOUT_BANK",
    "amount": 50000,
    "currency": "RWF",
    "reference": "BANK001",
    "callback_url": "https://your-callback.url"
  },
  "to": {
    "account_number": "recipient_account",
    "bank_code": "bank_identifier",
    "account_name": "account_holder_name"
  }
}
\`\`\`

For complete bank payout documentation including required fields and supported banks, please contact DGS-Pay support.`,
        topic: 'payouts'
    },

    // Mobile Money Payouts
    'mobile money payout|payout mobile|send money|withdraw mobile': {
        response: `📱 **Mobile Money Payouts`

DGS-Pay supports mobile money payouts using the \`PAYOUT_MOBILE\` API code.

**Supported Providers:**
- MTN Mobile Money
- Airtel Money

**Use Cases:**
- Customer refunds to mobile money
- Paying remote workers
- Disbursing commissions

**Basic Structure:**
\`\`\`json
{
  "pay_info": {
    "api_code": "PAYOUT_MOBILE",
    "amount": 50000,
    "currency": "RWF",
    "reference": "PAYOUT001",
    "callback_url": "https://your-callback.url"
  },
  "to": {
    "payment_type": "mobile_money",
    "provider": "MTN",
    "phone": "782589800",
    "country_code": "250"
  }
}
\`\`\`

For complete payout documentation, please refer to the official DGS-Pay API docs.`,
        topic: 'payouts'
    },

    // Integration Help
    'integration|how to integrate|get started|setup|quickstart|quick start': {
        response: `🚀 **Getting Started with Integration**

**Step 1: Get Credentials**
1. Create an account at DGS-Pay
2. Navigate to API Credentials
3. Get your account number and client secret

**Step 2: Get Your Token**
\`\`\`
POST /api-v2/token/sandbox
\`\`\`
Use sandbox for testing, live for production.

**Step 3: Make Your First Payment**
Use \`PAYIN_MOBILE\` to start collecting mobile money payments.

**Step 4: Setup Webhooks**
Configure your callback URL to receive payment status updates.

**Step 5: Go Live**
- Test thoroughly in sandbox
- Switch to live environment
- Use live credentials

**Development Tips:**
- Start with sandbox environment
- Test error scenarios
- Implement proper error handling
- Use unique references for each transaction

Need help with a specific step? Just ask!`,
        topic: 'integration'
    },

    // Currency
    'currency|rwf|ugx|kes|currencies': {
        response: `💱 **Supported Currencies**

DGS-Pay supports the following ISO 4217 currency codes:

**Currencies:**
- \`RWF\` - Rwandan Franc
- \`UGX\` - Ugandan Shilling
- \`KES\` - Kenyan Shilling

**Usage:**
Include the currency code in your payment request:

\`\`\`json
{
  "pay_info": {
    "currency": "RWF",
    "amount": 550
  }
}
\`\`\`

**Important:** Always use the correct currency code for the customer's country and payment method to ensure successful processing.`,
        topic: 'general'
    },

    // Countries
    'countries|country code|rwanda|uganda|kenya|nigeria': {
        response: `🌍 **Supported Countries**

DGS-Pay supports mobile money in these countries:

| Country | Code | Mobile Money Providers |
|---------|------|------------------------|
| Rwanda | RW (250) | MTN, Airtel |
| Uganda | UG (256) | MTN, Airtel |
| Kenya | KE (254) | M-Pesa (Vodafone) |
| Nigeria | NG (234) | MTN, Airtel |

**Country Codes:**
Use the international country code in requests:
- Rwanda: \`250\`
- Uganda: \`256\`
- Kenya: \`254\`
- Nigeria: \`234\`

**Example:**
\`\`\`json
{
  "from": {
    "country_code": "250"
  }
}
\`\`\``,
        topic: 'general'
    },

    // Fees
    'fee|fees|transaction fee|cost|charge': {
        response: `💰 **Transaction Fees**

Fees are included in the API response:

**Example Response:**
\`\`\`json
{
  "amount": 550,
  "currency": "RWF",
  "fee": 39,
  "net_amount": 511.5
}
\`\`\`

**Fee Fields:**
- \`amount\` - Total transaction amount
- \`fee\` - Transaction fee charged
- \`net_amount\` - Amount received after fees (amount - fee)

**Fee Structure:**
Fees vary by:
- Payment type (mobile money, card, bank)
- Currency
- Amount
- Local vs International

For detailed fee schedules, please refer to your DGS-Pay account dashboard or contact support.`,
        topic: 'general'
    },

    // Testing
    'testing|test|sandbox|simulation|test payment': {
        response: `🧪 **Testing with Sandbox**

**Sandbox Environment:**
Base URL: \`https://pay.digitalservicescenter.rw/api-v2\`
Use \`/api-v2/token/sandbox\` to get sandbox tokens.

**Simulation Mode:**
Use the \`simulation\` object to test payment flows:

\`\`\`json
{
  "simulation": {
    "context": "auth_pin",
    "response": "approved"
  }
}
\`\`\`

**Simulation Response Options:**
- \`approved\` - Simulate successful payment
- \`declined\` - Simulate failed payment
- \`pending\` - Simulate pending authorization

**Testing Best Practices:**
1. Use unique references for each test
2. Test both success and failure scenarios
3. Verify webhook callbacks are received
4. Test token refresh logic
5. Validate all required fields

⚠️ Never use real customer data in sandbox. Always use test data!`,
        topic: 'testing'
    },

    // Security
    'security|secure|best practice|security tips|api security': {
        response: `🔒 **Security Best Practices**

**API Security:**
- Never expose your \`client_secret\` in frontend code
- Always use HTTPS for all API calls
- Store secrets securely (environment variables, secret managers)
- Rotate your secrets regularly

**Webhook Security:**
- Always verify \`HTTP_DGS_WEBHOOK_SECRET\` header
- Implement request signature verification if available
- Use HTTPS for your callback URLs
- Validate all webhook data before processing

**Application Security:**
- Implement rate limiting on your endpoints
- Sanitize and validate all user inputs
- Use parameterized queries to prevent SQL injection
- Implement proper authentication on your webhook endpoints

**Code Example (Node.js):**
\`\`\`javascript
// Never do this (exposes secrets in frontend)
const clientSecret = 'your_secret_here'; // ❌

// Do this (use environment variables)
const clientSecret = process.env.CLIENT_SECRET; // ✅
\`\`\``,
        topic: 'security'
    }
};

// Fallback responses for out-of-scope questions
const FALLBACK_RESPONSES = [
    "I'm designed to help with DGS-Pay API documentation only. Could you ask a question about authentication, payments, webhooks, or error handling?",
    "I can only answer questions about the DGS-Pay API. Try asking about mobile money integration, token authentication, or payment endpoints.",
    "My expertise is limited to DGS-Pay payment API documentation. For general programming questions, I'd recommend other resources.",
    "I'm here to help with DGS-Pay API integration. Ask me about payment methods, authentication, webhooks, or troubleshooting!",
    "I can assist with DGS-Pay API questions. Topics I can help with include: authentication, mobile money payments, error codes, and integration setup."
];

// Chatbot Application
class DGSChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
    }

    cacheElements() {
        this.container = document.getElementById('dgs-chatbot-container');
        this.toggleBtn = document.getElementById('dgs-chatbot-toggle');
        this.minimizeBtn = document.getElementById('dgs-minimize-btn');
        this.messagesContainer = document.getElementById('dgs-chat-messages');
        this.input = document.getElementById('dgs-chat-input');
        this.sendBtn = document.getElementById('dgs-send-btn');
        this.quickBtns = document.querySelectorAll('.dgs-quick-btn');
    }

    bindEvents() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleChat());
        }

        if (this.minimizeBtn) {
            this.minimizeBtn.addEventListener('click', () => this.toggleChat());
        }

        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query');
                if (query) {
                    this.input.value = query;
                    this.sendMessage();
                }
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;

        if (this.container) {
            if (this.isOpen) {
                this.container.classList.add('dgs-visible');
            } else {
                this.container.classList.remove('dgs-visible');
            }
        }

        if (this.toggleBtn) {
            if (this.isOpen) {
                this.toggleBtn.classList.add('dgs-hidden');
            } else {
                this.toggleBtn.classList.remove('dgs-hidden');
            }
        }
    }

    async sendMessage() {
        const message = this.input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate thinking time
        await this.delay(500 + Math.random() * 500);

        // Remove typing indicator
        this.hideTypingIndicator();

        // Get and display response
        const response = this.getResponse(message);
        this.addMessage(response, 'bot');
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `dgs-message dgs-${type}-message`;

        const avatar = document.createElement('div');
        avatar.className = 'dgs-message-avatar';
        avatar.textContent = type === 'bot' ? '🤖' : '👤';

        const messageContent = document.createElement('div');
        messageContent.className = 'dgs-message-content';
        messageContent.innerHTML = this.formatMessage(content);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    formatMessage(content) {
        // Convert markdown-style code blocks
        content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        
        // Convert inline code
        content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Convert bold text
        content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Convert line breaks
        content = content.replace(/\n/g, '<br>');
        
        // Convert markdown lists
        content = content.replace(/- (.+)<br>/g, '<li>$1</li>');
        content = content.replace(/<li>(.+)<\/li>/g, '<ul><li>$1</li></ul>');
        content = content.replace(/<\/ul><ul>/g, '');

        return content;
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'dgs-typing-indicator';
        indicator.id = 'dgs-typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';

        this.messagesContainer.appendChild(indicator);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('dgs-typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Search through knowledge base
        for (const [keywords, data] of Object.entries(DGS_KNOWLEDGE_BASE)) {
            const keywordList = keywords.split('|');
            
            // Check if any keyword matches
            for (const keyword of keywordList) {
                if (lowerMessage.includes(keyword.trim())) {
                    return data.response;
                }
            }
        }

        // Return random fallback response
        const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
        return FALLBACK_RESPONSES[randomIndex];
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dgsChatbot = new DGSChatbot();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DGSChatbot, DGS_KNOWLEDGE_BASE };
}