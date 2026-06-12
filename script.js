// ============================================
// BLOSSOM SPRINGS 100-DAY CHALLENGE TRACKER
// JavaScript Logic
// ============================================

const STORAGE_KEYS = {
    name: 'bs_user_name',
    goal: 'bs_user_goal',
    startDate: 'bs_start_date',
    completedDays: 'bs_completed_days',
    weeklyReflection: 'bs_weekly_reflection',
    themeMode: 'bs_theme_mode'
};

const MOTIVATIONAL_QUOTES = [
    "Small daily actions create extraordinary results.",
    "Progress, not perfection, is the goal.",
    "Every day is a chance to grow.",
    "You are stronger than you think.",
    "Consistency is the key to success.",
    "Your effort today shapes your tomorrow.",
    "Believe in the power of persistence.",
    "One day at a time, you're creating magic.",
    "You've got this! Keep going!",
    "Your future self will thank you.",
    "Growth happens outside your comfort zone.",
    "Every completion is a victory.",
    "You are capable of amazing things.",
    "Stay committed to your vision.",
    "The best time is now.",
    "You are worthy of your goals.",
    "Small steps lead to big changes.",
    "Your journey is unique and beautiful.",
    "Celebrate every progress, no matter how small.",
    "You are a work in progress, and that's okay."
];

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌸 Blossom Springs App Initialized');
    initializeTheme();
    loadUserData();
    generateTrackerGrid();
    updateDashboard();
    displayDailyQuote();
    setupEventListeners();
    setupPWAInstall();
});

// ===== Theme Management =====
function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.themeMode);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggle();
    }
}

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem(STORAGE_KEYS.themeMode, isDark ? 'dark' : 'light');
    updateThemeToggle();
});

function updateThemeToggle() {
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

// ===== Display Daily Quote =====
function displayDailyQuote() {
    const today = new Date().toDateString();
    const lastQuoteDate = localStorage.getItem('bs_last_quote_date');
    
    let todayQuote;
    
    if (lastQuoteDate === today) {
        todayQuote = localStorage.getItem('bs_today_quote');
    } else {
        const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
        todayQuote = MOTIVATIONAL_QUOTES[randomIndex];
        localStorage.setItem('bs_today_quote', todayQuote);
        localStorage.setItem('bs_last_quote_date', today);
    }
    
    const quoteElement = document.getElementById('dailyQuote');
    quoteElement.textContent = `✨ ${todayQuote} ✨`;
}

// ===== Generate 100-Day Tracker Grid =====
function generateTrackerGrid() {
    const trackerGrid = document.getElementById('trackerGrid');
    trackerGrid.innerHTML = '';

    for (let day = 1; day <= 100; day++) {
        const circle = document.createElement('div');
        circle.className = 'day-circle';
        circle.textContent = day;
        circle.id = `day-${day}`;
        circle.addEventListener('click', () => toggleDay(day));

        // Check if day is completed
        const completedDays = getCompletedDays();
        if (completedDays.includes(day)) {
            circle.classList.add('completed');
        }

        // Mark milestones
        if ([25, 50, 75, 100].includes(day)) {
            if (completedDays.includes(day)) {
                circle.classList.add('milestone-100');
            } else {
                circle.classList.add('milestone');
            }
        }

        trackerGrid.appendChild(circle);
    }
}

// ===== Toggle Day Completion =====
function toggleDay(day) {
    let completedDays = getCompletedDays();
    const dayElement = document.getElementById(`day-${day}`);

    if (completedDays.includes(day)) {
        completedDays = completedDays.filter(d => d !== day);
        dayElement.classList.remove('completed');
    } else {
        completedDays.push(day);
        completedDays.sort((a, b) => a - b);
        dayElement.classList.add('completed');

        // Play confetti for milestones
        if ([25, 50, 75, 100].includes(day)) {
            showMilestoneNotification(day);
            createConfetti();
        }
    }

    localStorage.setItem(STORAGE_KEYS.completedDays, JSON.stringify(completedDays));
    updateDashboard();

    // Special celebration for day 100
    if (day === 100 && completedDays.includes(100)) {
        setTimeout(() => showCompletionCertificate(), 500);
    }
}

// ===== Get Completed Days =====
function getCompletedDays() {
    const saved = localStorage.getItem(STORAGE_KEYS.completedDays);
    return saved ? JSON.parse(saved) : [];
}

// ===== Update Dashboard =====
function updateDashboard() {
    const completedDays = getCompletedDays();
    const daysCompleted = completedDays.length;
    const progressPercentage = Math.round((daysCompleted / 100) * 100);
    const daysRemaining = 100 - daysCompleted;
    const currentStreak = calculateStreak();

    // Update dashboard cards
    document.getElementById('daysCompleted').textContent = daysCompleted;
    document.getElementById('progressPercentage').textContent = `${progressPercentage}%`;
    document.getElementById('currentStreak').textContent = currentStreak;
    document.getElementById('daysRemaining').textContent = daysRemaining;

    // Update progress bar
    document.getElementById('progressBar').style.width = `${progressPercentage}%`;

    // Update progress text
    if (daysCompleted === 0) {
        document.getElementById('progressText').textContent = 'Start your journey today!';
    } else if (progressPercentage < 25) {
        document.getElementById('progressText').textContent = `You're ${progressPercentage}% through! Keep it going! 💪`;
    } else if (progressPercentage < 50) {
        document.getElementById('progressText').textContent = `Halfway there! You're crushing it! 🔥`;
    } else if (progressPercentage < 75) {
        document.getElementById('progressText').textContent = `Over 50%! You've got the momentum! ⚡`;
    } else if (progressPercentage < 100) {
        document.getElementById('progressText').textContent = `Almost there! The finish line is in sight! 🏁`;
    } else {
        document.getElementById('progressText').textContent = `🎉 You've completed the challenge! 🎉`;
    }
}

// ===== Calculate Current Streak =====
function calculateStreak() {
    const completedDays = getCompletedDays();
    let streak = 0;

    // Check consecutive days from the end
    for (let day = Math.max(...completedDays, 0); day >= 1; day--) {
        if (completedDays.includes(day)) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

// ===== Show Milestone Notification =====
function showMilestoneNotification(day) {
    const milestoneMessages = {
        25: {
            title: '🎉 25 Days! 🎉',
            message: 'Quarter of the way there! You\'re building amazing momentum! Keep crushing it! 💪'
        },
        50: {
            title: '🔥 50 Days! 🔥',
            message: 'Halfway done! You\'re unstoppable! This is incredible progress! 🚀'
        },
        75: {
            title: '⭐ 75 Days! ⭐',
            message: 'So close to the finish! You\'ve proven your commitment! One final push! 🏆'
        },
        100: {
            title: '🏆 100 Days Complete! 🏆',
            message: 'You\'ve done it! Congratulations on completing your 100-day challenge! You\'re unstoppable! 🌟'
        }
    };

    const milestone = milestoneMessages[day];
    if (milestone) {
        document.getElementById('milestoneTitle').textContent = milestone.title;
        document.getElementById('milestoneMessage').textContent = milestone.message;
        document.getElementById('milestoneSection').style.display = 'flex';
    }
}

// ===== Close Milestone Notification =====
function closeMilestone() {
    document.getElementById('milestoneSection').style.display = 'none';
}

// ===== Show Completion Certificate =====
function showCompletionCertificate() {
    const userName = document.getElementById('userName').value || 'Challenge Champion';
    const userGoal = document.getElementById('userGoal').value || 'Personal Growth';
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('certName').textContent = userName;
    document.getElementById('certGoal').textContent = userGoal;
    document.getElementById('certDate').textContent = today;

    document.getElementById('certificateSection').style.display = 'flex';
    createConfetti();
}

// ===== Close Certificate =====
function closeCertificate() {
    document.getElementById('certificateSection').style.display = 'none';
}

// ===== Create Confetti Animation =====
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#d8b5e8', '#81c784', '#f8bbd0', '#ffd700', '#b896d8'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = Math.random();
        confetti.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

// ===== Load User Data =====
function loadUserData() {
    const savedName = localStorage.getItem(STORAGE_KEYS.name);
    const savedGoal = localStorage.getItem(STORAGE_KEYS.goal);
    const savedStartDate = localStorage.getItem(STORAGE_KEYS.startDate);
    const savedReflection = localStorage.getItem(STORAGE_KEYS.weeklyReflection);

    if (savedName) document.getElementById('userName').value = savedName;
    if (savedGoal) document.getElementById('userGoal').value = savedGoal;
    if (savedStartDate) document.getElementById('startDate').value = savedStartDate;
    if (savedReflection) document.getElementById('weeklyReflection').value = savedReflection;
}

// ===== Setup Event Listeners =====
function setupEventListeners() {
    // Save user data on input
    document.getElementById('userName').addEventListener('input', (e) => {
        localStorage.setItem(STORAGE_KEYS.name, e.target.value);
    });

    document.getElementById('userGoal').addEventListener('input', (e) => {
        localStorage.setItem(STORAGE_KEYS.goal, e.target.value);
    });

    document.getElementById('startDate').addEventListener('change', (e) => {
        localStorage.setItem(STORAGE_KEYS.startDate, e.target.value);
        updateDashboard();
    });

    // Auto-save reflection with debounce
    let reflectionTimeout;
    document.getElementById('weeklyReflection').addEventListener('input', (e) => {
        clearTimeout(reflectionTimeout);
        reflectionTimeout = setTimeout(() => {
            localStorage.setItem(STORAGE_KEYS.weeklyReflection, e.target.value);
        }, 1000);
    });
}

// ===== Generate Summary =====
function generateSummary() {
    const completedDays = getCompletedDays().length;
    const progressPercentage = Math.round((completedDays / 100) * 100);
    const currentStreak = calculateStreak();
    const userName = document.getElementById('userName').value || 'Challenge Tracker';
    const userGoal = document.getElementById('userGoal').value || 'Not set';
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    document.getElementById('summaryName').textContent = userName;
    document.getElementById('summaryGoal').textContent = userGoal;
    document.getElementById('summaryCompletion').textContent = `${progressPercentage}%`;
    document.getElementById('summaryStreak').textContent = `${currentStreak} days`;
    document.getElementById('summaryDays').textContent = `${completedDays} days`;
    document.getElementById('summaryDate').textContent = today;

    document.getElementById('summaryCard').style.display = 'block';
}

// ===== Share Progress on WhatsApp =====
async function shareProgress() {
    const completedDays = getCompletedDays().length;
    const progressPercentage = Math.round((completedDays / 100) * 100);
    const currentStreak = calculateStreak();
    const userName = document.getElementById('userName').value || 'I';
    const userGoal = document.getElementById('userGoal').value || 'my goal';

    const message = `🌸 *Blossom Springs 100-Day Challenge Update* 🌸\n\n` +
        `📊 *Progress:* ${progressPercentage}% (${completedDays}/100 days)\n` +
        `🔥 *Current Streak:* ${currentStreak} days\n` +
        `🎯 *Goal:* ${userGoal}\n` +
        `👤 *Challenger:* ${userName}\n\n` +
        `"Small daily actions create extraordinary results."\n\n` +
        `💪 Keep going! Every day counts! 💜`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ===== Download Certificate =====
async function downloadCertificate() {
    const certificate = document.querySelector('.certificate');

    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const width = 800;
        const height = 600;

        canvas.width = width;
        canvas.height = height;

        // Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#f5e6d3');
        gradient.addColorStop(1, '#e8d5f2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Border
        ctx.strokeStyle = '#9966cc';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        // Text
        ctx.fillStyle = '#2c2c2c';
        ctx.font = 'bold 32px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏆 Certificate of Achievement 🏆', width / 2, 100);

        ctx.font = '18px serif';
        ctx.fillText('This is to certify that', width / 2, 160);

        ctx.font = 'bold 28px serif';
        ctx.fillStyle = '#9966cc';
        ctx.fillText(document.getElementById('certName').textContent, width / 2, 220);

        ctx.fillStyle = '#2c2c2c';
        ctx.font = '18px serif';
        ctx.fillText('has successfully completed the', width / 2, 280);

        ctx.font = 'bold 22px serif';
        ctx.fillStyle = '#81c784';
        ctx.fillText('Blossom Springs 100-Day Challenge', width / 2, 340);

        ctx.fillStyle = '#2c2c2c';
        ctx.font = '16px serif';
        ctx.fillText('Completed on ' + document.getElementById('certDate').textContent, width / 2, 450);

        ctx.font = 'italic 14px serif';
        ctx.fillText('Blossom Springs Team', width / 2, 520);

        // Download
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `Certificate-${document.getElementById('certName').textContent.replace(/\s+/g, '_')}.png`;
        link.click();
    } catch (error) {
        console.error('Error generating certificate:', error);
        alert('Certificate ready to print. Use your browser\'s print function to save as PDF.');
    }
}

// ===== Reset Challenge =====
function resetChallenge() {
    const confirmReset = confirm(
        'Are you sure you want to reset your challenge? This will delete all your progress data. This action cannot be undone.'
    );

    if (confirmReset) {
        // Clear all storage
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });

        // Reset form
        document.getElementById('userName').value = '';
        document.getElementById('userGoal').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('weeklyReflection').value = '';
        document.getElementById('summaryCard').style.display = 'none';

        // Regenerate tracker
        generateTrackerGrid();
        updateDashboard();

        alert('✨ Your challenge has been reset. Ready to start fresh!');
    }
}

// ===== PWA Installation =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installButton').style.display = 'block';
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    document.getElementById('installButton').style.display = 'none';
});

function setupPWAInstall() {
    // Auto-hide install button after 5 seconds if not clicked
    setTimeout(() => {
        const installBtn = document.getElementById('installButton');
        if (installBtn.style.display === 'block' && !localStorage.getItem('bs_install_prompted')) {
            localStorage.setItem('bs_install_prompted', 'true');
        }
    }, 5000);
}

// ===== Page Visibility Handler =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('App is in background');
    } else {
        console.log('App is in foreground');
        // Refresh data when app comes back to foreground
        updateDashboard();
        displayDailyQuote();
    }
});

// ===== Accessibility: Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        document.getElementById('milestoneSection').style.display = 'none';
        document.getElementById('certificateSection').style.display = 'none';
    }
});

console.log('✨ Blossom Springs script loaded successfully!');