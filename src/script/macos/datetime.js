// Update date and time in menu bar
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    };
    const formattedDate = now.toLocaleDateString('en-US', options).replaceAll(',', '');
    document.getElementById('datetime').textContent = formattedDate;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);
