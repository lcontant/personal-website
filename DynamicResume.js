var resumeData = {};
async function getResumeData() {
    let currentLanguage = 'fr';
    if (document.location.href.toLowerCase().indexOf('en') !== -1) {
        currentLanguage = 'en';
    }
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
            <div class="job timeline-item">
                <div class="timeline-content">
                <div class="job-title">${job.position} at ${job.name}</div>
                <div class="job-dates">${job.startDate} - ${job.endDate || 'Present'}</div>
                <div class="job-summary">${job.summary}</div>
                <ul class="job-highlights">
                    ${job.highlights.map(highlight => {
                        if (highlight.toLowerCase().includes('tech stack')) {
                            return `<li><b>${highlight}</b></li>`;
                        } else {
                            return `<li>${highlight}</li>`;
                        }
                    }).join('')}
                </ul>
                </div>
            </div>
        `;
    }
    document.getElementById('work-experience').innerHTML = workExperienceHTML;
}

function renderEducation() {
    let educationHTML = '';
    for (let edu of resumeData.education) {
        educationHTML += `
            <div class="education timeline-item">
                <div class="institution"> ${edu.endDate} - ${edu.institution} - ${edu.area} </div>
                <div class="degree">${edu.studyType}</div>
            </div>
        `;
    }
    document.getElementById('education').innerHTML = educationHTML;
}

function renderProjects() {
    let projectsHTML = '';
    for (let project of resumeData.projects) {
        projectsHTML += `
            <div class="project timeline-item">
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
