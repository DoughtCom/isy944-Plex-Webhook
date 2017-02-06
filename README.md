# isy944-Plex-Webhook

In order to run this app:
 
- Install [node.js](https://nodejs.org/en/).
- Clone the repository.
- Install dependencies using `npm install`.
- Setup your config file, notes below.
- Run the app via command line: 

```
node index.js
```

## To Configure config.json
 
- isyUsername = Your username for logging into the ISY's admin console
- isyPassword = Your password for logging into the ISY's admin console
- isyBaseUrl = The base protocol and IP/Domain Name for your ISY944 followed by "/rest/nodes/" for the ISY's REST API
- eventGroups - name = Friendly Name for logging and keeping track of config
- eventGroups - device = Plex ID for your player making the webhook call, the app will log to console any device that's not in the system for easy configuration.
- eventGroups - playActions, pauseActions, stopActions = Array of Scene and Device IDs (easiest to see the supplied config for examples)
 
## Other Configuration Information
- Add the webhook to https://app.plex.tv/web/app#!/account/webhooks (example http://192.168.1.208:12000)
- Read other options when configuring your Scene and Device actions here: https://wiki.universal-devices.com/index.php?title=ISY_Developers:API:REST_Interface#Commands

## Authors

* **Shawn Wickam** - *Initial Fork* - [Linkedin](https://www.linkedin.com/in/shawn-wickam-aa127a6)

## Acknowledgments

* Thanks to Elan Feingold and his [project](https://github.com/plexinc/webhooks-home-automation) for the initial start for this.