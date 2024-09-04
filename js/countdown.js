document.addEventListener('DOMContentLoaded', () => {
    let targetDate = localStorage.getItem('targetDate');

    if (!targetDate) {
        // Calculate the target date which is 365 days from now
        const now = new Date();
        targetDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();
        localStorage.setItem('targetDate', targetDate);
    }

    const targetDateTime = new Date(targetDate).getTime();

    const daysElem = document.querySelector('#days span:first-child');
    const hoursElem = document.querySelector('#hours span:first-child');
    const minutesElem = document.querySelector('#minutes span:first-child');
    const secondsElem = document.querySelector('#seconds span:first-child');
    
    function updateCountdown() {
        const currentTime = new Date().getTime();
        const distance = targetDateTime - currentTime;
        
        if (distance < 0) {
            // Time has expired
            daysElem.textContent = '00';
            hoursElem.textContent = '00';
            minutesElem.textContent = '00';
            secondsElem.textContent = '00';
            return;
        }
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the DOM elements with leading zeros
        daysElem.textContent = String(days).padStart(2, '0');
        hoursElem.textContent = String(hours).padStart(2, '0');
        minutesElem.textContent = String(minutes).padStart(2, '0');
        secondsElem.textContent = String(seconds).padStart(2, '0');
    }
    
    // Initial call to set the countdown immediately
    updateCountdown();
    
    // Update the countdown every 1 second
    setInterval(updateCountdown, 1000);
});

