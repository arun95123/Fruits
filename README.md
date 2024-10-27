## Deployed Version

The app is deployed using netlify. The hosted url is
https://glistening-druid-e01f1c.netlify.app/

## Run in Local

The easiest way to run this project is to install install netlify locally and then run the app
```
    npm install netlify-cli -g
    netlify dev
```

The reason to do this is because of the CORS issue with the hosted api.
So a netlify express function has been created to make the api call from server.

If you want to run the project without Netlify
- change `App.tsx` line 19 to
```
    const response = await getDirectFruits()
```
- then run create react app
```
    npm start
```
- then disable CORS in your browser to get the app working