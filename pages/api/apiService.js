const baseURL = "https://boyd-granville-backend.herokuapp.com";

export async function getUsersStarred(username) {
    const resp = await fetch(`${baseURL}/user/starred?username=${username}`, {
        method: 'GET'
    });
    return (await resp.text()).split('\n');
}

// export async function getUsersRepos(username) {
//     const resp = await fetch(`${baseURL}/user/repos?username=${username}`, {
//         method: 'GET'
//     });
//     return await resp.text();
// }

// export async function getReposLatestCommit(owner, repo) {
//     const resp = await fetch(`${baseURL}/repo/commits?owner=${owner}&repo=${repo}`, {
//         // const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
//         method: 'GET'
//     });
//     return await resp.json();
// }

// export async function searchForRepos(keyword, language) {
//     const resp = await fetch(`${baseURL}/repo/search?keyword=${keyword}&language=${language}`, {
//         method: 'GET'
//     });
//     return await resp.text();
// }

export async function getAllRepoInfo(owner, repo) {
    const resp = await fetch(`${baseURL}/repo/allInfo?owner=${owner}&repo=${repo}`, {
        method: 'GET'
    });
    return (await resp.text()).split('\n');
}

export async function getRecommendedRepos(username, pageNumber) {
    const resp = await fetch(`${baseURL}/repo/recommendations?username=${username}&pageNumber=${pageNumber}`, {
        method: 'GET'
    });
    return (await resp.text()).split('\n');
}

export async function getUserInfo(username) {
    const resp = await fetch(`${baseURL}/user/info?username=${username}`, {
        method: 'GET'
    });
    return (await resp.json());
}

export async function getFollowers(username) {
    const resp = await fetch(`${baseURL}/user/followers?username=${username}`, {
        method: 'GET'
    });
    return await resp.json();
}

export async function getFollowing(username) {
    const resp = await fetch(`${baseURL}/user/following?username=${username}`, {
        method: 'GET'
    });
    return await resp.json();
}

export async function postUser(username, email, topics) {
    const formData = new FormData();

    var t = "";
    topics.forEach(element => {
        t += element + " ";
    });
    t = t.trim();

    let user = {
        "username": username,
        "email": email,
        "topics": t
    }
    formData.append("user", JSON.stringify(user));

    return fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {  },
        body: formData
    });

}