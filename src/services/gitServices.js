const API = 'https://api.github.com';

const getRepositories = async (searchTerm) => {
    let repos = [];
    await fetch(`${API}/users/${searchTerm}/repos`).then( async (response) => {        
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
    
          // Examine the text in the response
          await response.json().then(function(data) {
            repos = data;
          });
    })
    return repos;
};

export default { 
    getRepositories
};