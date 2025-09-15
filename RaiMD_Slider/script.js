document.addEventListener('DOMContentLoaded', () => {
    let slides = [];
    let currentSlide = 0;
    let currentScroll = 0;
    let hasImage = false;
    let imageAsWatermark = false;

    const presentationContainer = document.getElementById('presentation-container');
    const slideBackground = document.getElementById('slide-background');
    const slideContent = document.getElementById('slide-content');

    // This is a universal fix for the Marked.js + MathJax conflict.
    // It extracts math before markdown parsing and re-injects it afterward.
    
    // 1. Fetch and Parse Markdown
    async function loadMarkdown() {
        console.log('Attempting to load markdown file from path:', config.markdownFile);
        try {
            const response = await fetch(config.markdownFile);
            console.log('Response received. Status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const mdText = await response.text();
            console.log('Markdown file successfully fetched and read.');
            
            // Extract math formulas before parsing with Marked.js
            const mathFormulas = [];
            let mathPlaceholderIndex = 0;
            const processedText = mdText.replace(/(\$\$[^$]+?\$\$|\$[^$]+?\$) /g, (match) => {
                mathFormulas.push(match.trim());
                return `_MATH_PLACEHOLDER_${mathPlaceholderIndex++}_ `;
            });

            // Split and store slides
            const sections = processedText.split(/(\n---\n|^#\s|^##\s|^###\s)/m).filter(Boolean);
            let currentSection = '';
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                if (section.match(/^---\s*$/) || section.match(/^#\s/) || section.match(/^##\s/) || section.match(/^###\s/)) {
                    if (currentSection) {
                        slides.push(currentSection.trim());
                    }
                    if (section.trim() !== '---') {
                         currentSection = section + (sections[i + 1] || '');
                         i++;
                    } else {
                         currentSection = '';
                    }
                } else {
                    currentSection += section;
                }
            }
            if (currentSection) {
                slides.push(currentSection.trim());
            }

            // Re-inject formulas back into each slide
            for (let i = 0; i < slides.length; i++) {
                let slideContent = slides[i];
                for (let j = 0; j < mathFormulas.length; j++) {
                    const placeholder = `_MATH_PLACEHOLDER_${j}_`;
                    slideContent = slideContent.replace(placeholder, mathFormulas[j]);
                }
                slides[i] = slideContent;
            }

            renderSlide(currentSlide);
        } catch (error) {
            console.error('Error fetching or processing markdown file:', error);
            slideContent.innerHTML = '<h2>Error loading presentation. Please check file path.</h2>';
        }
    }

    // 2. Render Slide Content
    function renderSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
            currentScroll = 0;
            const slideHtml = marked.parse(slides[index]);
            slideContent.innerHTML = slideHtml;
            slideContent.scrollTop = 0;
            
            // Apply base styles from config.js
            document.documentElement.style.setProperty('--base-font-size', config.baseFontSize);
            document.documentElement.style.setProperty('--h1-color', config.h1Color);
            document.documentElement.style.setProperty('--h2-color', config.h2Color);
            document.documentElement.style.setProperty('--text-color', config.textColor);
            document.documentElement.style.setProperty('--background-color', config.backgroundColor);
            document.documentElement.style.setProperty('--transition-duration', config.transitionDuration);
            
            // Handle Images
            const firstImage = slideContent.querySelector('img');

            if (firstImage) {
                hasImage = true;
                imageAsWatermark = false;
                slideBackground.style.backgroundImage = `url('${firstImage.src}')`;
                slideBackground.style.backgroundSize = 'contain';
                slideBackground.style.opacity = 1;
                firstImage.style.display = 'none'; // Hide the original image
                slideContent.style.opacity = 0; // Hide text initially
            } else {
                hasImage = false;
                imageAsWatermark = false;
                if (config.globalWatermark) {
                    slideBackground.style.backgroundImage = `url('${config.globalWatermark}')`;
                    slideBackground.style.backgroundSize = 'cover';
                    slideBackground.style.opacity = (index === 0) ? 1 : 0.2; // Full brightness for title screen
                } else {
                    slideBackground.style.backgroundImage = 'none';
                    slideBackground.style.opacity = 0;
                }
                slideContent.style.opacity = 1;
            }

            // Re-render math
            if (window.MathJax) {
                MathJax.typesetPromise();
            }
        }
    }

    // 3. Navigation and Continuous Content
    function navigate(direction) {
        if (direction === 'next') {
            if (hasImage && !imageAsWatermark) {
                imageAsWatermark = true;
                slideBackground.style.backgroundSize = 'cover';
                slideBackground.style.opacity = 0.2;
                slideContent.style.opacity = 1;
            } else {
                const isContinuous = slideContent.scrollHeight > slideContent.clientHeight;
                if (isContinuous && slideContent.scrollTop < slideContent.scrollHeight - slideContent.clientHeight) {
                    const lineHeight = parseFloat(getComputedStyle(slideContent).lineHeight) || 24;
                    const scrollAmount = slideContent.clientHeight - lineHeight;
                    currentScroll = Math.min(currentScroll + scrollAmount, slideContent.scrollHeight - slideContent.clientHeight);
                    slideContent.scrollTop = currentScroll;
                    
                    const baseColor = config.backgroundColor;
                    const darkerColor = darkenColor(baseColor, 30);
                    presentationContainer.style.backgroundColor = darkerColor;
                } else {
                    presentationContainer.style.backgroundColor = config.backgroundColor;
                    renderSlide(currentSlide + 1);
                }
            }
        } else if (direction === 'prev') {
            if (currentScroll > 0) {
                const lineHeight = parseFloat(getComputedStyle(slideContent).lineHeight) || 24;
                const scrollAmount = slideContent.clientHeight - lineHeight;
                currentScroll = Math.max(0, currentScroll - scrollAmount);
                slideContent.scrollTop = currentScroll;
                presentationContainer.style.backgroundColor = config.backgroundColor;
            } else {
                renderSlide(currentSlide - 1);
            }
        }
    }

    // 4. Keyboard Navigation Listeners
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'ArrowRight' || key === ' ' || key === 'PageDown') {
            e.preventDefault();
            navigate('next');
        } else if (key === 'ArrowLeft' || key === 'PageUp') {
            e.preventDefault();
            navigate('prev');
        }
    });

    // 5. Helper Function to Darken Color
    function darkenColor(hex, percent) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);

        r = Math.max(0, Math.floor(r * (100 - percent) / 100));
        g = Math.max(0, Math.floor(g * (100 - percent) / 100));
        b = Math.max(0, Math.floor(b * (100 - percent) / 100));

        const toHex = (c) => c.toString(16).padStart(2, '0');
        return '#' + toHex(r) + toHex(g) + toHex(b);
    }
    
    // Initial load
    loadMarkdown();
});