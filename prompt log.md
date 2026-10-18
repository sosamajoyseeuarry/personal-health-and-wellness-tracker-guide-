
# Health & Wellness Innovation

## Task 1 – Sector Selection

**Objective:**
To identify a local health and wellness challenge, its target users, and a proposed digital project with features that can help address the problem.

**Sector:**  
Health & Wellness Innovation

**Local Challenge:**  
People have difficulty maintaining healthy habits and keeping track of their daily health activities.

**Target Users:**  
Students, working adults, and community members.

**Proposed Project:**  
Personal Health and Wellness Tracker

**Key Features:**
- Daily health and exercise tracker
- Water intake reminders
- Sleep monitoring

---

## Task 2 – Zero-Shot Prompting

**Objective:**
To create a simple and user-friendly webpage that helps people maintain a healthy lifestyle by tracking their daily water intake, exercise, and sleep.

**Exact Prompt:**
> Create a simple webpage that helps people maintain a healthy lifestyle by tracking their daily water intake, exercise, and sleep. The webpage should include a daily wellness checklist, water intake reminders, exercise tips, and sleep tracking to help students, working adults, and community members improve their health and wellness. Use a clean, user-friendly design with easy-to-understand instructions and a calming color scheme.

**Actual Copilot Output:**

The Copilot-generated webpage is called Daywell – Your Daily Reset. It has a simple and clean design with soft green, white, and beige colors. It includes a daily habits checklist, a water tracker with a 2,000 ml goal, a sleep tracker, exercise suggestions, and gentle wellness reminders.

**Observation:**

The generated webpage follows the prompt because it provides useful features that can help people monitor their daily health habits. Its design is simple, organized, and easy to understand. The checklist, water tracker, and sleep tracker make the webpage interactive and helpful for daily wellness.

---

## Task 3 – Improve: Anatomy of a Prompt

**Objective:**
To improve the prompt by providing clear instructions about the webpage's features, design, technology, and accessibility requirements.

**Exact Prompt:**
> Act as a frontend web developer. Create a responsive single-page Health & Wellness Tracker for students, working adults, and community members in the Philippines. Include an interactive daily wellness checklist, a water intake tracker, sleep tracking, and simple exercise tips. Use semantic HTML, CSS, and vanilla JavaScript. Do not use external frameworks, backend services, or live health data. Provide the required frontend files and implement interactive features that allow users to mark daily habits as completed, track their water intake, and adjust their sleep hours. The interface must remain readable on mobile screens, use a clean design with calming colors, and support both mouse and keyboard interaction.

**Actual Copilot Output:**

The Copilot-generated webpage displays a daily habits checklist, a sleep tracker with an adjustable slider, and a water tracker with a 2,000 ml daily goal. It also provides exercise suggestions and wellness reminders. The design uses calming colors and an organized layout.

**Observation:**

The webpage follows the prompt because it includes the main features needed to monitor daily health and wellness. The checklist helps users track their habits, while the sleep and water trackers allow them to monitor their daily activities. The layout is clean and readable on a mobile screen.

---

## Task 4 – Few-Shot Prompting and Role Assignment

**Objective:**
To create a prompt that generates daily health and wellness checklist items using a specific format, including the item name, category, and description.

**Exact Prompt:**
> Create daily health and wellness checklist items using this format:
>
> Example 1:
>
> Item: Drinking water
>
> Category: Daily Wellness
>
> Description: Drink enough water throughout the day to stay hydrated.
>
> Example 2:
>
> Item: Daily exercise
>
> Category: Physical Activity
>
> Description: Spend at least 10–15 minutes walking, stretching, or doing simple exercises.
>
> Generate four additional general health and wellness items using the same format and display them as an interactive checklist. Include sleep tracking, healthy eating, personal hygiene, and mental wellness. Allow users to mark each item as completed using checkboxes. Use simple descriptions, a clean design, and a responsive layout that works on both desktop and mobile screens.

**Actual Copilot Output:**

The generated webpage displays three main sections: Sleep Last Night, Water Check, and A Little Movement. The sleep section allows users to adjust their sleep hours using a slider. The water tracker records water intake toward a 2,000 ml goal, while the movement section provides exercise suggestions, such as taking a 10-minute walk outside.

**What Worked:**

The sleep tracker, water intake tracker, and exercise suggestions are displayed clearly and are easy to understand. The buttons and slider make the webpage interactive. The soft colors and organized layout also make the webpage look clean and suitable for a health and wellness website.

**What Needs Improvement:**

The webpage could include more wellness checklist items, such as healthy eating, personal hygiene, and mental wellness. The water tracker could also provide a clearer progress indicator, while the exercise section could offer more activity choices.

**Verification:**

Based on the screenshot, the webpage displays the main health and wellness features and has a mobile-friendly layout. However, further testing is needed to confirm that all buttons and sliders work correctly with mouse and keyboard input.

### Experiment B – Role Assignment

**Exact Prompt:**
> Act as a frontend accessibility reviewer. Examine the generated Health & Wellness Tracker. Identify problems involving HTML semantics, keyboard access, form labels, and visual clarity. Check whether the wellness checklist, water intake tracker, and sleep slider are easy to use and accessible to different users. Recommend specific improvements without changing the project's scope or adding unnecessary features.

**Actual Copilot Output:**

Copilot reported that the website already had a good accessibility foundation, including semantic page landmarks, a skip link, labeled search and filter controls, visible keyboard focus styles, and a native modal dialog with a named close button.

**Observation:**

The accessibility review identifies useful practices that can help make a webpage easier to use. However, the reported features should be checked against the actual project code to confirm that they are present and working correctly. Improvements should focus on keyboard navigation, clear labels, readable text, and accessible controls.

---

## Task 5 – Analyze Structured Reasoning and Refinement

**Objective:**
To review the Health & Wellness Tracker by checking whether the interactive checklist works correctly, the HTML uses appropriate semantic elements, and the webpage is easy to use on mobile screens. The goal is to identify important implementation issues, recommend simple corrections, and explain how to test the changes.

**Exact Prompt:**
> Review my Health & Wellness Tracker. Check whether the interactive wellness checklist works correctly, whether the water intake tracker and sleep slider function properly, and whether the interface is usable on mobile screens. Identify the two most important implementation issues based on the provided code. Recommend the smallest appropriate corrections and explain how I can test them.

**Observation:**

The water intake tracker automatically marks the “Drinking water” checklist item as complete after adding 250 ml of water. This can be misleading because the daily water goal is 2,000 ml. The checklist should allow users to mark their habits as completed manually instead of automatically connecting checklist completion to water intake.

**Selected Correction:**

Remove the automatic updates to `state.habits.water` from the add-water and remove-water handlers. This will keep the water intake tracker and the wellness checklist independent, allowing users to manage their checklist manually.

**Verification Result:**

Reset the day's data and add 250 ml of water. Check that the “Drinking water” checklist item remains unchecked. Then, mark it as completed manually and confirm that the checkbox state is saved correctly.

**What Worked:**

The water intake tracker records water consumption in 250 ml increments and tracks progress toward the 2,000 ml daily goal. The checklist also provides a way for users to monitor their daily wellness habits.

**What Needs Improvement:**

The automatic connection between water intake and checklist completion needs to be removed to avoid marking a habit as complete too early. The checklist should remain under the user's control, while the water tracker independently records the amount of water consumed.
