# Example Responses - How to Add New Payment API Information

This guide shows you exactly how to add new DGS-Pay API information to the chatbot's knowledge base.

## 📝 Basic Example Format

Every entry in the knowledge base follows this structure:

```javascript
'keyword1|keyword2|keyword3': {
    response: `Your detailed response here...`,
    topic: 'category-name'
}
```

## 🎯 Real Examples from the Knowledge Base

### Example 1: Simple Text Response

**Topic:** Authentication

```javascript
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
\`\`\``,
    topic: 'authentication'
}
```

### Example 2: Response with Multiple Sections

**Topic:** Mobile Money

```javascript
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
    "callback_url": "https://your-callback.url"
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
\`\`\``,
    topic: 'mobile-money'
}
```

### Example 3: Step-by-Step Guide

**Topic:** Integration

```javascript
'integration|how to integrate|get started|setup|quickstart': {
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
- Use live credentials`,
    topic: 'integration'
}
```

### Example 4: Code-Heavy Response

**Topic:** Webhooks

```javascript
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
  "metadata": {
    "order_id": "1111",
    "custom_info": "Data analysis"
  },
  "created_at": "2025-12-15T12:42:32.453Z"
}
\`\`\`

⚠️ **Always verify the webhook secret before processing webhook data!**`,
    topic: 'webhooks'
}
```

## 🆕 Adding a New Topic

Let's add a new topic: **Refunds**

### Step 1: Identify Keywords
What might users ask?
- "How do I refund?"
- "Payment refund"
- "Refund policy"
- "Issue a refund"
- "Return payment"

### Step 2: Create the Entry

```javascript
'refund|refund policy|payment refund|issue refund|return payment': {
    response: `💳 **Payment Refunds**

To process a refund, use the payout APIs with the original payment details.

**Refund via Mobile Money:**
\`\`\`json
{
  "pay_info": {
    "api_code": "PAYOUT_MOBILE",
    "amount": 550,
    "currency": "RWF",
    "reference": "REFUND-MM1764319676",
    "callback_url": "https://your-callback.url",
    "description": "Refund for order #12345"
  },
  "to": {
    "payment_type": "mobile_money",
    "provider": "MTN",
    "phone": "782589800",
    "country_code": "250"
  }
}
\`\`\`

**Refund via Bank:**
\`\`\`json
{
  "pay_info": {
    "api_code": "PAYOUT_BANK",
    "amount": 55000,
    "currency": "RWF",
    "reference": "REFUND-BANK001",
    "callback_url": "https://your-callback.url"
  },
  "to": {
    "account_number": "recipient_account",
    "bank_code": "bank_identifier",
    "account_name": "account_holder_name"
  }
}
\`\`\`

**Best Practices:**
1. Use a clear refund reference starting with "REFUND-"
2. Include original transaction ID in reference if possible
3. Match original payment currency
4. Verify customer details match original payment
5. Keep refund records for reconciliation

⚠️ **Refunds are irreversible once completed. Verify all details before processing!**`,
    topic: 'refunds'
}
```

### Step 3: Add to Knowledge Base

Open `chatbot-script.js` and add the entry to `DGS_KNOWLEDGE_BASE`:

```javascript
const DGS_KNOWLEDGE_BASE = {
    // Existing entries...
    
    'refund|refund policy|payment refund|issue refund|return payment': {
        response: `💳 **Payment Refunds**
        // ... rest of response ...
        `,
        topic: 'refunds'
    }
};
```

## 📋 More Example Topics

### Example: Currency Exchange

```javascript
'exchange rate|currency conversion|convert currency': {
    response: `💱 **Currency Exchange**

DGS-Pay supports multiple currencies for payments:

**Supported Currencies:**
- RWF - Rwandan Franc
- UGX - Ugandan Shilling
- KES - Kenyan Shilling

**Payment Currency:**
The currency must match the customer's country and payment method.

**Example:**
\`\`\`json
{
  "pay_info": {
    "currency": "RWF",
    "amount": 550
  }
}
\`\`\`

⚠️ **Note:** Currency conversion happens at the payment processor level. Ensure you display the correct amount in the customer's local currency before initiating the payment.`,
    topic: 'general'
}
```

### Example: Transaction Limits

```javascript
'transaction limit|max amount|min amount|payment limits': {
    response: `⚖️ **Transaction Limits**

**Mobile Money Limits:**
- **Minimum Amount:** 100 RWF (or equivalent)
- **Maximum Amount:** Varies by provider
  - MTN: Up to 2,000,000 RWF per transaction
  - Airtel: Up to 1,500,000 RWF per transaction

**Card Payment Limits:**
- **Local Cards:** Up to 5,000,000 RWF per transaction
- **International Cards:** Up to 10,000,000 RWF per transaction

**Daily Limits:**
- **Individual:** Varies by customer account limits
- **Business:** Contact DGS-Pay for higher limits

**Best Practices:**
- Check limits before processing large payments
- Split large payments if needed
- Consider daily transaction volume limits
- Monitor for suspicious high-value transactions`,
    topic: 'general'
}
```

### Example: Customer Support

```javascript
'contact|support|help|customer service|talk to human': {
    response: `📞 **Contact Support**

If you need additional help beyond this documentation:

**Email Support:**
- Technical Issues: support@dgs-pay.com
- Business Inquiries: business@dgs-pay.com
- Security Concerns: security@dgs-pay.com

**Response Times:**
- Technical Issues: Within 24 hours
- Business Inquiries: Within 48 hours
- Security Concerns: Immediate (within 4 hours)

**Before Contacting Support:**
1. Check this chatbot for your answer
2. Review the full API documentation
3. Check the status page for service issues
4. Have your account number ready

**When Contacting Support, Include:**
- Your account number
- Error codes you're seeing
- API endpoint being called
- Request/response payloads (with sensitive data removed)
- Steps to reproduce the issue`,
    topic: 'support'
}
```

## 🎨 Formatting Your Responses

### Supported Formatting

**Bold Text:**
```markdown
**This is bold text**
```

**Inline Code:**
```markdown
Use \`PAYIN_MOBILE\` for mobile money payments
```

**Code Blocks:**
```markdown
\`\`\`
{
  "api_code": "PAYIN_MOBILE"
}
\`\`\`
```

**Lists:**
```markdown
- Item 1
- Item 2
- Item 3
```

**Headers:**
```markdown
### Section Title
```

**Emojis:**
```markdown
✅ Success
⚠️ Warning
❌ Error
💡 Tip
```

**Links:** (Note: These will be displayed as text)
```markdown
Visit https://dgs-pay.com for more info
```

## 🔑 Best Practices for Responses

### DO ✅

1. **Keep it concise** - Users want quick answers
2. **Use examples** - Code snippets help developers
3. **Be specific** - Give exact parameters and values
4. **Use formatting** - Bold, code, and lists improve readability
5. **Include warnings** - Alert users to important considerations
6. **Add references** - Link to related topics in the knowledge base
7. **Use emojis** - Makes responses more engaging

### DON'T ❌

1. **Don't be too verbose** - Get to the point quickly
2. **Don't use external links** - Keep all info self-contained
3. **Don't duplicate content** - Reference other topics instead
4. **Don't use jargon** - Explain technical terms
5. **Don't forget error handling** - Mention common pitfalls

## 📊 Organizing by Topic

Common topic categories:

```javascript
'topic': 'authentication'    // Login, tokens, secrets
'topic': 'payments'          // All payment types
'topic': 'mobile-money'      // Mobile money specifics
'topic': 'card-payments'     // Card payment specifics
'topic': 'payouts'           // Bank and mobile payouts
'topic': 'webhooks'          // Callbacks and verification
'topic': 'errors'            // Error codes and troubleshooting
'topic': 'validation'        // Field requirements
'topic': 'security'          // Security best practices
'topic': 'testing'           // Sandbox and testing
'topic': 'integration'       // Setup and getting started
'topic': 'general'           // General information
'topic': 'support'           // Contact and help
```

## 🧪 Testing Your New Response

### Method 1: Demo Page

1. Add your response to `chatbot-script.js`
2. Open `demo.html` in browser
3. Type a keyword to test

### Method 2: Console Testing

```javascript
// Open browser console and run:
const response = window.dgsChatbot.getResponse("your test question");
console.log(response);
```

### Method 3: Test Multiple Keywords

```javascript
// Test all variations of keywords
const testQuestions = [
    "How do I refund?",
    "I need a refund",
    "Refund policy",
    "Issue a refund"
];

testQuestions.forEach(q => {
    const response = window.dgsChatbot.getResponse(q);
    console.log('Q:', q);
    console.log('Match:', response.length > 200 ? '✅' : '❌');
});
```

## 📚 Complete Template

Copy this template for new entries:

```javascript
'keyword1|keyword2|keyword3|keyword4|keyword5': {
    response: `🎯 **Topic Title**

**Overview:**
Brief description of what this topic covers.

**Key Points:**
- Point 1
- Point 2
- Point 3

**Example:**
\`\`\`
Code example here
\`\`\`

**Best Practices:**
- Practice 1
- Practice 2

⚠️ **Important:** Any warnings or notes.`,
    topic: 'category'
}
```

## 🎉 Summary

To add new information:

1. **Identify keywords** users might use
2. **Write the response** with clear formatting
3. **Add code examples** where helpful
4. **Include warnings** for important considerations
5. **Test thoroughly** with demo page or console
6. **Deploy** updated files

**That's it! Your new topic is now live! 🚀**