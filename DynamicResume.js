var resumeData = {};
async function getResumeData() {
    let resumeDataFileName = `CV_${currentLanguage}_standard.json`;
    let response = await fetch(resumeDataFileName);
    let data = response.json();
    resumeData = data;
    let jobId = 0;
    for (let jsonJob of resumeData.work) {
        let job = {
            id: jobId++,
            job: jsonJob
        };
        jobs.push(job);
    }
}

async function renderContactInfo() {
    let address = resumeData.basics.location.CountryCode + ',' + resumeData.basics.location.region + ',' + resumeData.location.City;
}

function renderJob() {

}

document.addEventListener('DOMContentLoaded', () => {
    getResumeData();
    renderContactInfo();
    renderJob();
});
