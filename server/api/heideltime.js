angular.module('pteraformer').service('HeideltimeService', function($http) {
  var heideltimeUrl = "http://localhost:9009";
  this.getParse = function(text, language) {
    if (!language)
      language = 'ENGLISH';
    return $http({
      method: "POST",
      url: heideltimeUrl,
      data: {
        q: text,
        l: language
      }
    });
  };
});
/**
  this.getParse = function(text, language) {
    //console.log("in GetParse: ");
    //console.log(callback);
    if (language === undefined || language === null)
      language = "ENGLISH";
    // create a temporary file
    var tempFile = Temp.openSync('ht_ptera');
    console.log(tempFile);
    fs.writeFileSync(tempFile.path, text);
    console.log(execSync);
    var stdout = execSync('/usr/bin/java -jar ~/heideltime-standalone/de.unihd.dbs.heideltime.standalone.jar -l '+language+' -c ~/heideltime-standalone/config.props '+tempFile.path);
    Temp.cleanupSync(function(err,stats) {
    });
    return stdout;
  };
});
**/
/**
    Temp.track();
    Temp.open('ht_ptera', function(err,tempFile) {
      if (!err) {
        fs.write(tempFile.fd, text);
        fs.close(tempFile.fd, function(err) {
          exec('/usr/bin/java -jar ~/heideltime-standalone/de.unihd.dbs.heideltime.standalone.jar -l '+language+' -c ~/heideltime-standalone/config.props '+tempFile.path, function(err, stdout) {
            //console.log(err);
            //console.log(stdout.trim());
            var resp = {'timeml': stdout.trim()};
            //console.log(resp);
            //console.log(callback);
            if (callback) {
              callback(resp);
            }
            Temp.cleanupSync(function(err,stats) {
            });
          });
        })
      }
    });
  };
});
**/
