let currentLanguage = document.location.pathname.toLowerCase().includes('en') ? 'en' : 'fr';
let resumeData = {};
let jobs = [];
let personalProjects = [];
document.addEventListener('DOMContentLoaded', () => {
    let resumeDataFileName = `CV_${currentLanguage}_standard.json`;
    fetch(resumeDataFileName)
        .then(response => response.json())
        .then(data => {
            resumeData = data;
            let jobId = 0;
            let taskId = 0;
            let techStackId = 0;
            for (let job of resumeData.experience) {
                job.id = jobId++;
                let techStack = [];
                let accomplishments = [];
                for (let task of job.tasks) {
                    task.id = taskId++;
                    accomplishments.push({
                        id: taskId,
                        description: task
                    });
                }
                for (let techStack of job.techStack) {
                    techStack.id = techStackId++;
                    techStack.push({
                        id: techStackId,
                        tech: techStack
                    });
                }
                let jobData = {
                    id: job.id,
                    title: job.role,
                    logo: job.logo,
                    company: job.company,
                    duration: job.duration,
                    accomplishments: accomplishments,
                    techStack: techStack
                };
                jobs.push(jobData);
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
});
function setAccomplishement(jobId, accomplishment, index) {
}