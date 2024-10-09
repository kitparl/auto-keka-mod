# Bypassing CORS Restrictions for HR Portal API

## Overview

While working with the Keka (HR portal) API, I encountered Cross-Origin Resource Sharing (CORS) issues that prevented me from making API calls directly from my browser. This document outlines the steps I took to resolve the CORS issue by adding another server and modifying CORS settings.

## What is CORS?

CORS is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. This restriction is in place to prevent malicious websites from accessing sensitive information from other sites.

### CORS Error Example

When attempting to call the Keka API directly from the browser, I received the following error message:

![access_from_origin_null_has_been_blocked](https://github.com/user-attachments/assets/ca750b04-fe1d-4ae3-802c-63fb28df7462)

This message indicates that the browser is blocking the request due to CORS policy.

## Steps to Bypass CORS Restrictions

1. **Identifying the Problem**:
   - Initially, I was unable to access the Keka HR portal API due to CORS restrictions, which resulted in failed API requests.

2. **Adding an Additional Server**:
   - To circumvent the CORS issue, I set up an additional server. This server would act as a proxy between my client application and the Keka API.

3. **Modifying CORS Settings**:
   - I configured the additional server to remove CORS restrictions. This involved setting the appropriate headers to allow cross-origin requests.

   For example, I added the following headers to the server response:

   ```http
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, POST, PUT, DELETE
   Access-Control-Allow-Headers: Content-Type
   
## Story behind the scene

When I was at my first company, the HR department introduced restrictions on daily login settings. We could only log in within a 300-meter radius, and it was required to log in through a mobile application. If we were late, the system would mark us as late, and if it happened more than three times, our paid leaves would be deducted.

We techies took this seriously, as I didn’t want to compromise my data by installing their app, which requested unusual access permissions. To avoid that, we started looking into the APIs and discovered multiple endpoints. Finding the mobile endpoints was a bit challenging, but we managed to crack it.

After that, life became much easier. With a single link, we were able to log in and log out from anywhere in the world😂.
