# 🌸 Blossom Springs 100-Day Challenge Tracker

A beautiful, mobile-first web application to help participants commit to one goal for 100 consecutive days and track their progress from their phone.

## 🎯 Features

### Core Features
- **User Profile Section** - Set your name, goal, and start date
- **Progress Dashboard** - View days completed, progress percentage, current streak, and days remaining
- **100-Day Tracker Grid** - Interactive circles to mark daily completion
- **Milestone Celebrations** - Special notifications at 25, 50, 75, and 100 days
- **Completion Certificate** - Achievement certificate with celebration animation
- **Weekly Reflection** - Text area for personal notes and observations
- **Progress Summary Card** - Generate accountability tracking cards
- **WhatsApp Sharing** - Share progress directly on WhatsApp
- **Data Persistence** - All data saved to browser local storage

### Bonus Features
- **Dark Mode** - Toggle between light and dark themes
- **Daily Motivational Quotes** - Unique quote of the day
- **Confetti Animations** - Celebrate milestones with festive animations
- **Progressive Web App (PWA)** - Install as a native app on mobile devices
- **Offline Support** - Full functionality without internet connection
- **Responsive Design** - Optimized for all mobile devices
- **Accessibility** - Keyboard navigation and WCAG compliance

## 🎨 Design Highlights

- **Color Scheme**: Soft purple (#d8b5e8), lavender (#b896d8), and green accents (#81c784)
- **Typography**: Clean, modern sans-serif with excellent readability
- **Mobile-First**: Designed for mobile devices first, scales beautifully to tablets and desktops
- **Feminine Aesthetic**: Soft colors, smooth animations, and encouraging messaging
- **Professional Appearance**: High-quality UI with shadow effects and gradients

## 📱 Installation & Deployment

### GitHub Pages Deployment

1. The repository is already set up for GitHub Pages
2. Go to repository Settings → Pages
3. Select `main` branch as source
4. Your app will be available at: `https://foladearest.github.io/blossom-springs-100-day-challenge/`

### Local Testing

1. Clone the repository
2. Open a terminal in the project directory
3. Run a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npx http-server
   ```
4. Open `http://localhost:8000` in your browser

## 🚀 How to Use

1. **Enter Your Information**
   - Type your name
   - Set your goal
   - Select your start date

2. **Track Daily Progress**
   - Click on a numbered circle to mark it as completed
   - Completed circles turn green
   - Click again to uncheck a day

3. **Monitor Your Progress**
   - Watch your percentage increase
   - Track your current streak
   - See days remaining

4. **Celebrate Milestones**
   - Day 25, 50, 75: Get encouraging messages
   - Day 100: Unlock your completion certificate
   - Enjoy confetti animations

5. **Write Reflections**
   - Add weekly notes about your progress
   - Auto-saves to your device

6. **Share Your Progress**
   - Generate a summary card
   - Share directly on WhatsApp with friends
   - Stay accountable!

## 💾 Data Storage

All data is stored locally in your browser using `localStorage`:
- User name, goal, and start date
- Completed days
- Weekly reflections
- Theme preference (light/dark mode)

**No data is sent to any server.** Everything stays on your device.

## 📋 Browser Compatibility

- ✅ Chrome/Edge (Mobile & Desktop)
- ✅ Safari (iOS 13+)
- ✅ Firefox (Mobile & Desktop)
- ✅ Samsung Internet
- ✅ All modern mobile browsers

## ⚙️ Technical Stack

- **HTML5**: Semantic markup and PWA support
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Core functionality without external dependencies
- **Service Worker**: Offline functionality and caching strategy
- **Web App Manifest**: PWA installation support

## 🔧 PWA Features

### Install as App
1. Open the app in a mobile browser
2. Tap the browser menu (three dots)
3. Select "Install app" or "Add to Home Screen"
4. Choose a name and confirm
5. Your app will appear on your home screen like a native app!

### Offline Support
- The app works completely offline
- All your data is saved locally
- Service Worker caches all assets for fast loading

## 📊 Progress Tracking

The app calculates:
- **Days Completed**: Total number of days marked
- **Progress Percentage**: Visual progress bar and percentage
- **Current Streak**: Consecutive days completed from the most recent
- **Days Remaining**: Days left to reach 100
- **Milestones**: Special celebrations at 25%, 50%, 75%, and 100%

## 🎉 Milestone Messages

- **Day 25**: "Quarter of the way there! You're building amazing momentum!"
- **Day 50**: "Halfway done! You're unstoppable!"
- **Day 75**: "So close to the finish! One final push!"
- **Day 100**: "You've done it! Congratulations on completing your challenge!"

## 🌙 Dark Mode

Toggle between light and dark themes:
- Click the moon/sun icon in the header
- Your preference is saved automatically
- Perfect for nighttime usage

## 🔐 Privacy

- No login required
- No data collection
- No analytics tracking
- No third-party services
- 100% client-side processing

## 📝 Customization

To customize the app:

1. **Colors**: Edit CSS variables in `styles.css` (`:root` section)
2. **Quotes**: Add or modify quotes in the `MOTIVATIONAL_QUOTES` array in `script.js`
3. **Milestone Messages**: Update messages in `showMilestoneNotification()` function
4. **App Name/Title**: Edit in `index.html` and `manifest.json`

## 🐛 Troubleshooting

### Data Not Saving
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Use a private/incognito window to test

### App Not Installing
- Make sure you're using HTTPS (GitHub Pages uses HTTPS automatically)
- Clear browser cache
- Try on a different device or browser

### Service Worker Not Working
- Check browser console for errors
- Ensure you're online when first loading the app
- Refresh the page after first visit

## 📱 Device Recommendations

Best experience on:
- iPhone 8 and newer
- Android 6.0 and newer
- iPad (all versions)
- Android tablets

## 🎯 Future Enhancement Ideas

- Weekly analytics chart
- Goal categories/templates
- Social sharing integration
- Backup/export functionality
- Multiple challenges support
- Community features
- Email reminders
- Photo gallery of progress

## 📄 License

This project is open source and available for personal use.

## 👩‍💻 Contributing

Feel free to fork, modify, and improve this project. Some ideas:
- Add more motivational quotes
- Enhance the UI/UX
- Add additional features
- Improve performance
- Fix bugs or accessibility issues

## 💜 Support

If you enjoy this tracker, please:
- ⭐ Star the repository
- 📱 Share with friends pursuing their goals
- 💬 Provide feedback and suggestions
- 🐛 Report any issues

## 🌟 Inspiration

"Small daily actions create extraordinary results."

Remember, the journey of 100 days is about consistency, not perfection. Every day counts!

---

Made with 💜 for your growth and success.