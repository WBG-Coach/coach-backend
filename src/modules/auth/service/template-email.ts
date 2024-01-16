export const OTP_EMAIL_SL = `
#{userName},

Please use the verification code below to sign in.

#{code}

This code is valid for 10 minutes and will securely sign you in using #{email}.

If you didn’t request this, you can safely ignore this email or let us know.

Thank you
#{appName} team
`;

export const OTP_EMAIL_NP = `
#{userName} जी,

कृपया साइन इन गर्नका लागि तलको प्रमाणीकरण कोड प्रयोग गर्नुहोस्।

#{code}

यो कोड १० मिनेटका लागि मान्य छ र #{email} प्रयोग गरी सुरक्षित रूपमा तपाईंलाई साइन इन गराउनेछ।

यदि तपाईंले यो अनुरोध गर्नुभएको छैन भने, तपाईं यो ईमेललाई सुरक्षित रूपमा अनदेखा गर्न सक्नुहुन्छ वा हामीलाई जानकारी गराउन सक्नुहुन्छ।

धन्यवाद
#{appName} टोली

`;
