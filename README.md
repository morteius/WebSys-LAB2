<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CJ & Elaine · Portfolio Blog</title>
    
    <!-- FONT POPPINS -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- ICONS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --baby-100: #e6f0fa;
            --baby-200: #b8d9f5;
            --baby-300: #89c4f4;
            --baby-400: #5f9ea0;
            --baby-500: #2c3e50;
            --baby-600: #1a2c3a;
            --white: #ffffff;
            --shadow-sm: 0 5px 20px rgba(137, 196, 244, 0.15);
            --shadow-lg: 0 15px 40px rgba(95, 158, 160, 0.25);
            --transition: all 0.3s ease;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(145deg, var(--baby-100), #d9e9fa);
            color: var(--baby-500);
            line-height: 1.6;
            min-height: 100vh;
            padding: 2rem;
        }

        .readme-container {
            max-width: 1000px;
            margin: 2rem auto;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 40px;
            padding: 3rem;
            box-shadow: var(--shadow-lg);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }

        /* HEADER SECTION */
        .readme-header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 2px dashed var(--baby-200);
        }

        .readme-header h1 {
            font-size: 3rem;
            font-weight: 600;
            color: var(--baby-500);
            margin-bottom: 0.5rem;
        }

        .readme-header h1 span {
            color: var(--baby-300);
            position: relative;
            display: inline-block;
        }

        .readme-header h1 span::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: 0;
            width: 100%;
            height: 8px;
            background: rgba(137, 196, 244, 0.3);
            z-index: -1;
        }

        .readme-header p {
            font-size: 1.2rem;
            color: var(--baby-400);
            max-width: 600px;
            margin: 1rem auto;
        }

        .badge-container {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
            flex-wrap: wrap;
        }

        .badge {
            background: var(--baby-100);
            padding: 0.5rem 1.5rem;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 500;
            border: 1px solid var(--baby-200);
            color: var(--baby-500);
        }

        .badge i {
            color: var(--baby-300);
            margin-right: 0.5rem;
        }

        /* SECTION STYLES */
        .section {
            margin-bottom: 3rem;
            padding: 2rem;
            background: var(--white);
            border-radius: 30px;
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--baby-200);
            transition: var(--transition);
        }

        .section:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
            border-color: var(--baby-300);
        }

        .section-title {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 2rem;
            font-size: 1.8rem;
            color: var(--baby-500);
            position: relative;
            padding-bottom: 0.8rem;
        }

        .section-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, var(--baby-300), var(--baby-400));
            border-radius: 2px;
        }

        .section-title i {
            color: var(--baby-300);
            font-size: 2rem;
        }

        /* FILE TREE */
        .file-tree {
            background: var(--baby-100);
            padding: 2rem;
            border-radius: 20px;
            font-family: monospace;
            font-size: 1rem;
            border: 1px solid var(--baby-200);
        }

        .file-tree pre {
            color: var(--baby-500);
            line-height: 2;
        }

        /* GRIDS */
        .grid-2, .grid-3 {
            display: grid;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        .grid-2 {
            grid-template-columns: repeat(2, 1fr);
        }

        .grid-3 {
            grid-template-columns: repeat(3, 1fr);
        }

        /* CARDS */
        .student-card, .post-card, .color-card, .command-card {
            background: var(--baby-100);
            padding: 1.5rem;
            border-radius: 20px;
            border: 1px solid var(--baby-200);
            transition: var(--transition);
        }

        .student-card:hover, .post-card:hover, .command-card:hover {
            transform: translateY(-5px);
            background: white;
            border-color: var(--baby-300);
            box-shadow: var(--shadow-lg);
        }

        .student-card h3 {
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            color: var(--baby-500);
        }

        .student-card .handle {
            color: var(--baby-300);
            font-weight: 500;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }

        .student-card .handle i {
            margin-right: 0.3rem;
        }

        .student-card .days {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .day-tag {
            background: white;
            padding: 0.3rem 1rem;
            border-radius: 30px;
            font-size: 0.85rem;
            border: 1px solid var(--baby-200);
        }

        .post-card .date {
            color: var(--baby-300);
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }

        .post-card h4 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        .post-card .tags {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .tag {
            background: white;
            padding: 0.2rem 0.8rem;
            border-radius: 30px;
            font-size: 0.8rem;
            border: 1px solid var(--baby-200);
        }

        .color-card {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .color-preview {
            width: 50px;
            height: 50px;
            border-radius: 12px;
        }

        .color-info {
            flex: 1;
        }

        .color-name {
            font-weight: 600;
            margin-bottom: 0.2rem;
        }

        .color-hex {
            color: var(--baby-400);
            font-size: 0.9rem;
        }

        .command-card {
            background: var(--baby-500);
            color: white;
        }

        .command-card code {
            display: block;
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 12px;
            margin: 1rem 0;
            font-family: monospace;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .command-card .example {
            color: var(--baby-200);
            font-size: 0.9rem;
            font-style: italic;
        }

        /* TABLE */
        .schedule-table {
            width: 100%;
            border-collapse: collapse;
        }

        .schedule-table th {
            background: var(--baby-300);
            color: white;
            padding: 1rem;
            text-align: left;
            font-weight: 500;
        }

        .schedule-table td {
            padding: 1rem;
            border-bottom: 1px solid var(--baby-200);
        }

        .schedule-table tr:hover {
            background: var(--baby-100);
        }

        /* FOOTER */
        .readme-footer {
            text-align: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px dashed var(--baby-200);
            color: var(--baby-400);
        }

        .footer-quote {
            font-size: 1.2rem;
            font-style: italic;
            margin-bottom: 1rem;
            color: var(--baby-300);
        }

        .footer-heart {
            color: var(--baby-300);
            animation: heartbeat 1.5s ease infinite;
        }

        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
            body { padding: 1rem; }
            .readme-container { padding: 1.5rem; }
            .readme-header h1 { font-size: 2.2rem; }
            .grid-2, .grid-3 { grid-template-columns: 1fr; }
            .section-title { font-size: 1.5rem; }
        }
    </style>
</head>
<body>
    <div class="readme-container">
        
        <!-- HEADER -->
        <div class="readme-header">
            <h1>📝 <span>CJ & Elaine</span></h1>
            <p>Student Portfolio with Daily Blog</p>
            <div class="badge-container">
                <span class="badge"><i class="fas fa-code"></i> HTML5</span>
                <span class="badge"><i class="fas fa-paint-brush"></i> CSS3</span>
                <span class="badge"><i class="fab fa-github"></i> Git</span>
                <span class="badge"><i class="fas fa-mobile-alt"></i> Responsive</span>
            </div>
        </div>

        <!-- PROJECT STRUCTURE -->
        <div class="section">
            <h2 class="section-title"><i class="fas fa-folder-tree"></i> Project Structure</h2>
            <div class="file-tree">
                <pre>
📦 your-repo/
├── 📄 index.html                 # Main landing page
├── 📄 style.css                  # Global styles
├── 📄 blog.css                   # Blog-specific styles
├── 📁 images/                     
│   └── 🖼️ ellie_cj.JPG           # Group photo
├── 📁 student1_elaine/            # Elaine's folder
│   ├── 📄 main.html               # Portfolio home
│   ├── 📄 about.html              # About page
│   └── 📁 blog/                   
│       ├── 📄 day1.html           # Feb 21
│       ├── 📄 day2.html           # Feb 22
│       └── 📄 day3.html           # Feb 23
└── 📁 student2_cj/                 # CJ's folder
    ├── 📄 main.html                # Portfolio home
    ├── 📄 about.html               # About page
    └── 📁 blog/                   
        ├── 📄 day1.html            # Feb 23
        ├── 📄 day2.html            # Feb 24
        └── 📄 day3.html            # Feb 25
                </pre>
            </div>
        </div>

        <!-- CONTRIBUTORS -->
        <div class="section">
            <h2 class="section-title"><i class="fas fa-users"></i> Meet the Team</h2>
            <div class="grid-2">
                <!-- Elaine Card -->
                <div class="student-card">
                    <h3>Elaine L. Paras</h3>
                    <p class="handle"><i class="fas fa-at"></i> @ellie_paras</p>
                    <p><i class="fas fa-map-marker-alt" style="color: var(--baby-300);"></i> Camalig, Albay</p>
                    <p><i class="fas fa-graduation-cap" style="color: var(--baby-300);"></i> BS Information Technology</p>
                    <div style="margin: 1rem 0;">
                        <span class="tag">🏐 Volleyball</span>
                        <span class="tag">🎨 Art</span>
                        <span class="tag">📖 Reading</span>
                    </div>
                    <div class="days">
                        <span class="day-tag">Day 1: Feb 21</span>
                        <span class="day-tag">Day 2: Feb 22</span>
                        <span class="day-tag">Day 3: Feb 23</span>
                    </div>
                </div>
                <!-- CJ Card -->
                <div class="student-card">
                    <h3>Charles James G. Mape</h3>
                    <p class="handle"><i class="fas fa-at"></i> @cj_mape</p>
                    <p><i class="fas fa-map-marker-alt" style="color: var(--baby-300);"></i> Bulan, Sorsogon</p>
                    <p><i class="fas fa-graduation-cap" style="color: var(--baby-300);"></i> BS Information Technology</p>
                    <div style="margin: 1rem 0;">
                        <span class="tag">🥊 Sports</span>
                        <span class="tag">🎮 Gaming</span>
                        <span class="tag">🎵 Music</span>
                    </div>
                    <div class="days">
                        <span class="day-tag">Day 1: Feb 23</span>
                        <span class="day-tag">Day 2: Feb 24</span>
                        <span class="day-tag">Day 3: Feb 25</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- BLOG POSTS -->
        <div class="section">
            <h2 class="section-title"><i class="fas fa-book-open"></i> Daily Blog Posts</h2>
            <div class="grid-3">
                <!-- Elaine Day 1 -->
                <div class="post-card">
                    <div class="date"><i class="fas fa-calendar"></i> Feb 21, 2026</div>
                    <h4>Saturday Ganaps</h4>
                    <p style="font-size: 0.9rem; color: var(--baby-400);">Ice cream, Art Pop Market, photobooth</p>
                    <div class="tags">
                        <span class="tag">adventures</span>
                        <span class="tag">personal</span>
                    </div>
                </div>
                <!-- Elaine Day 2 -->
                <div class="post-card">
                    <div class="date"><i class="fas fa-calendar"></i> Feb 22, 2026</div>
                    <h4>Casual Sunday</h4>
                    <p style="font-size: 0.9rem; color: var(--baby-400);">Rest, review, reading</p>
                    <div class="tags">
                        <span class="tag">personal</span>
                        <span class="tag">rest</span>
                    </div>
                </div>
                <!-- Elaine Day 3 -->
                <div class="post-card">
                    <div class="date"><i class="fas fa-calendar"></i> Feb 23, 2026</div>
                    <h4>Art Pop Market Adventure</h4>
                    <p style="font-size: 0.9rem; color: var(--baby-400);">Souvenirs, art, street food</p>
                    <div class="tags">
                        <span class="tag">adventures</span>
                        <span class="tag">art</span>
                    </div>
                </div>
                <!-- CJ Day 1 -->
                <div class="post-card">
                    <div class="date"><i class="fas fa-calendar"></i> Feb 23, 2026</div>
                    <h4>Getting Started & Fable</h4>
                    <p style="font-size: 0.9rem; color: var(--baby-400);">Project, market, gaming</p>
                    <div class="tags">
                        <span class="tag">coding</span>
                        <span class="tag">gaming</span>
                    </div>
                </div>
                <!-- CJ Day 2 -->
                <div class="post-card">
                    <div class="date"><i class="fas fa-calendar"></i> Feb 24, 2026</div>
                    <h4>Workout & Upset Stomach</h4>
                    <p style="font-size: 0.9rem; color: var(--baby-400);">Exercise, coding, sickness</p>
                    <div class="tags">
                        <span class="tag">personal</span>
                        <span class="tag">fitness</span>
                    </div>
                </div>
                <!-- CJ Day 3 -->
                <div class="post-card">
                    <div class="date"><i class="fas fa-calendar"></i> Feb 25, 2026</div>
                    <h4>Art Pop & Fable Night</h4>
                    <p style="font-size: 0.9rem; color: var(--baby-400);">Game art print, market, gaming</p>
                    <div class="tags">
                        <span class="tag">adventures</span>
                        <span class="tag">gaming</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- GIT WORKFLOW -->
        <div class="section">
            <h2 class="section-title"><i class="fab fa-github"></i> Git Workflow</h2>
            <div class="grid-2">
                <div class="command-card">
                    <i class="fas fa-arrow-down" style="color: var(--baby-300);"></i>
                    <h3 style="margin: 1rem 0;">Pull First</h3>
                    <code>git pull origin main</code>
                    <p class="example">Always get latest changes before working</p>
                </div>
                <div class="command-card">
                    <i class="fas fa-plus-circle" style="color: var(--baby-300);"></i>
                    <h3 style="margin: 1rem 0;">Add Your Files</h3>
                    <code>git add student1_elaine/blog/day4.html</code>
                    <p class="example">Only add files from YOUR folder</p>
                </div>
                <div class="command-card">
                    <i class="fas fa-check-circle" style="color: var(--baby-300);"></i>
                    <h3 style="margin: 1rem 0;">Commit with Message</h3>
                    <code>git commit -m "Elaine: added day4 post"</code>
                    <p class="example">Clear messages = happy professor</p>
                </div>
                <div class="command-card">
                    <i class="fas fa-arrow-up" style="color: var(--baby-300);"></i>
                    <h3 style="margin: 1rem 0;">Push to GitHub</h3>
                    <code>git push origin main</code>
                    <p class="example">Share your changes with partner</p>
                </div>
            </div>
        </div>

        <!-- COLOR PALETTE -->
        <div class="section">
            <h2 class="section-title"><i class="fas fa-palette"></i> Baby Blue Palette</h2>
            <div class="grid-2">
                <div class="color-card">
                    <div class="color-preview" style="background: #e6f0fa;"></div>
                    <div class="color-info">
                        <div class="color-name">Baby Blue BG</div>
                        <div class="color-hex">#e6f0fa</div>
                    </div>
                </div>
                <div class="color-card">
                    <div class="color-preview" style="background: #b8d9f5;"></div>
                    <div class="color-info">
                        <div class="color-name">Baby Blue Light</div>
                        <div class="color-hex">#b8d9f5</div>
                    </div>
                </div>
                <div class="color-card">
                    <div class="color-preview" style="background: #89c4f4;"></div>
                    <div class="color-info">
                        <div class="color-name">Baby Blue</div>
                        <div class="color-hex">#89c4f4</div>
                    </div>
                </div>
                <div class="color-card">
                    <div class="color-preview" style="background: #5f9ea0;"></div>
                    <div class="color-info">
                        <div class="color-name">Baby Blue Dark</div>
                        <div class="color-hex">#5f9ea0</div>
                    </div>
                </div>
                <div class="color-card">
                    <div class="color-preview" style="background: #2c3e50;"></div>
                    <div class="color-info">
                        <div class="color-name">Text Dark</div>
                        <div class="color-hex">#2c3e50</div>
                    </div>
                </div>
                <div class="color-card">
                    <div class="color-preview" style="background: #ffffff; border: 1px solid #b8d9f5;"></div>
                    <div class="color-info">
                        <div class="color-name">White</div>
                        <div class="color-hex">#ffffff</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FEATURES -->
        <div class="section">
            <h2 class="section-title"><i class="fas fa-star"></i> Features</h2>
            <div class="grid-3">
                <div class="student-card" style="text-align: center;">
                    <i class="fas fa-user-friends" style="font-size: 2rem; color: var(--baby-300); margin-bottom: 1rem;"></i>
                    <h3>Two Portfolios</h3>
                    <p style="font-size: 0.9rem;">Separate sections for each student</p>
                </div>
                <div class="student-card" style="text-align: center;">
                    <i class="fas fa-calendar-alt" style="font-size: 2rem; color: var(--baby-300); margin-bottom: 1rem;"></i>
                    <h3>Daily Blog</h3>
                    <p style="font-size: 0.9rem;">New posts added every day</p>
                </div>
                <div class="student-card" style="text-align: center;">
                    <i class="fas fa-mobile-alt" style="font-size: 2rem; color: var(--baby-300); margin-bottom: 1rem;"></i>
                    <h3>Responsive</h3>
                    <p style="font-size: 0.9rem;">Works on all devices</p>
                </div>
                <div class="student-card" style="text-align: center;">
                    <i class="fas fa-code-branch" style="font-size: 2rem; color: var(--baby-300); margin-bottom: 1rem;"></i>
                    <h3>Git Ready</h3>
                    <p style="font-size: 0.9rem;">Clear commit history</p>
                </div>
                <div class="student-card" style="text-align: center;">
                    <i class="fas fa-paint-brush" style="font-size: 2rem; color: var(--baby-300); margin-bottom: 1rem;"></i>
                    <h3>Baby Blue Theme</h3>
                    <p style="font-size: 0.9rem;">Clean and modern design</p>
                </div>
                <div class="student-card" style="text-align: center;">
                    <i class="fas fa-chevron-circle-down" style="font-size: 2rem; color: var(--baby-300); margin-bottom: 1rem;"></i>
                    <h3>Easy Nav</h3>
                    <p style="font-size: 0.9rem;">Simple sidebar navigation</p>
                </div>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="readme-footer">
            <p class="footer-quote">"Two students, two portfolios, one blog."</p>
            <p>© 2026 CJ & Elaine · Duo Project</p>
            <p style="margin-top: 1rem;">
                Made with <span class="footer-heart">💙</span> and lots of baby blue
            </p>
        </div>

    </div>
</body>
</html>
