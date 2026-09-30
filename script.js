/* ==========================================
   RESUMECRAFT
   Smart Resume Builder
========================================== */

const fields = [
    "name",
    "jobTitle",
    "email",
    "phone",
    "location",
    "linkedin",
    "github",
    "summary",
    "skills"
];

let education = [];
let experiences = [];
let projects = [];

let selectedTemplate = "classic";
let photoData = "";
let zoom = 100;


/* ==========================================
   HELPER
========================================== */

function getValue(id, fallback = "") {

    const element = document.getElementById(id);

    return element ? element.value.trim() : fallback;
}


/* ==========================================
   PERSONAL INFORMATION
========================================== */

function updatePersonalInfo() {

    document.getElementById("previewName").textContent =
        getValue("name", "Rahul Patel");

    document.getElementById("previewJob").textContent =
        getValue("jobTitle", "Frontend Developer");

    document.getElementById("previewEmail").textContent =
        getValue("email", "email@example.com");

    document.getElementById("previewPhone").textContent =
        getValue("phone", "+91 9876543210");

    document.getElementById("previewLocation").textContent =
        getValue("location", "India");

    document.getElementById("previewLinkedin").textContent =
        getValue("linkedin", "linkedin.com");

    document.getElementById("previewGithub").textContent =
        getValue("github", "github.com");

    document.getElementById("previewSummary").textContent =
        getValue(
            "summary",
            "Your professional summary will appear here."
        );

    updateSkills();
    updateSummaryCount();
}


/* ==========================================
   SKILLS
========================================== */

function updateSkills() {

    const input = getValue("skills");

    const skills = input
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean);

    const inputTags =
        document.getElementById("skillTags");

    const preview =
        document.getElementById("previewSkills");

    inputTags.innerHTML = "";
    preview.innerHTML = "";

    if (skills.length === 0) {

        preview.innerHTML = `
            <span>HTML5</span>
            <span>CSS3</span>
            <span>JavaScript</span>
        `;

        return;
    }

    skills.forEach(skill => {

        const tag =
            document.createElement("span");

        tag.textContent = skill;

        inputTags.appendChild(tag);


        const previewTag =
            document.createElement("span");

        previewTag.textContent = skill;

        preview.appendChild(previewTag);

    });
}


/* ==========================================
   SUMMARY COUNTER
========================================== */

function updateSummaryCount() {

    const summary =
        getValue("summary");

    document.getElementById("summaryCount")
        .textContent = `${summary.length}/500`;
}


/* ==========================================
   EDUCATION
========================================== */

function createEducation() {

    const id = Date.now();

    education.push({
        id,
        degree: "",
        college: "",
        year: "",
        grade: ""
    });

    renderEducation();
    saveData();
}


function renderEducation() {

    const container =
        document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "dynamic-item";

        div.innerHTML = `

            <div class="dynamic-grid">

                <div class="input-group">

                    <label>Degree</label>

                    <input
                        data-id="${item.id}"
                        data-field="degree"
                        value="${item.degree}"
                        placeholder="B.Tech Computer Science"
                    >

                </div>

                <div class="input-group">

                    <label>College / University</label>

                    <input
                        data-id="${item.id}"
                        data-field="college"
                        value="${item.college}"
                        placeholder="University Name"
                    >

                </div>

                <div class="input-group">

                    <label>Year</label>

                    <input
                        data-id="${item.id}"
                        data-field="year"
                        value="${item.year}"
                        placeholder="2026"
                    >

                </div>

                <div class="input-group">

                    <label>CGPA / Percentage</label>

                    <input
                        data-id="${item.id}"
                        data-field="grade"
                        value="${item.grade}"
                        placeholder="7.3 CGPA"
                    >

                </div>

            </div>

            <button
                class="remove-item"
                data-remove-education="${item.id}"
            >
                Remove
            </button>
        `;

        container.appendChild(div);
    });

    updateEducationPreview();
}


function updateEducationPreview() {

    const preview =
        document.getElementById("previewEducation");

    preview.innerHTML = "";

    education.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "preview-item";

        div.innerHTML = `

            <h4>${item.degree || "Degree"}</h4>

            <div class="meta">
                ${item.college || "College / University"}
                ${item.year ? " | " + item.year : ""}
                ${item.grade ? " | " + item.grade : ""}
            </div>
        `;

        preview.appendChild(div);
    });
}


/* ==========================================
   EXPERIENCE
========================================== */

function createExperience() {

    const id = Date.now();

    experiences.push({
        id,
        company: "",
        role: "",
        duration: "",
        description: ""
    });

    renderExperience();
    saveData();
}


function renderExperience() {

    const container =
        document.getElementById("experienceContainer");

    container.innerHTML = "";

    experiences.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "dynamic-item";

        div.innerHTML = `

            <div class="dynamic-grid">

                <div class="input-group">

                    <label>Company</label>

                    <input
                        data-id="${item.id}"
                        data-type="experience"
                        data-field="company"
                        value="${item.company}"
                        placeholder="Company Name"
                    >

                </div>

                <div class="input-group">

                    <label>Role</label>

                    <input
                        data-id="${item.id}"
                        data-type="experience"
                        data-field="role"
                        value="${item.role}"
                        placeholder="Frontend Developer Intern"
                    >

                </div>

                <div class="input-group">

                    <label>Duration</label>

                    <input
                        data-id="${item.id}"
                        data-type="experience"
                        data-field="duration"
                        value="${item.duration}"
                        placeholder="Jan 2025 - Jun 2025"
                    >

                </div>

                <div class="input-group full">

                    <label>Description</label>

                    <textarea
                        data-id="${item.id}"
                        data-type="experience"
                        data-field="description"
                        placeholder="Describe your responsibilities..."
                    >${item.description}</textarea>

                </div>

            </div>

            <button
                class="remove-item"
                data-remove-experience="${item.id}"
            >
                Remove
            </button>
        `;

        container.appendChild(div);
    });

    updateExperiencePreview();
}


function updateExperiencePreview() {

    const preview =
        document.getElementById("previewExperience");

    preview.innerHTML = "";

    experiences.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "preview-item";

        div.innerHTML = `

            <h4>
                ${item.role || "Frontend Developer"}
            </h4>

            <div class="meta">
                ${item.company || "Company Name"}
                ${item.duration ? " | " + item.duration : ""}
            </div>

            <p>
                ${item.description || "Experience description."}
            </p>
        `;

        preview.appendChild(div);
    });
}


/* ==========================================
   PROJECTS
========================================== */

function createProject() {

    const id = Date.now();

    projects.push({
        id,
        name: "",
        tech: "",
        description: "",
        link: ""
    });

    renderProjects();
    saveData();
}


function renderProjects() {

    const container =
        document.getElementById("projectContainer");

    container.innerHTML = "";

    projects.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "dynamic-item";

        div.innerHTML = `

            <div class="dynamic-grid">

                <div class="input-group">

                    <label>Project Name</label>

                    <input
                        data-id="${item.id}"
                        data-type="project"
                        data-field="name"
                        value="${item.name}"
                        placeholder="SkyCast Weather Dashboard"
                    >

                </div>

                <div class="input-group">

                    <label>Technologies</label>

                    <input
                        data-id="${item.id}"
                        data-type="project"
                        data-field="tech"
                        value="${item.tech}"
                        placeholder="HTML, CSS, JavaScript, REST API"
                    >

                </div>

                <div class="input-group full">

                    <label>Description</label>

                    <textarea
                        data-id="${item.id}"
                        data-type="project"
                        data-field="description"
                        placeholder="Describe your project..."
                    >${item.description}</textarea>

                </div>

                <div class="input-group full">

                    <label>Project URL</label>

                    <input
                        data-id="${item.id}"
                        data-type="project"
                        data-field="link"
                        value="${item.link}"
                        placeholder="github.com/username/project"
                    >

                </div>

            </div>

            <button
                class="remove-item"
                data-remove-project="${item.id}"
            >
                Remove
            </button>
        `;

        container.appendChild(div);
    });

    updateProjectPreview();
}


function updateProjectPreview() {

    const preview =
        document.getElementById("previewProjects");

    preview.innerHTML = "";

    projects.forEach(item => {

        const div =
            document.createElement("div");

        div.className = "preview-item";

        div.innerHTML = `

            <h4>
                ${item.name || "Project Name"}
            </h4>

            <div class="meta">
                ${item.tech || "Technologies"}
            </div>

            <p>
                ${item.description || "Project description."}
            </p>

            ${
                item.link
                ? `<div class="meta">${item.link}</div>`
                : ""
            }

        `;

        preview.appendChild(div);
    });
}


/* ==========================================
   DYNAMIC INPUT HANDLING
========================================== */

document.addEventListener("input", event => {

    const target = event.target;

    const id = Number(target.dataset.id);
    const field = target.dataset.field;
    const type = target.dataset.type;

    if (!id || !field) {

        updatePersonalInfo();
        calculateATS();
        saveData();

        return;
    }


    if (!type) {

        const item =
            education.find(x => x.id === id);

        if (item) {

            item[field] = target.value;

            updateEducationPreview();

        }

    } else if (type === "experience") {

        const item =
            experiences.find(x => x.id === id);

        if (item) {

            item[field] = target.value;

            updateExperiencePreview();

        }

    } else if (type === "project") {

        const item =
            projects.find(x => x.id === id);

        if (item) {

            item[field] = target.value;

            updateProjectPreview();

        }
    }

    calculateATS();
    saveData();
});


/* ==========================================
   REMOVE DYNAMIC ITEMS
========================================== */

document.addEventListener("click", event => {

    const target = event.target;


    if (target.dataset.removeEducation) {

        const id =
            Number(target.dataset.removeEducation);

        education =
            education.filter(item => item.id !== id);

        renderEducation();
        saveData();
    }


    if (target.dataset.removeExperience) {

        const id =
            Number(target.dataset.removeExperience);

        experiences =
            experiences.filter(item => item.id !== id);

        renderExperience();
        saveData();
    }


    if (target.dataset.removeProject) {

        const id =
            Number(target.dataset.removeProject);

        projects =
            projects.filter(item => item.id !== id);

        renderProjects();
        saveData();
    }

});


/* ==========================================
   PHOTO UPLOAD
========================================== */

document.getElementById("photo")
    .addEventListener("change", event => {

        const file = event.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = function(e) {

            photoData = e.target.result;

            showPhoto(photoData);

            saveData();
        };

        reader.readAsDataURL(file);
    });


function showPhoto(src) {

    document.getElementById("photoPreview").innerHTML =
        `<img src="${src}" alt="Profile">`;

    document.getElementById("previewPhoto").innerHTML =
        `<img src="${src}" alt="Profile">`;
}


document.getElementById("removePhoto")
    .addEventListener("click", () => {

        photoData = "";

        document.getElementById("photoPreview")
            .innerHTML = "👤";

        document.getElementById("previewPhoto")
            .innerHTML = "👤";

        saveData();
    });


/* ==========================================
   TEMPLATE SWITCH
========================================== */

document.querySelectorAll(".template")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".template")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            selectedTemplate =
                button.dataset.template;

            const resume =
                document.getElementById("resumePreview");

            resume.className =
                `resume ${selectedTemplate}`;

            saveData();

        });

    });


/* ==========================================
   ATS ANALYZER
========================================== */

const frontendKeywords = [
    "html",
    "css",
    "javascript",
    "react",
    "responsive",
    "git",
    "github",
    "api",
    "rest",
    "frontend",
    "ui",
    "ux",
    "bootstrap",
    "typescript",
    "tailwind",
    "dom",
    "localstorage",
    "debugging"
];


function calculateATS() {

    const text = [

        getValue("name"),
        getValue("jobTitle"),
        getValue("summary"),
        getValue("skills"),
        getValue("github"),
        getValue("linkedin"),

        education
            .map(x =>
                `${x.degree} ${x.college}`
            )
            .join(" "),

        experiences
            .map(x =>
                `${x.role} ${x.description}`
            )
            .join(" "),

        projects
            .map(x =>
                `${x.name} ${x.tech} ${x.description}`
            )
            .join(" ")

    ]
        .join(" ")
        .toLowerCase();


    let found = 0;

    const keywordList =
        document.getElementById("keywordList");

    keywordList.innerHTML = "";


    frontendKeywords.forEach(keyword => {

        const exists =
            text.includes(keyword);

        if (exists) found++;

        const span =
            document.createElement("span");

        span.className =
            exists
            ? "keyword found"
            : "keyword missing";

        span.textContent =
            exists
            ? `✓ ${keyword}`
            : `○ ${keyword}`;

        keywordList.appendChild(span);

    });


    let score =
        Math.round(
            (found / frontendKeywords.length) * 100
        );


    /* Basic completeness bonus */

    let completeness = 0;

    if (getValue("name")) completeness += 5;
    if (getValue("email")) completeness += 5;
    if (getValue("summary")) completeness += 5;
    if (education.length) completeness += 5;
    if (projects.length) completeness += 5;

    score =
        Math.min(100, score + completeness);


    document.getElementById("atsScore")
        .textContent = score;


    if (score >= 80) {

        document.getElementById("scoreTitle")
            .textContent = "Strong Resume";

        document.getElementById("scoreMessage")
            .textContent =
            "Your resume contains many relevant frontend keywords.";

    } else if (score >= 60) {

        document.getElementById("scoreTitle")
            .textContent = "Good Start";

        document.getElementById("scoreMessage")
            .textContent =
            "Add more relevant skills and project details.";

    } else {

        document.getElementById("scoreTitle")
            .textContent = "Needs Improvement";

        document.getElementById("scoreMessage")
            .textContent =
            "Add your projects, skills, summary and education.";

    }
}


/* ==========================================
   LOCAL STORAGE
========================================== */

function saveData() {

    const data = {

        fields: {},

        education,
        experiences,
        projects,

        selectedTemplate,
        photoData

    };


    fields.forEach(field => {

        data.fields[field] =
            getValue(field);

    });


    localStorage.setItem(
        "resumeCraftData",
        JSON.stringify(data)
    );

    showToast("Saved automatically");
}


function loadData() {

    const saved =
        localStorage.getItem("resumeCraftData");

    if (!saved) {

        createEducation();
        createProject();

        return;
    }


    const data =
        JSON.parse(saved);


    if (data.fields) {

        fields.forEach(field => {

            const element =
                document.getElementById(field);

            if (element &&
                data.fields[field] !== undefined) {

                element.value =
                    data.fields[field];

            }

        });

    }


    education =
        data.education || [];

    experiences =
        data.experiences || [];

    projects =
        data.projects || [];

    selectedTemplate =
        data.selectedTemplate || "classic";

    photoData =
        data.photoData || "";


    if (photoData) {

        showPhoto(photoData);

    }


    document
        .querySelectorAll(".template")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.template === selectedTemplate
            );

        });


    document.getElementById("resumePreview")
        .className =
        `resume ${selectedTemplate}`;


    renderEducation();
    renderExperience();
    renderProjects();

    updatePersonalInfo();
    calculateATS();
}


/* ==========================================
   DARK MODE
========================================== */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "resumeCraftTheme",
        dark ? "dark" : "light"
    );

    themeBtn.textContent =
        dark ? "☀️" : "🌙";
});


function loadTheme() {

    const theme =
        localStorage.getItem("resumeCraftTheme");

    if (theme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";
    }
}


/* ==========================================
   ZOOM
========================================== */

function updateZoom() {

    const resume =
        document.getElementById("resumePreview");

    resume.style.transform =
        `scale(${zoom / 100})`;

    document.getElementById("zoomValue")
        .textContent = `${zoom}%`;
}


document.getElementById("zoomIn")
    .addEventListener("click", () => {

        if (zoom < 120) {

            zoom += 10;

            updateZoom();
        }
    });


document.getElementById("zoomOut")
    .addEventListener("click", () => {

        if (zoom > 60) {

            zoom -= 10;

            updateZoom();
        }
    });


/* ==========================================
   PDF DOWNLOAD
========================================== */

function downloadPDF() {

    const element =
        document.getElementById("resumePreview");

    const name =
        getValue("name", "My-Resume")
            .replace(/\s+/g, "-");


    const options = {

        margin: 0,

        filename:
            `${name}-Resume.pdf`,

        image: {
            type: "jpeg",
            quality: 0.98
        },

        html2canvas: {
            scale: 2,
            useCORS: true
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
        }

    };


    html2pdf()
        .set(options)
        .from(element)
        .save();
}


document.getElementById("downloadBtn")
    .addEventListener("click", downloadPDF);


document.getElementById("downloadBottom")
    .addEventListener("click", downloadPDF);


/* ==========================================
   CLEAR
========================================== */

document.getElementById("clearBtn")
    .addEventListener("click", () => {

        const confirmClear =
            confirm(
                "Are you sure you want to clear your resume?"
            );

        if (!confirmClear) return;

        localStorage.removeItem(
            "resumeCraftData"
        );

        location.reload();
    });


/* ==========================================
   TOAST
========================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 1200);
}


/* ==========================================
   BUTTONS
========================================== */

document.getElementById("addEducation")
    .addEventListener("click", createEducation);

document.getElementById("addExperience")
    .addEventListener("click", createExperience);

document.getElementById("addProject")
    .addEventListener("click", createProject);


/* ==========================================
   START APPLICATION
========================================== */

loadTheme();
loadData();
updateZoom();
calculateATS();