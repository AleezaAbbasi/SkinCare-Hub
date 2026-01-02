document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const quizForm = document.getElementById('quizForm');
    const result = document.getElementById('result');
    const skinResult = document.getElementById('skin-result');
    const skinDescription = document.getElementById('skin-description');
    const questions = document.querySelectorAll('.question');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const progressBar = document.getElementById('progress');
    const startOverBtn = document.getElementById('start-over');
    const backToWebsiteBtn = document.getElementById('back-to-website');
    
    // Initialize current step
    let currentStep = 1;
    
    // Total number of questions
    const totalQuestions = questions.length;
    
    // Skin type descriptions
    const skinDescriptions = {
        'Oily': 'Your skin produces excess sebum, resulting in shine especially across the T-zone. Your pores may appear more visible, and you might experience frequent breakouts. For best results: Use gel or foam cleansers, oil-free and non-comedogenic products, incorporate salicylic acid treatments, apply lightweight oil-free moisturizers, and use oil-absorbing clay masks weekly. Blotting papers can help manage midday shine.',
        'Dry': 'Your skin lacks natural oils, leading to tightness, flakiness, and potential for fine lines to appear more prominent. You may experience occasional irritation and redness. For best results: Use cream or oil-based cleansers, incorporate hydrating serums with hyaluronic acid, apply rich moisturizers with ceramides and fatty acids, add facial oils at night, and use hydrating masks twice weekly. Avoid hot water and harsh ingredients.',
        'Combination': 'You have an oily T-zone (forehead, nose, chin) with normal to dry cheeks. This mixed condition requires balanced care targeting different facial areas. For best results: Use gentle, balanced pH cleansers, apply lightweight hydrating products all over, spot treat oily areas with targeted products, use different masks on different areas (clay for T-zone, hydrating for cheeks), and consider using different moisturizers for different facial zones.',
        'Normal': 'You have well-balanced skin with good circulation and few imperfections. Your pores are typically fine, and skin texture is smooth and even-toned. For best results: Maintain your balance with gentle cleansers, use hydrating serums with antioxidants, apply lightweight moisture protection, exfoliate weekly, and always use SPF protection. Focus on preventative care to maintain your skin\'s natural balance.',
        'Sensitive': 'Your skin reacts easily to products or environmental factors with redness, irritation, burning or itching. Your skin barrier may be compromised, making it more susceptible to external aggressors. For best results: Use fragrance-free, hypoallergenic products specifically formulated for sensitive skin, incorporate soothing ingredients like centella asiatica, allantoin or oat extract, avoid physical exfoliants and harsh active ingredients, patch test all new products, and maintain a consistent, simple skincare routine.'
    };

    // Handle next button clicks
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentQuestionElement = document.querySelector(`.question[data-step="${currentStep}"]`);
            const nextStep = parseInt(button.getAttribute('data-next'));
            
            // Check if the current question has been answered
            const inputs = currentQuestionElement.querySelectorAll('input[type="radio"]');
            let isAnswered = false;
            
            inputs.forEach(input => {
                if (input.checked) {
                    isAnswered = true;
                }
            });
            
            if (!isAnswered) {
                alert('Please select an option before proceeding');
                return;
            }
            
            // Update progress bar
            progressBar.style.width = `${(nextStep / totalQuestions) * 100}%`;
            
            // Hide current question and show next question
            currentQuestionElement.classList.remove('active');
            document.querySelector(`.question[data-step="${nextStep}"]`).classList.add('active');
            
            // Update current step
            currentStep = nextStep;
        });
    });
    
    // Handle previous button clicks
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevStep = parseInt(button.getAttribute('data-prev'));
            
            // Update progress bar
            progressBar.style.width = `${(prevStep / totalQuestions) * 100}%`;
            
            // Hide current question and show previous question
            document.querySelector(`.question[data-step="${currentStep}"]`).classList.remove('active');
            document.querySelector(`.question[data-step="${prevStep}"]`).classList.add('active');
            
            // Update current step
            currentStep = prevStep;
        });
    });
    
    // Handle form submission
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(quizForm);
        const cleansingEffect = formData.get('cleansingEffect');
        const tZone = formData.get('tZone');
        const skinConcerns = formData.get('skinConcerns');
        const moisturizerNeeds = formData.get('moisturizerNeeds');
        const sensitivity = formData.get('sensitivity');
        
        // Initialize scores for each skin type
        let scores = {
            dry: 0,
            normal: 0,
            oily: 0,
            combination: 0,
            sensitive: 0
        };
        
        // Logic to determine the skin type based on responses
        // Question 1: How does your skin feel after cleansing
        if (cleansingEffect === "dry") {
            scores.dry += 3;
            scores.sensitive += 1;
        } else if (cleansingEffect === "normal") {
            scores.normal += 3;
        } else if (cleansingEffect === "combination") {
            scores.combination += 3;
        } else if (cleansingEffect === "oily") {
            scores.oily += 3;
        }
        
        // Question 2: T-zone condition
        if (tZone === "very-oily") {
            scores.oily += 3;
            scores.combination += 1;
        } else if (tZone === "slightly-oily") {
            scores.combination += 2;
            scores.normal += 1;
        } else if (tZone === "normal") {
            scores.normal += 3;
        } else if (tZone === "dry") {
            scores.dry += 3;
        }
        
        // Question 3: Main skin concerns
        if (skinConcerns === "acne") {
            scores.oily += 3;
            scores.combination += 1;
        } else if (skinConcerns === "dryness") {
            scores.dry += 3;
            scores.sensitive += 1;
        } else if (skinConcerns === "combo") {
            scores.combination += 3;
        } else if (skinConcerns === "minimal") {
            scores.normal += 3;
        }
        
        // Question 4: Moisturizer needs
        if (moisturizerNeeds === "frequently") {
            scores.dry += 3;
            scores.sensitive += 1;
        } else if (moisturizerNeeds === "normal") {
            scores.normal += 3;
        } else if (moisturizerNeeds === "selective") {
            scores.combination += 3;
        } else if (moisturizerNeeds === "rarely") {
            scores.oily += 3;
        }
        
        // Question 5: Skin sensitivity
        if (sensitivity === "very-sensitive") {
            scores.sensitive += 3;
            scores.dry += 1;
        } else if (sensitivity === "somewhat-sensitive") {
            scores.sensitive += 2;
        } else if (sensitivity === "normal") {
            scores.normal += 1;
        } else if (sensitivity === "resilient") {
            scores.oily += 1;
        }
        
        // Determine the skin type based on the highest score
        let maxScore = Math.max(scores.dry, scores.normal, scores.oily, scores.combination, scores.sensitive);
        let skinTypeResult = '';
        
        if (maxScore === scores.oily) {
            skinTypeResult = 'Oily';
        } else if (maxScore === scores.dry) {
            skinTypeResult = 'Dry';
        } else if (maxScore === scores.combination) {
            skinTypeResult = 'Combination';
        } else if (maxScore === scores.normal) {
            skinTypeResult = 'Normal';
        } else if (maxScore === scores.sensitive) {
            skinTypeResult = 'Sensitive';
        }
        
        // Handle ties between skin types
        if (scores.sensitive >= maxScore - 2 && skinTypeResult !== 'Sensitive') {
            skinDescription.innerHTML = skinDescriptions[skinTypeResult] + '<br><br><strong>Note:</strong> Your skin also shows significant sensitivity characteristics. Consider using gentle products formulated for sensitive skin.'
        } else {
            skinDescription.textContent = skinDescriptions[skinTypeResult];
        }
        
        // Display the result
        skinResult.textContent = skinTypeResult;
        
        // Hide quiz form and show results
        quizForm.style.display = 'none';
        result.style.display = 'block';
        
        // Reset progress bar for visual completion
        progressBar.style.width = '100%';
    });
    
    // Handle start over button
    startOverBtn.addEventListener('click', function() {
        // Reset form
        quizForm.reset();
        
        // Reset to first question
        questions.forEach(question => {
            question.classList.remove('active');
        });
        questions[0].classList.add('active');
        currentStep = 1;
        
        // Reset progress bar
        progressBar.style.width = `${(1 / totalQuestions) * 100}%`;
        
        // Hide result and show form
        result.style.display = 'none';
        quizForm.style.display = 'block';
    });
    
    // Handle back to website button
    if (backToWebsiteBtn) {
        backToWebsiteBtn.addEventListener('click', function() {
            // Redirect to home page or main website
            window.location.href = 'index.html'; // Update this to point to your actual homepage
        });
    }
});