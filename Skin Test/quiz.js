document.getElementById('quizForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get selected values from the form
    const skinType = document.getElementById('skin-type').value;
    const shine = document.getElementById('shine').value;
    const acneFrequency = document.getElementById('acne-frequency').value;
    const hydration = document.getElementById('hydration').value;

    // Initialize scores for each skin type
    let scores = {
        dry: 0,
        normal: 0,
        oily: 0,
        combination: 0
    };

    // Logic to determine the skin type based on responses
    if (skinType === "dry") {
        scores.dry += 2;
    } else if (skinType === "normal") {
        scores.normal += 2;
    } else if (skinType === "oily") {
        scores.oily += 2;
    }

    if (shine === "oily") {
        scores.oily += 2;
    } else if (shine === "normal") {
        scores.normal += 2;
    } else if (shine === "dry") {
        scores.dry += 2;
    }

    if (acneFrequency === "frequently") {
        scores.oily += 2;
    } else if (acneFrequency === "occasionally") {
        scores.combination += 2;
    } else if (acneFrequency === "rarely") {
        scores.dry += 2;
    }

    if (hydration === "hydrated") {
        scores.normal += 2;
    } else if (hydration === "neutral") {
        scores.combination += 2;
    } else if (hydration === "dry") {
        scores.dry += 2;
    }

    // Determine the skin type based on the highest score
    let maxScore = Math.max(scores.dry, scores.normal, scores.oily, scores.combination);
    let skinResult = '';

    if (maxScore === scores.oily) {
        skinResult = 'Oily';
    } else if (maxScore === scores.dry) {
        skinResult = 'Dry';
    } else if (maxScore === scores.combination) {
        skinResult = 'Combination';
    } else if (maxScore === scores.normal) {
        skinResult = 'Normal';
    }

    // Display the result
    document.getElementById('skin-result').textContent = skinResult;
    document.querySelector('.result').style.display = 'block';
});
