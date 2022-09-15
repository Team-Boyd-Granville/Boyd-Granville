const baseURL = "http://localhost:8080";

export async function getUsersStarred(username) {
    const resp = await fetch(`${baseURL}/user/starred?username=${username}`, {
        method: 'GET'
    });
    return await resp.text();
}

export async function getUsersRepos(username) {
    const resp = await fetch(`${baseURL}/user/repos?username=${username}`, {
        method: 'GET'
    });
    return await resp.text();
}

export async function getReposLatestCommit(owner, repo) {
    const resp = await fetch(`${baseURL}/repo/commits?owner=${owner}&repo=${repo}`, {
        method: 'GET'
    });
    return await resp.text();
}