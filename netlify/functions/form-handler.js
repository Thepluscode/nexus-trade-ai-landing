// Netlify Serverless Function for Form Handling
// This function handles form submissions and integrates with various services

const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const { formType, ...formData } = JSON.parse(event.body);

    // Validate required fields
    if (!formData.name || !formData.email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Name and email are required' })
      };
    }

    // Process different form types
    let emailTemplate;
    let subject;
    let recipientEmail;

    switch (formType) {
      case 'trial':
        subject = 'New Trial Signup - Nexus Trade AI';
        recipientEmail = process.env.SALES_EMAIL || 'sales@nexustradeai.com';
        emailTemplate = generateTrialEmail(formData);
        break;

      case 'demo':
        subject = 'New Demo Request - Nexus Trade AI';
        recipientEmail = process.env.SALES_EMAIL || 'sales@nexustradeai.com';
        emailTemplate = generateDemoEmail(formData);
        break;

      case 'contact':
        subject = 'New Sales Inquiry - Nexus Trade AI';
        recipientEmail = process.env.SALES_EMAIL || 'sales@nexustradeai.com';
        emailTemplate = generateContactEmail(formData);
        break;

      case 'enterprise':
        subject = 'New Enterprise Inquiry - Nexus Trade AI';
        recipientEmail = process.env.ENTERPRISE_EMAIL || 'enterprise@nexustradeai.com';
        emailTemplate = generateEnterpriseEmail(formData);
        break;

      default:
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ error: 'Invalid form type' })
        };
    }

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: subject,
      html: emailTemplate,
      replyTo: formData.email
    });

    // Send confirmation email to user
    const confirmationTemplate = generateConfirmationEmail(formType, formData);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: `Thank you for your interest in Nexus Trade AI`,
      html: confirmationTemplate
    });

    // Log to analytics (optional)
    await logConversion(formType, formData);

    // Integrate with CRM (optional)
    await integrateCRM(formType, formData);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully'
      })
    };

  } catch (error) {
    console.error('Form submission error:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Please try again or contact support'
      })
    };
  }
};

// Email template generators
function generateTrialEmail(data) {
  return `
    <h2>New Trial Signup</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    <p><strong>Trading Volume:</strong> ${data.volume}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>

    <h3>Next Steps:</h3>
    <ul>
      <li>Create trial account</li>
      <li>Send login credentials</li>
      <li>Schedule onboarding call</li>
    </ul>
  `;
}

function generateDemoEmail(data) {
  return `
    <h2>New Demo Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    <p><strong>Role:</strong> ${data.role}</p>
    <p><strong>Preferred Date:</strong> ${data.date}</p>
    <p><strong>Preferred Time:</strong> ${data.time}</p>
    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>

    <h3>Next Steps:</h3>
    <ul>
      <li>Send calendar invite</li>
      <li>Prepare custom demo</li>
      <li>Send pre-demo materials</li>
    </ul>
  `;
}

function generateContactEmail(data) {
  return `
    <h2>New Sales Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company}</p>
    <p><strong>Tier:</strong> ${data.tier}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>

    <h3>Next Steps:</h3>
    <ul>
      <li>Contact within 24 hours</li>
      <li>Qualify requirements</li>
      <li>Prepare proposal</li>
    </ul>
  `;
}

function generateEnterpriseEmail(data) {
  return `
    <h2>New Enterprise Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Institution:</strong> ${data.company}</p>
    <p><strong>Type:</strong> ${data.type}</p>
    <p><strong>AUM:</strong> ${data.aum}</p>
    <p><strong>Requirements:</strong></p>
    <p>${data.requirements}</p>
    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>

    <h3>Next Steps:</h3>
    <ul>
      <li>Executive team contact within 4 hours</li>
      <li>Schedule enterprise consultation</li>
      <li>Prepare custom proposal</li>
      <li>Assign dedicated account manager</li>
    </ul>
  `;
}

function generateConfirmationEmail(formType, data) {
  const confirmationMessages = {
    trial: 'Your 30-day free trial is being set up. You will receive login credentials within 24 hours.',
    demo: 'Your demo has been scheduled. You will receive a calendar invite shortly.',
    contact: 'Thank you for your inquiry. Our sales team will contact you within 24 hours.',
    enterprise: 'Thank you for your enterprise inquiry. Our executive team will contact you within 4 hours.'
  };

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2563eb;">Thank you for your interest in Nexus Trade AI</h1>

      <p>Dear ${data.name},</p>

      <p>${confirmationMessages[formType]}</p>

      <h2>What makes Nexus Trade AI different?</h2>
      <ul>
        <li>95μs average latency (100x faster than traditional platforms)</li>
        <li>150k orders/second throughput</li>
        <li>99.995% uptime guarantee</li>
        <li>Advanced AI-powered execution algorithms</li>
      </ul>

      <p>If you have any immediate questions, please contact us:</p>
      <ul>
        <li>Email: sales@nexustradeai.com</li>
        <li>Phone: +1 (555) 123-4567</li>
      </ul>

      <p>Best regards,<br>
      The Nexus Trade AI Team</p>

      <hr>
      <p style="font-size: 12px; color: #666;">
        This email was sent because you submitted a form on our website.
        If you did not request this, please ignore this email.
      </p>
    </div>
  `;
}

// Analytics logging
async function logConversion(formType, data) {
  try {
    // Log to your analytics service
    console.log('Conversion logged:', formType, data.email);

    // You can integrate with services like:
    // - Google Analytics Measurement Protocol
    // - Mixpanel
    // - Amplitude
    // - Custom analytics database

  } catch (error) {
    console.error('Analytics logging error:', error);
  }
}

// CRM integration
async function integrateCRM(formType, data) {
  try {
    // Integrate with your CRM system
    console.log('CRM integration:', formType, data.email);

    // You can integrate with:
    // - Salesforce
    // - HubSpot
    // - Pipedrive
    // - Custom CRM

  } catch (error) {
    console.error('CRM integration error:', error);
  }
}