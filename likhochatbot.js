document.addEventListener('DOMContentLoaded', function() {
  // Create chatbot container
  const chatbotContainer = document.createElement('div');
  chatbotContainer.className = 'chatbot-container';
  // ...existing code...

document.body.appendChild(chatbotContainer);

// --- Add this block after appending the chatbotContainer and toggleBtn ---

const toggleBtn = document.createElement('button');
toggleBtn.id = 'chatbot-toggle-btn';
toggleBtn.innerHTML = '<span class="open-icon">💬</span>';
toggleBtn.style.position = 'fixed';
toggleBtn.style.bottom = '20px';
toggleBtn.style.right = '20px';
toggleBtn.style.zIndex = '1001';
toggleBtn.style.width = '60px';
toggleBtn.style.height = '60px';
toggleBtn.style.borderRadius = '50%';
toggleBtn.style.background = '#007bff';
toggleBtn.style.color = '#fff';
toggleBtn.style.fontSize = '2em';
toggleBtn.style.border = 'none';
toggleBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
toggleBtn.style.cursor = 'pointer';
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', toggleChatbot);

// --- Pop-up message when chatbot is closed ---
const popup = document.createElement('div');
popup.id = 'chatbot-popup-message';
popup.textContent = "Need help? Chat with Likho's assistant!";
popup.style.position = 'fixed';
popup.style.bottom = '90px';
popup.style.right = '30px';
popup.style.background = '#222';
popup.style.color = '#fff';
popup.style.padding = '12px 18px';
popup.style.borderRadius = '8px';
popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)';
popup.style.fontSize = '1em';
popup.style.zIndex = '1002';
popup.style.display = 'none';
document.body.appendChild(popup);

// Show the popup after 5 seconds if chatbot is closed
setTimeout(() => {
  if (!isChatbotOpen) {
    popup.style.display = 'block';
    // Hide popup after 7 seconds or when user opens chatbot
    setTimeout(() => {
      popup.style.display = 'none';
    }, 7000);
  }
}, 5000);

// Hide popup if user opens the chatbot
toggleBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// ...existing code...
  
  // Create chatbot elements
  const chatbotHeader = document.createElement('div');
  chatbotHeader.className = 'chatbot-header';
  chatbotHeader.innerHTML = `
    <div class="chatbot-title">
      <img src="profile.png" alt="Likho Pikelela" class="chatbot-avatar">
      <h3>Likho's Portfolio Assistant</h3>
    </div>
    
  `;
  
  const chatbotBody = document.createElement('div');
  chatbotBody.className = 'chatbot-body';
  
  const chatbotMessages = document.createElement('div');
  chatbotMessages.className = 'chatbot-messages';
  
  const chatbotInput = document.createElement('div');
  chatbotInput.className = 'chatbot-input';
  chatbotInput.innerHTML = `
    <input type="text" id="user-input" placeholder="Ask me anything about Likho...">
    <button id="send-btn">Send</button>
  `;
  
  // Assemble chatbot
  chatbotBody.appendChild(chatbotMessages);
  chatbotContainer.appendChild(chatbotHeader);
  chatbotContainer.appendChild(chatbotBody);
  chatbotContainer.appendChild(chatbotInput);
  document.body.appendChild(chatbotContainer);
  
  // Initialize chatbot state
  let isChatbotOpen = false;
  
  // Function to toggle chatbot visibility
  function toggleChatbot() {
    if (isChatbotOpen) {
      chatbotContainer.classList.remove('open');
    } else {
      chatbotContainer.classList.add('open');
      document.getElementById('user-input').focus();
      
      // Add welcome message if no messages exist
      if (chatbotMessages.children.length === 0) {
        addBotMessage("Hi there! I'm Likho's portfolio assistant. Ask me anything about Likho's experience, skills, education, or projects!");
      }
    }
    isChatbotOpen = !isChatbotOpen;
  }
  
  // Add event listener to toggle button
  document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
  
  // Function to add bot message
  function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.innerHTML = `
      <div class="message-avatar">
        <img src="profile.png" alt="Likho Pikelela">
      </div>
      <div class="message-content">${message}</div>
    `;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // Function to add user message
  function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = `
      <div class="message-content">${message}</div>
    `;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  // ENTITY RECOGNITION SYSTEM
  const entities = {
    // Person entities
    PERSON: {
      patterns: ['likho', 'pikelela', 'likho pikelela', 'he', 'him', 'his', 'this person', 'this guy', 'the candidate'],
      type: 'PERSON'
    },
    
    // Skill entities
    TECHNICAL_SKILLS: {
      patterns: [
        'digital forensics', 'incident response', 'network security', 'vulnerability assessment',
        'malware analysis', 'siem', 'penetration testing', 'risk assessment', 'security awareness'
      ],
      type: 'TECHNICAL_SKILL'
    },
    
    SOFT_SKILLS: {
      patterns: [
        'communication', 'teamwork', 'collaboration', 'problem solving', 'critical thinking',
        'adaptability', 'attention to detail', 'time management', 'leadership'
      ],
      type: 'SOFT_SKILL'
    },
    
    PROGRAMMING_LANGUAGES: {
      patterns: ['python', 'javascript', 'html', 'css', 'programming', 'coding', 'code'],
      type: 'PROGRAMMING'
    },
    
    TOOLS: {
      patterns: [
        'wireshark', 'metasploit', 'burp suite', 'splunk', 'nikto', 'nmap',
        'john the ripper', 'wazuh', 'inssider', 'owasp zap'
      ],
      type: 'TOOL'
    },
    
    // Education entities
    EDUCATION: {
      patterns: [
        'education', 'school', 'study', 'studied', 'qualification', 'degree',
        'certificate', 'certification', 'course', 'bloekombos', 'digital regenesys'
      ],
      type: 'EDUCATION'
    },
    
    // Experience entities
    EXPERIENCE: {
      patterns: [
        'experience', 'work', 'job', 'internship', 'career', 'position',
        'employment', 'capaciti', 'cyber security studies', 'center for cyber security'
      ],
      type: 'EXPERIENCE'
    },
    
    // Project entities
    PROJECTS: {
      patterns: [
        'project', 'portfolio', 'work', 'built', 'created', 'developed',
        'network vulnerability', 'image generator', 'techaid chatbot'
      ],
      type: 'PROJECT'
    },
    
    // Contact entities
    CONTACT: {
      patterns: [
        'contact', 'email', 'phone', 'number', 'reach', 'linkedin', 'github',
        'pikelelalikho@gmail.com', '+27 79 126 8223'
      ],
      type: 'CONTACT'
    },
    
    // AI entities
    AI_CONCEPTS: {
      patterns: [
        'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
        'neural network', 'algorithm', 'chatbot', 'automation'
      ],
      type: 'AI_CONCEPT'
    },
    
    // Cybersecurity entities
    CYBERSECURITY: {
      patterns: [
        'cybersecurity', 'cyber security', 'security', 'hacking', 'threat',
        'vulnerability', 'malware', 'firewall', 'encryption'
      ],
      type: 'CYBERSECURITY'
    },
    
    // Location entities
    LOCATION: {
      patterns: [
        'location', 'address', 'where', 'live', 'stay', 'kwa-thema',
        'springs', 'radebe', '21422'
      ],
      type: 'LOCATION'
    },
    
    // Intent entities
    GREETING: {
      patterns: ['hi', 'hello', 'hey', 'greetings', 'howdy', 'good morning', 'good afternoon'],
      type: 'GREETING'
    },
    
    QUESTION_WORDS: {
      patterns: ['what', 'how', 'where', 'when', 'why', 'who', 'which', 'can', 'does', 'is'],
      type: 'QUESTION'
    },
    
    REQUEST_ACTIONS: {
      patterns: ['tell', 'show', 'explain', 'describe', 'list', 'give', 'provide'],
      type: 'REQUEST'
    }
  };
  
  // Entity extraction function
  function extractEntities(input) {
    const foundEntities = [];
    const normalizedInput = input.toLowerCase();
    
    for (const [entityName, entityData] of Object.entries(entities)) {
      for (const pattern of entityData.patterns) {
        if (normalizedInput.includes(pattern.toLowerCase())) {
          foundEntities.push({
            entity: entityName,
            type: entityData.type,
            value: pattern,
            confidence: calculateConfidence(pattern, normalizedInput)
          });
        }
      }
    }
    
    // Sort by confidence (highest first)
    return foundEntities.sort((a, b) => b.confidence - a.confidence);
  }
  
  // Calculate confidence score for entity matches
  function calculateConfidence(pattern, input) {
    const patternWords = pattern.toLowerCase().split(' ');
    const inputWords = input.toLowerCase().split(' ');
    
    let matchCount = 0;
    patternWords.forEach(word => {
      if (inputWords.includes(word)) {
        matchCount++;
      }
    });
    
    return matchCount / patternWords.length;
  }
  
  // Intent classification based on entities and patterns
  function classifyIntent(input, entities) {
    const normalizedInput = input.toLowerCase();
    
    // Greeting intent
    if (entities.some(e => e.type === 'GREETING')) {
      return 'GREETING';
    }
    
    // Information request intents
    if (entities.some(e => e.type === 'REQUEST') || entities.some(e => e.type === 'QUESTION')) {
      if (entities.some(e => e.type === 'TECHNICAL_SKILL' || e.type === 'SOFT_SKILL' || e.type === 'PROGRAMMING' || e.type === 'TOOL')) {
        return 'SKILLS_INQUIRY';
      }
      if (entities.some(e => e.type === 'EDUCATION')) {
        return 'EDUCATION_INQUIRY';
      }
      if (entities.some(e => e.type === 'EXPERIENCE')) {
        return 'EXPERIENCE_INQUIRY';
      }
      if (entities.some(e => e.type === 'PROJECT')) {
        return 'PROJECT_INQUIRY';
      }
      if (entities.some(e => e.type === 'CONTACT')) {
        return 'CONTACT_INQUIRY';
      }
      if (entities.some(e => e.type === 'LOCATION')) {
        return 'LOCATION_INQUIRY';
      }
      if (entities.some(e => e.type === 'AI_CONCEPT')) {
        return 'AI_INQUIRY';
      }
      if (entities.some(e => e.type === 'CYBERSECURITY')) {
        return 'CYBERSECURITY_INQUIRY';
      }
      if (entities.some(e => e.type === 'PERSON')) {
        return 'ABOUT_INQUIRY';
      }
    }
    
    // Specific pattern matching for complex intents
    if (containsAny(normalizedInput, ['current', 'now', 'present', 'currently doing'])) {
      return 'CURRENT_STATUS_INQUIRY';
    }
    
    if (containsAny(normalizedInput, ['strength', 'good at', 'best at', 'excel'])) {
      return 'STRENGTHS_INQUIRY';
    }
    
    if (containsAny(normalizedInput, ['reference', 'recommend', 'testimonial'])) {
      return 'REFERENCE_INQUIRY';
    }
    
    return 'GENERAL_INQUIRY';
  }
  
  // Chatbot knowledge base (keeping your existing structure)
  const knowledgeBase = {
    name: "Likho Pikelela",
    fullName: "Likho Pikelela",
    title: "Cybersecurity Enthusiast",
    location: "21422 Radebe St, Kwa-Thema, Springs, 1575",
    contact: {
      email: "pikelelalikho@gmail.com",
      phone: "+27 79 126 8223",
      linkedin: "linkedin.com/in/likho-pikelela-700495200",
      github: "github.com/pikelelalikho"
    },
    about: "Likho is a passionate cybersecurity enthusiast with a strong interest in digital forensics and incident response. My journey in the field of cybersecurity began with a desire to understand the intricacies of technology and how to protect it from potential threats. I have a solid foundation in cybersecurity principles and practices, having completed various courses and certifications. My hands-on experience includes working on real-world projects, where I applied my knowledge to identify vulnerabilities and implement effective security measures.",
    skills: {
      technical: [
        "Digital Forensics",
        "Incident Response",
        "Network Security",
        "Vulnerability Assessment",
        "Malware Analysis",
        "Security Information and Event Management (SIEM)",
        "Penetration Testing",
        "Risk Assessment",
        "Security Awareness Training"
      ],
      soft: [
        "Effective Communication",
        "Teamwork and Collaboration",
        "Problem-Solving",
        "Critical Thinking",
        "Adaptability",
        "Attention to Detail",
        "Time Management",
        "Continuous Learning",
        "Leadership"
      ],
      tools: [
        "Wireshark",
        "Metasploit",
        "Burp Suite",
        "Splunk",
        "Nikto",
        "Nmap",
        "John the Ripper",
        "Wazuh",
        "inSSIDer",
        "OWASP ZAP"
      ],
      programming: [
        "Python",
        "JavaScript",
        "HTML",
        "CSS"
      ]
    },
    certifications: [
      "Cybersecurity Fundamentals",
      "Cybersecurity Defensive Tools Toolkit",
      "Internship Certificate",
      "Appreciation certificates"
    ],
    projects: [
      {
        title: "Network Vulnerability Assessment Tool",
        description: "Built a Python tool to scan and report vulnerabilities in local networks."
      },
      {
        title: "Image Generator",
        description: "Generates images based on your description using Python."
      },
      {
        title: "TechAid Chatbot",
        description: "Built a chatbot using Dialogflow with TechAID team members that answers basic AI concepts."
      }
    ],
    education: [
      {
        level: "High School",
        institution: "Bloekombos Secondary School",
        year: "2020"
      },
      {
        level: "Electrical Engineering N1",
        year: "2022"
      },
      {
        level: "Cybersecurity",
        courses: ["Cybersecurity Fundamentals", "Cybersecurity Toolbox"],
        institution: "Digital Regenesys",
        year: "2023"
      },
      {
        level: "Grade EDC (PSIRA)",
        year: "2025"
      }
    ],
    experience: [
      {
        title: "Internship",
        company: "Center for Cyber Security Studies & Research",
        period: "December 2023 - March 2024",
        description: "I actively participated in Cyber Threats, assisted policy development, conducted Vulnerability Assessment, Analyzed network Traffic in incident response and more."
      },
      {
        title: "CAPACITI Demand Academy",
        position: "My Capaciti Demand Academy 2|| CPT_Apr2025",
        description: "Focusing on Effective Communication Development, Teamwork and Collaboration, Problem-Solving and Critical Thinking. This bootcamp is designed for AI learning with hands-on projects and collaboration."
      }
    ],
    languages: ["English", "IsiXhosa", "Other"],
    testimonials: [
      {
        quote: "Likho is a dedicated cybersecurity professional with a keen eye for detail and a passion for learning.",
        author: "Mentor, Digital Regenesys"
      }
    ],
    references: [
      {
        name: "Mr. Mpumza",
        title: "Mentor",
        email: "Mpumzal.elci@gmail.com",
        phone: "083 845 7128"
      },
      {
        name: "Paris Ngoveni",
        title: "Instructor at Super Training Academy",
        phone: "071 822 5138"
      }
    ],
    personalDetails: {
      id: "0110055478082",
      gender: "Male",
      passport: "Available",
      driversLicense: "None"
    },
    aiKnowledge: {
      fundamentals: {
        definition: "Artificial Intelligence (AI) is the simulation of human intelligence in machines that are programmed to think and learn like humans. It encompasses various technologies that enable machines to perform tasks that typically require human intelligence.",
        types: [
          "Narrow AI (Weak AI): AI designed for specific tasks like voice recognition or image classification",
          "General AI (Strong AI): Hypothetical AI with human-level intelligence across all domains",
          "Artificial Superintelligence (ASI): AI that surpasses human intelligence in all aspects"
        ],
        keyComponents: [
          "Machine Learning: Algorithms that learn from data",
          "Natural Language Processing: Understanding and generating human language",
          "Computer Vision: Interpreting visual information",
          "Robotics: Physical interaction with the environment",
          "Expert Systems: Knowledge-based decision making"
        ]
      },
      machineLearning: {
        definition: "Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed for every task.",
        types: [
          "Supervised Learning: Learning with labeled data (e.g., classification, regression)",
          "Unsupervised Learning: Finding patterns in unlabeled data (e.g., clustering, dimensionality reduction)",
          "Reinforcement Learning: Learning through interaction and rewards (e.g., game playing, robotics)",
          "Semi-supervised Learning: Combining labeled and unlabeled data",
          "Deep Learning: Neural networks with multiple layers"
        ],
        algorithms: [
          "Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest",
          "Support Vector Machines", "K-Means Clustering", "Neural Networks",
          "Convolutional Neural Networks (CNNs)", "Recurrent Neural Networks (RNNs)",
          "Transformer Models"
        ]
      },
      deepLearning: {
        definition: "Deep Learning is a subset of machine learning that uses neural networks with many layers (deep networks) to learn from large amounts of data. It is particularly effective for tasks like image and speech recognition.",
        types: [
          "Convolutional Neural Networks (CNNs): Used for image processing and computer vision tasks",
          "Recurrent Neural Networks (RNNs): Used for sequential data like time series and natural language processing",
          "Generative Adversarial Networks (GANs): Used for generating new data samples"
        ],
        applications: [
          "Image Recognition: Identifying objects in images",
          "Natural Language Processing: Understanding and generating human language",
          "Speech Recognition: Converting spoken language into text",
          "Autonomous Vehicles: Enabling self-driving cars to perceive their environment"
        ]
      },
      applications: {
        cybersecurity: [
          "Threat Detection: Identifying malicious activities and anomalies",
          "Behavioral Analysis: Monitoring user behavior for security threats",
          "Automated Incident Response: Quick response to security incidents",
          "Fraud Detection: Identifying fraudulent transactions and activities",
          "Vulnerability Assessment: Automated scanning and assessment",
          "Malware Analysis: Classifying and analyzing malicious software",
          "Network Security: Monitoring and protecting network traffic",
          "Authentication: Biometric and behavioral authentication systems"
        ],
        general: [
          "Healthcare: Medical diagnosis, drug discovery, personalized treatment",
          "Finance: Algorithmic trading, risk assessment, fraud detection",
          "Transportation: Autonomous vehicles, traffic optimization",
          "Entertainment: Content recommendation, game AI, content creation",
          "Education: Personalized learning, intelligent tutoring systems",
          "Retail: Product recommendations, inventory management, customer service",
          "Manufacturing: Quality control, predictive maintenance, supply chain optimization",
          "Agriculture: Crop monitoring, yield prediction, precision farming"
        ]
      },
      tools: [
        "Programming Languages: Python, R, Java, JavaScript",
        "ML Libraries: TensorFlow, PyTorch, Scikit-learn, Keras",
        "Data Analysis: Pandas, NumPy, Matplotlib, Seaborn",
        "Cloud Platforms: AWS AI/ML, Google Cloud AI, Microsoft Azure AI",
        "Development Tools: Jupyter Notebooks, Google Colab, VS Code",
        "Databases: MongoDB, PostgreSQL, MySQL for data storage"
      ],
      ethics: [
        "Bias and Fairness: Ensuring AI systems don't discriminate",
        "Privacy: Protecting personal data used in AI systems",
        "Transparency: Making AI decisions explainable and understandable",
        "Accountability: Determining responsibility for AI decisions",
        "Safety: Ensuring AI systems are safe and reliable",
        "Job Displacement: Addressing the impact of AI on employment"
      ],
      trends: [
        "Large Language Models (LLMs): GPT, BERT, and similar models",
        "Generative AI: Creating new content like text, images, and code",
        "Edge AI: Running AI models on local devices",
        "AI in Cybersecurity: Advanced threat detection and response",
        "Explainable AI: Making AI decisions more transparent",
        "AI Governance: Developing policies and regulations for AI use"
      ]
    },
    followUpQuestions: [
      "Would you like to know more about how AI is applied in cybersecurity?",
      "Are you interested in learning about machine learning algorithms?",
      "Would you like to hear about Likho's AI projects at CAPACITI?",
      "Do you want to know about AI tools and technologies?",
      "Are you curious about AI ethics and responsible AI development?",
      "Would you like to learn about different types of AI?",
      "Do you want to know how AI can enhance cybersecurity practices?",
      "Are you interested in AI career opportunities?",
      "Would you like to know about AI trends and future developments?",
      "Do you want to learn about getting started with AI and machine learning?"
    ]
  };
  
  // Function to handle user input with entity recognition
  function handleUserInput() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return;
    
    // Add user message to chat
    addUserMessage(userInput);
    document.getElementById('user-input').value = '';
    
    // Process the input and generate response
    setTimeout(() => {
      const response = generateResponseWithEntities(userInput);
      addBotMessage(response);
    }, 500);
  }
  
  // Enhanced response generation with entity recognition
  function generateResponseWithEntities(input) {
    const extractedEntities = extractEntities(input);
    const intent = classifyIntent(input, extractedEntities);
    
    console.log('Extracted entities:', extractedEntities); // For debugging
    console.log('Classified intent:', intent); // For debugging
    
    // Generate response based on intent and entities
    switch (intent) {
      case 'GREETING':
        return `Hello! I'm Likho's portfolio assistant. I can help you learn about Likho's skills, experience, education, projects, and AI knowledge. What would you like to know?`;
      
      case 'SKILLS_INQUIRY':
        return handleSkillsInquiry(input, extractedEntities);
      
      case 'EDUCATION_INQUIRY':
        return handleEducationInquiry(input, extractedEntities);
      
      case 'EXPERIENCE_INQUIRY':
        return handleExperienceInquiry(input, extractedEntities);
      
      case 'PROJECT_INQUIRY':
        return handleProjectInquiry(input, extractedEntities);
      
      case 'CONTACT_INQUIRY':
        return handleContactInquiry(input, extractedEntities);
      
      case 'LOCATION_INQUIRY':
        return `Likho is located at: ${knowledgeBase.location}.`;
      
      case 'AI_INQUIRY':
        return handleAIInquiry(input, extractedEntities);
      
      case 'CYBERSECURITY_INQUIRY':
        return handleCybersecurityInquiry(input, extractedEntities);
      
      case 'ABOUT_INQUIRY':
        return knowledgeBase.about;
      
      case 'CURRENT_STATUS_INQUIRY':
        const current = knowledgeBase.experience[1];
        return `Likho is currently at ${current.title} as ${current.position}. ${current.description}`;
      
      case 'STRENGTHS_INQUIRY':
        return `Likho's key strengths include:
• Strong interpersonal and communication skills
• Technical skills in cybersecurity, particularly in digital forensics and incident response
• Problem-solving and critical thinking abilities
• Attention to detail and strong organizational skills`;
      
      case 'REFERENCE_INQUIRY':
        return handleReferenceInquiry(input, extractedEntities);
      
      default:
        return generateFallbackResponse(input, extractedEntities);
    }
  }
  
  // Specialized handlers for different inquiry types
  function handleSkillsInquiry(input, entities) {
    const technicalSkills = entities.filter(e => e.type === 'TECHNICAL_SKILL');
    const softSkills = entities.filter(e => e.type === 'SOFT_SKILL');
    const programming = entities.filter(e => e.type === 'PROGRAMMING');
    const tools = entities.filter(e => e.type === 'TOOL');
    
    if (technicalSkills.length > 0) {
      return `Likho's technical skills include: ${knowledgeBase.skills.technical.join(', ')}.`;
    } else if (softSkills.length > 0) {
      return `Likho's soft skills include: ${knowledgeBase.skills.soft.join(', ')}.`;
    } else if (programming.length > 0) {
      return `Likho is familiar with these programming languages: ${knowledgeBase.skills.programming.join(', ')}.`;
    } else if (tools.length > 0) {
      return `Likho is proficient with the following tools and technologies: ${knowledgeBase.skills.tools.join(', ')}.`;
    } else {
      return `Likho has a wide range of skills including technical skills like ${knowledgeBase.skills.technical.slice(0, 3).join(', ')}, soft skills like ${knowledgeBase.skills.soft.slice(0, 3).join(', ')}, and is proficient with tools such as ${knowledgeBase.skills.tools.slice(0, 3).join(', ')}. Likho can also program in ${knowledgeBase.skills.programming.join(', ')}. Would you like more specific information about any of these skill areas?`;
    }
  }
  
  function handleEducationInquiry(input, entities) {
    return `Likho's educational background includes:
• High School education at Bloekombos Secondary School (graduated 2020)
• Electrical Engineering N1 (2022)
• Cybersecurity studies at Digital Regenesys, including Cybersecurity Fundamentals and Cybersecurity Toolbox (2023)
• Grade EDC (PSIRA) (2025)`;
  }
  
  function handleExperienceInquiry(input, entities) {
    let response = "Likho's professional experience includes:\n";
    knowledgeBase.experience.forEach(exp => {
      response += `• ${exp.title}${exp.company ? ` at ${exp.company}` : ''}${exp.period ? ` (${exp.period})` : ''}: ${exp.description}\n`;
    });
    return response;
  }
  
  function handleProjectInquiry(input, entities) {
    let response = "Likho has worked on several projects including:\n";
    knowledgeBase.projects.forEach(project => {
      response += `• ${project.title}: ${project.description}\n`;
    });
    return response;
  }
  
  function handleContactInquiry(input, entities) {
    return `You can contact Likho via:
• Email: ${knowledgeBase.contact.email}
• Phone: ${knowledgeBase.contact.phone}
• LinkedIn: ${knowledgeBase.contact.linkedin}
• GitHub: ${knowledgeBase.contact.github}`;
  }
  
 // Complete the handleAIInquiry function and add missing parts
function handleAIInquiry(input, entities) {
  const normalizedInput = input.toLowerCase();
  
  if (containsAny(normalizedInput, ['what is ai', 'define ai', 'artificial intelligence definition'])) {
    return addFollowUpQuestions(knowledgeBase.aiKnowledge.fundamentals.definition);
  } else if (containsAny(normalizedInput, ['types of ai', 'tyes of artificial intelligence', 'ai types', 'kinds of ai'])) {
    return addFollowUpQuestions(`There are several types of AI:\n${knowledgeBase.aiKnowledge.fundamentals.types.join('\n')}`);
  } else if (containsAny(normalizedInput, ['machine learning', 'ml', 'what is ml', 'what is machine learning', 'ml definition'])) {
    return addFollowUpQuestions(`${knowledgeBase.aiKnowledge.machineLearning.definition}\n\nTypes of Machine Learning:\n${knowledgeBase.aiKnowledge.machineLearning.types.join('\n')}`);
  } else if (containsAny(normalizedInput, ['deep learning', 'what is deep learning', 'neural networks'])) {
    return addFollowUpQuestions(`${knowledgeBase.aiKnowledge.deepLearning.definition}\n\nTypes of Deep Learning:\n${knowledgeBase.aiKnowledge.deepLearning.types.join('\n')}`);
  } else if (containsAny(normalizedInput, ['ai applications', 'ai uses', 'what can ai do'])) {
    return addFollowUpQuestions(`AI has many applications including:\n${knowledgeBase.aiKnowledge.applications.general.join('\n')}`);
  } else if (containsAny(normalizedInput, ['ai cybersecurity', 'ai security', 'cybersecurity ai'])) {
    return addFollowUpQuestions(`AI in cybersecurity includes:\n${knowledgeBase.aiKnowledge.applications.cybersecurity.join('\n')}`);
  } else if (containsAny(normalizedInput, ['ai tools', 'ai technologies', 'ai software'])) {
    return addFollowUpQuestions(`Common AI tools and technologies:\n${knowledgeBase.aiKnowledge.tools.join('\n')}`);
  } else if (containsAny(normalizedInput, ['ai ethics', 'ai bias', 'responsible ai'])) {
    return addFollowUpQuestions(`Important AI ethics considerations:\n${knowledgeBase.aiKnowledge.ethics.join('\n')}`);
  } else if (containsAny(normalizedInput, ['ai trends', 'future ai', 'latest ai'])) {
    return addFollowUpQuestions(`Current AI trends include:\n${knowledgeBase.aiKnowledge.trends.join('\n')}`);
  } else {
    return addFollowUpQuestions(`I can help you learn about AI! Here are the key areas I can explain:\n• AI Fundamentals and definitions\n• Machine Learning and Deep Learning\n• AI applications in various fields\n• AI in cybersecurity\n• AI tools and technologies\n• AI ethics and responsible development\n• Current AI trends\n\nWhat specific aspect of AI would you like to know more about?`);
  }
}

function handleCybersecurityInquiry(input, entities) {
  const normalizedInput = input.toLowerCase();
  
  if (containsAny(normalizedInput, ['tell me about digital forensics', 'what is digital forensics','Define digital forensics'])) {
    return `Likho has expertise in Digital Forensics, which involves investigating and analyzing digital devices and data to uncover evidence of cyber incidents. This includes examining computer systems, networks, and storage media to identify security breaches and gather digital evidence.`;
  } else if (containsAny(normalizedInput, ['incident response'])) {
    return `Likho specializes in Incident Response, which is the systematic approach to managing and addressing security breaches or cyberattacks. This involves identifying, containing, eradicating, and recovering from security incidents while minimizing their impact.`;
  } else if (containsAny(normalizedInput, ['vulnerability assessment', 'vulnerabilities'])) {
    return `Likho is skilled in Vulnerability Assessment, which involves systematically identifying, quantifying, and prioritizing security weaknesses in computer systems, networks, and applications. This helps organizations understand their security posture and take corrective actions.`;
  } else if (containsAny(normalizedInput, ['penetration testing', 'pen testing'])) {
    return `Likho has experience in Penetration Testing, which is a simulated cyberattack against computer systems to check for exploitable vulnerabilities. This ethical hacking approach helps organizations identify security gaps before malicious actors can exploit them.`;
  } else if (containsAny(normalizedInput, ['network security'])) {
    return `Likho is proficient in Network Security, which involves protecting computer networks from intrusions, attacks, and unauthorized access. This includes implementing firewalls, monitoring network traffic, and securing network infrastructure.`;
  } else {
    return `Likho has comprehensive cybersecurity expertise including: ${knowledgeBase.skills.technical.join(', ')}. He also uses various cybersecurity tools like ${knowledgeBase.skills.tools.join(', ')}. Would you like to know more about any specific cybersecurity area?`;
  }
}

function handleReferenceInquiry(input, entities) {
  let response = "Likho's references include:\n";
  knowledgeBase.references.forEach(ref => {
    response += `• ${ref.name} - ${ref.title}\n`;
    if (ref.email) response += `  Email: ${ref.email}\n`;
    if (ref.phone) response += `  Phone: ${ref.phone}\n`;
  });
  
  if (knowledgeBase.testimonials.length > 0) {
    response += "\nTestimonial:\n";
    knowledgeBase.testimonials.forEach(testimonial => {
      response += `"${testimonial.quote}" - ${testimonial.author}\n`;
    });
  }
  
  return response;
}

function generateFallbackResponse(input, entities) {
  const normalizedInput = input.toLowerCase();
  
  // Check for specific keywords and provide relevant responses
  if (containsAny(normalizedInput, ['thank', 'thanks', 'appreciate'])) {
    return "You're welcome! Is there anything else you'd like to know about Likho?";
  } else if (containsAny(normalizedInput, ['bye', 'goodbye', 'see you'])) {
    return "Goodbye! Feel free to come back if you have more questions about Likho's portfolio.";
  } else if (containsAny(normalizedInput, ['help', 'what can you do'])) {
    return `I can help you learn about Likho in several areas:
• Skills (technical, soft skills, programming languages, tools)
• Education and certifications
• Work experience and internships
• Projects and portfolio work
• Contact information
• AI and cybersecurity knowledge
• Current activities and status

What would you like to know more about?`;
  } else {
    // Use entity information to provide relevant suggestions
    if (entities.length > 0) {
      const topEntity = entities[0];
      switch (topEntity.type) {
        case 'PERSON':
          return knowledgeBase.about;
        case 'TECHNICAL_SKILL':
        case 'SOFT_SKILL':
        case 'PROGRAMMING':
        case 'TOOL':
          return handleSkillsInquiry(input, entities);
        default:
          return `I understand you're asking about ${topEntity.value}. Could you be more specific? I can help you learn about Likho's skills, experience, education, projects, or AI knowledge.`;
      }
    } else {
      return "I'm not sure I understand. I can help you learn about Likho's skills, experience, education, projects, contact information, or AI knowledge. What would you like to know?";
    }
  }
}

// Helper function to add follow-up questions to AI responses
function addFollowUpQuestions(response) {
  const randomQuestions = knowledgeBase.followUpQuestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  
  return `${response}\n\n${randomQuestions.join('\n')}`;
}

// Helper function to check if input contains any of the given patterns
function containsAny(input, patterns) {
  return patterns.some(pattern => input.includes(pattern.toLowerCase()));
}

// Event listeners for user input
document.getElementById('send-btn').addEventListener('click', handleUserInput);
document.getElementById('user-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    handleUserInput();
  }
});

// CSS styles for the chatbot (add this to your HTML head or CSS file)
const styles = `
  <style>
    .chatbot-container {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      height: 500px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 5px 25px rgba(0,0,0,0.15);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      transform: translateY(100%);
      opacity: 0;
      transition: all 0.3s ease;
    }

    .chatbot-container.open {
      transform: translateY(0);
      opacity: 1;
    }

    .chatbot-header {
      background: #007bff;
      color: white;
      padding: 15px;
      border-radius: 10px 10px 0 0;
      display: flex;
      align-items: center;
    }

    .chatbot-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .chatbot-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .chatbot-title h3 {
      margin: 0;
      font-size: 1.1em;
    }

    .chatbot-body {
      flex: 1;
      overflow: hidden;
    }

    .chatbot-messages {
      height: 100%;
      overflow-y: auto;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .message {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }

    .user-message {
      justify-content: flex-end;
    }

    .user-message .message-content {
      background: #007bff;
      color: white;
      padding: 10px 15px;
      border-radius: 15px 15px 5px 15px;
      max-width: 80%;
    }

    .bot-message .message-avatar img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    }

    .bot-message .message-content {
      background: #f1f1f1;
      padding: 10px 15px;
      border-radius: 15px 15px 15px 5px;
      max-width: 80%;
      white-space: pre-line;
    }

    .chatbot-input {
      padding: 15px;
      border-top: 1px solid #eee;
      display: flex;
      gap: 10px;
    }

    .chatbot-input input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 20px;
      outline: none;
    }

    .chatbot-input button {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
    }

    .chatbot-input button:hover {
      background: #0056b3;
    }

    #chatbot-toggle-btn:hover {
      background: #0056b3;
      transform: scale(1.05);
    }

    #chatbot-popup-message {
      animation: fadeInUp 0.3s ease;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Scrollbar styling for chatbot messages */
    .chatbot-messages::-webkit-scrollbar {
      width: 5px;
    }

    .chatbot-messages::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    .chatbot-messages::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 5px;
    }

    .chatbot-messages::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
  </style>
`;

// Inject styles into the document head
document.head.insertAdjacentHTML('beforeend', styles);

}); // End of DOMContentLoaded event listener