Meteor.startup(function () {
  if (UserData.find().count() === 0) {
/**
    var userdata = [
      {'_id': 1,
        'description': 'Fast just got faster with Nexus S.'},
      {'name': 'All dubstep all the time',
        'description': 'Get it on!'},
      {'name': 'Savage lounging',
        'description': 'Leisure suit required. And only fiercest manners.'}
    ];
    for (var i = 0; i < userdata.length; i++)
      UserData.insert({name: parties[i].name, description: parties[i].description});
**/
  }
});
angular.bootstrap(['pteraformer']);
