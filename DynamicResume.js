var resumeData = {};
async function getResumeData() {
    let currentLanguage = 'en';
    let resumeDataFileName = `CV_${currentLanguage}_standard.json`;
    let response = await fetch(resumeDataFileName,  {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Origin': 'http://localhost',
        }
    });
    let data = await response.json();
    resumeData = data;
    renderContactInfo();
    renderSummary();
    renderWorkExperience();
    renderEducation();
    renderProjects();
}

function renderContactInfo() {
    let contactInfo = `
        <div>Email: ${resumeData.basics.email}</div>
        <div>Phone: ${resumeData.basics.phone}</div>
        <div>Location: ${resumeData.basics.location.city}, ${resumeData.basics.location.region}, ${resumeData.basics.location.countryCode}</div>
    `;
    document.getElementById('contact-info').innerHTML = contactInfo;
}

function renderSummary() {
    document.getElementById('summary').innerText = resumeData.basics.summary;
}

function renderWorkExperience() {
    let workExperienceHTML = '';
    for (let job of resumeData.work) {
        workExperienceHTML += `
            <div class="job">
                <div class="job-title">${job.position} at ${job.name}</div>
                <div class="job-dates">${job.startDate} - ${job.endDate || 'Present'}</div>
                <div class="job-summary">${job.summary}</div>
                <ul class="job-highlights">
                    ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    document.getElementById('work-experience').innerHTML = workExperienceHTML;
}

function renderEducation() {
    let educationHTML = '';
    for (let edu of resumeData.education) {
        educationHTML += `
            <div class="education">
                <div class="education-institution">${edu.institution}</div>
                <div class="education-area">${edu.area}</div>
                <div class="education-studyType">${edu.studyType}</div>
                <div class="education-endDate">${edu.endDate}</div>
            </div>
        `;
    }
    document.getElementById('education').innerHTML = educationHTML;
}

function renderProjects() {
    let projectsHTML = '';
    for (let project of resumeData.projects) {
        projectsHTML += `
            <div class="project">
                <div class="project-name">${project.name}</div>
                <div class="project-description">${project.description}</div>
                <ul class="project-highlights">
                    ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
                <div class="project-url"><a href="${project.url}">${project.url}</a></div>
            </div>
        `;
    }
    document.getElementById('projects').innerHTML = projectsHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    getResumeData();
});
