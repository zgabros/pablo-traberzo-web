// EmailJS configuration
// TODO: Replace these values with your actual EmailJS credentials
// Get these from: https://dashboard.emailjs.com/

const emailConfig = {
  serviceId: "service_v8rn4nk",
  templateId: "template_a9m2di8",
  publicKey: "nnQoyJllpI9sHKdVz"
};

// Instructions to get your EmailJS config:
// 1. Go to https://www.emailjs.com/ and sign up (free)
// 2. Add Email Service:
//    - Go to "Email Services" > "Add New Service"
//    - Choose Gmail (or your email provider)
//    - Connect your email account
//    - Copy the Service ID
// 3. Create Email Template:
//    - Go to "Email Templates" > "Create New Template"
//    - Use template variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    - Copy the Template ID
// 4. Get Public Key:
//    - Go to "Account" > "General"
//    - Copy the Public Key

export default emailConfig;
