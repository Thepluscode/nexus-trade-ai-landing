// Nexus Trade AI - Configuration File
// Update these values for production deployment

const CONFIG = {
    // API Endpoints
    api: {
        baseUrl: 'https://api.nexustradeai.com', // Replace with your API URL
        endpoints: {
            trialSignup: '/api/trial-signup',
            demoSchedule: '/api/demo-schedule',
            contactSales: '/api/contact-sales',
            enterpriseInquiry: '/api/enterprise-inquiry',
            trackConversion: '/api/track-conversion',
            newsletter: '/api/newsletter-signup'
        }
    },

    // Analytics Configuration
    analytics: {
        // Google Analytics 4
        googleAnalytics: {
            measurementId: 'G-STJE4H6DRF', // Your actual GA4 Measurement ID
            enabled: true
        },
        
        // Facebook Pixel
        facebookPixel: {
            pixelId: '1084464090297927', // Replace with your Facebook Pixel ID
            enabled: true
        },
        
        // LinkedIn Insight Tag
        linkedinInsight: {
            partnerId: 'XXXXXXX', // Replace with your LinkedIn Partner ID
            enabled: true
        },
        
        // Custom Analytics
        customAnalytics: {
            enabled: true,
            endpoint: '/api/analytics'
        }
    },

    // Email Configuration
    email: {
        // Gmail SMTP Configuration (for Netlify Functions)
        smtp: {
            service: 'gmail',
            user: 'YOUR_EMAIL@gmail.com', // Replace with your Gmail address
            pass: 'wfrw bbpd kksb zvaj', // Your Gmail app password
            salesEmail: 'sales@nexustradeai.com',
            enterpriseEmail: 'enterprise@nexustradeai.com'
        },
        // EmailJS for client-side email sending (optional)
        emailjs: {
            serviceId: 'service_xxxxxxx', // Replace with your EmailJS Service ID
            templateIds: {
                trial: 'template_trial_xxx',
                demo: 'template_demo_xxx',
                contact: 'template_contact_xxx',
                enterprise: 'template_enterprise_xxx'
            },
            publicKey: 'your_public_key_here' // Replace with your EmailJS Public Key
        }
    },

    // CRM Integration
    crm: {
        // Salesforce
        salesforce: {
            enabled: false,
            webToLeadUrl: 'https://webto.salesforce.com/servlet/servlet.WebToLead'
        },
        
        // HubSpot
        hubspot: {
            enabled: false,
            portalId: 'XXXXXXXX',
            formIds: {
                trial: 'trial-form-id',
                demo: 'demo-form-id',
                contact: 'contact-form-id',
                enterprise: 'enterprise-form-id'
            }
        },
        
        // Pipedrive
        pipedrive: {
            enabled: false,
            apiToken: 'your_pipedrive_api_token',
            companyDomain: 'your-company'
        }
    },

    // Calendar Integration
    calendar: {
        // Calendly
        calendly: {
            enabled: true,
            urls: {
                demo: 'https://calendly.com/nexustradeai/demo', // Replace with your Calendly URL
                enterprise: 'https://calendly.com/nexustradeai/enterprise-consultation'
            }
        },
        
        // Acuity Scheduling
        acuity: {
            enabled: false,
            appointmentTypeIds: {
                demo: 'XXXXXXXX',
                enterprise: 'XXXXXXXX'
            }
        }
    },

    // Chat Integration
    chat: {
        // Intercom
        intercom: {
            enabled: false,
            appId: 'your_intercom_app_id'
        },
        
        // Drift
        drift: {
            enabled: false,
            widgetId: 'your_drift_widget_id'
        },
        
        // Zendesk Chat
        zendesk: {
            enabled: false,
            key: 'your_zendesk_chat_key'
        }
    },

    // Payment Integration (for trials that require payment info)
    payment: {
        // Stripe
        stripe: {
            enabled: false,
            publishableKey: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx' // Replace with your Stripe key
        }
    },

    // Feature Flags
    features: {
        enableLiveChat: false,
        enablePaymentCapture: false,
        enableA11yFeatures: true,
        enablePWA: false,
        enableOfflineMode: false
    },

    // Environment
    environment: 'development', // 'development' | 'staging' | 'production'
    
    // Contact Information - UPDATE THESE WITH YOUR ACTUAL DETAILS
    contact: {
        email: {
            sales: 'sales@nexustradeai.com',        // Update with your sales email
            support: 'support@nexustradeai.com',    // Update with your support email
            enterprise: 'enterprise@nexustradeai.com', // Update with your enterprise email
            general: 'info@nexustradeai.com'        // Update with your general email
        },
        phone: {
            sales: '+1 (555) 123-4567',             // Update with your sales phone
            support: '+1 (555) 123-4568',           // Update with your support phone
            enterprise: '+1 (555) 123-4569'         // Update with your enterprise phone
        },
        address: {
            street: '123 Financial District',        // Update with your address
            city: 'New York',                       // Update with your city
            state: 'NY',                           // Update with your state
            zip: '10004',                          // Update with your zip
            country: 'United States'               // Update with your country
        }
    },

    // Social Media
    social: {
        twitter: 'https://twitter.com/nexustradeai',
        linkedin: 'https://linkedin.com/company/nexustradeai',
        github: 'https://github.com/nexustradeai',
        youtube: 'https://youtube.com/c/nexustradeai'
    },

    // Legal
    legal: {
        privacyPolicy: '/privacy-policy',
        termsOfService: '/terms-of-service',
        cookiePolicy: '/cookie-policy'
    },

    // Performance Monitoring
    monitoring: {
        // Sentry for error tracking
        sentry: {
            enabled: false,
            dsn: 'https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@sentry.io/xxxxxxx'
        },
        
        // LogRocket for session recording
        logRocket: {
            enabled: false,
            appId: 'your_logrocket_app_id'
        }
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}
