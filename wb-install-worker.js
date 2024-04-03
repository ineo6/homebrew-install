const nodes = {
  '/brew.sh': {
    list: [
      "https://gitee.com/ineo6/homebrew-install/raw/master/install.sh",
      "https://raw.githubusercontent.com/ineo6/homebrew-install/master/install.sh"
    ]
  }
}

function reverse(promise) {
  return new Promise((resolve, reject) => Promise.resolve(promise).then(reject, resolve));
}

function promiseAny(iterable) {
  return reverse(Promise.all([...iterable].map(reverse)));
};

async function contactServer(server) {
  return new Promise((resolve, reject) => {
    fetch(server, {
      method: "GET"
    }).then(response => {
      resolve({
        "server": server,
      });
    }).catch(function (error) {
      reject(error);
    });
  });
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});


async function forwardRequestGET(apiURL) {
  return new Promise((resolve, reject) => {
    fetch(apiURL, {
      method: "GET",
      redirect: "follow"
    }).then(response => {
      resolve(response.text());
    }).catch(function (error) {
      reject(error);
    });
  });
}

async function handleRequest(event) {
  const request = event.request;
  const method = request.method.toUpperCase();

  const urlStr = request.url
  const urlObj = new URL(urlStr)

  if (urlObj.pathname) {
    const scriptConfig = nodes[urlObj.pathname]
    if (scriptConfig && scriptConfig.list) {
      return await proxyRequest(request, scriptConfig.list)
    }
  }

  return Response.redirect('https://brew.idayer.com', 302)
}


/**
 * Respond to the request
 * @param {Request} request
 */
async function proxyRequest(request, nodeList) {
  const country = request.headers.get('cf-ipcountry');
  const servers = [];
  for (const server of nodeList) {
    servers.push(contactServer(server));
  }
  const load = await promiseAny(servers);
  const forwardedURL = load['server'];
  const method = request.method.toUpperCase();
  let result;
  let res;

  try {
    if (method === "GET") {
      result = await forwardRequestGET(forwardedURL);
    }
    res = new Response(result, { status: 200 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set("Origin", load['server']);
    res.headers.set("Country", country);
  } catch (e) {
    res = new Response('get script error, please try again.', { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set("Origin", load['server']);
    res.headers.set("Country", country);
    res.headers.set("Error", JSON.stringify(e));
  }
  return res;
}
