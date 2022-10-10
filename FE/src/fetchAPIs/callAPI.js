let objFetch = {};

function callAPI(method, path, data) {
  if (method === "GET" || method === "DELETE") {
    objFetch = { method };
  } else {
    objFetch = {
      method,
      body: data,
    };
  }
  return new Promise((resolve, reject) => {
    const url = "http://localhost:3001/items" + path;
    fetch(url, objFetch)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
}

export default callAPI;
