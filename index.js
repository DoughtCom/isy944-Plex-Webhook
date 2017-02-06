var express = require('express')
  , request = require('request')
  , multer  = require('multer')
  , config = require('./device-config.json');;

var app = express();
var upload = multer({ dest: '/tmp/' });

for (var i = 0; i < config.eventGroups.length; i++) {
  console.log('Config Loaded for: ' + config.eventGroups[i].name);
  console.log('    With ' + config.eventGroups[i].playActions.length + ' Play Actions');
  console.log('    With ' + config.eventGroups[i].pauseActions.length + ' Pause Actions');
  console.log('    With ' + config.eventGroups[i].stopActions.length + ' Stop Actions');
}

app.post('/', upload.single('thumb'), function (req, res, next) {
  var payload = JSON.parse(req.body.payload);
  console.log('Got webhook for', payload.event);

  if (payload.Metadata.type != 'track') {
    var eventGroup = config.eventGroups.find(function(item) { return item.device === payload.Player.uuid; });

    if (eventGroup == null)
      console.log('Device ' + payload.Player.uuid + ' Not Configured');
    else {
      if (payload.event === 'media.play' || payload.event === 'media.resume') {
        console.log('Play Media - Group: ' + eventGroup.name);

        for (var i = 0; i < eventGroup.playActions.length; i++) {
          console.log(config.isyBaseUrl + eventGroup.playActions[i]);
          request.get(config.isyBaseUrl + eventGroup.playActions[i]).auth(config.isyUsername, config.isyPassword, false);
        }
      } else if (payload.event === 'media.pause') {
        console.log('Pause Media - Group: ' + eventGroup.name);

        for (var i = 0; i < eventGroup.pauseActions.length; i++) {
          request.get(config.isyBaseUrl + eventGroup.pauseActions[i]).auth(config.isyUsername, config.isyPassword, false);
        }
      } else if (payload.event === 'media.stop') {
        console.log('Stopped Media - Group: ' + eventGroup.name);

        for (var i = 0; i < eventGroup.stopActions.length; i++) {
          request.get(config.isyBaseUrl + eventGroup.stopActions[i]).auth(config.isyUsername, config.isyPassword, false);
        }
      }
    }
  }

  res.sendStatus(200);
});

app.listen(12000);
