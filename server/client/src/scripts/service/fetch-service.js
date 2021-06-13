sendRequest = (url, options, successCallback, errorCallback) => {
    fetch(url, options)
        .then(response => response.json())
        .then(response => successCallback(response))
        .catch(error => errorCallback(error));
};

const handleError = (error) => {
    console.log(error);
    // const errors = document.getElementById('errors');
    // errors.innerHTML = error.error.toString();
}