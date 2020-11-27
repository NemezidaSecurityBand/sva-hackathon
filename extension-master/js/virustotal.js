const apiKey = "424c20f594d7d9e90efe346d16e269b7f54fe422b3ecdd18b78d0caf4dc059bc";
const baseUrl = "https://www.virustotal.com/vtapi/v2/url/";
const apiKeyHeaderName = "x-apikey";


function scanUrl(url, ok, error) {
   const xhr = new XMLHttpRequest();

   xhr.open("POST", baseUrl + 'scan', true);
   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   xhr.setRequestHeader(apiKeyHeaderName, apiKey);

   xhr.onreadystatechange = function () {
     if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status !== 200) {
            error();
        } else {
           const res = JSON.parse(this.responseText);

           if (res.status !== 1) {
               error();
           } else {
               waitForResult(res.scan_id, url, ok, error);
           }
        }
     }
   }

   xhr.send(`apikey=${apiKey}&url=${url}`);
}


function waitForResult(scanId, url, ok, error) {
    const xhr = new XMLHttpRequest();
  
    xhr.open("GET", baseUrl + 'report', true);
    xhr.setRequestHeader(apiKeyHeaderName, apiKey);
 
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
         if (this.status === 404) {
            setTimeout(function () { waitForResult(scanId, url, ok, error) }, 10000);    
         } else if (this.status !== 200) {
            error();
         } else {
            const res = JSON.parse(this.responseText);
            if (res.status !== 1) {
                error();
            } else if (res.positives !== 0) {
                ok(true);
            } else {
                ok(false)
            }
         }
      }
    }
 
    xhr.send(`apikey=${apiKey}&resource=${url}&scanId=${scanId}`);
}