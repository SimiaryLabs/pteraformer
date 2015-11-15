Meteor.startup(function () {
  if (Documents.find().count() === 0) {
    var documents = [
      { '_id': "1",
        'corpus': "1",
        'rawText': "The Somali Ministry of Information, Posts and Telecommunications started the process of distributing 6,000 hand-held radios to Internally Displaced Persons (IDPs) in Mogadishu. In the first batch, the Ministry handed out 1,000 radios at Badbado camp, Somalia's largest IDP camp. The radios were received by to those most in need: namely, female-headed households, elderly and youth groups.",
        'properties': {
          '@context': 'http://schema.org/',
          '@type': 'CreativeWork',
          'name': 'Document 1'
        }
      },
      { '_id': "2",
        'corpus': "1",
        'rawText': "A new wave of battle-hardened \"lone wolf\" terrorists is expected to infiltrate Britain and the US from African and other war zones to carry out attacks, according to security experts. British and American Somalis currently fighting alongside Islamist rebels in Somalia are expected to pose a serious threat upon their return from Africa, training others in the techniques they learnt on the battlefield and in terrorist training camps.",
        'properties': {
          '@context': 'http://schema.org/',
          '@type': 'CreativeWork',
          'name': 'Document 2'
        }
      },
      { '_id': "3",
        'corpus': "1",
        'rawText': "Other reports indicated pro-Somali government soldiers backed by the Kenya forces were advancing to a new al Shabaab stronghold in the Gedo region of southwestern Somalia. Al Shabaab fighters in Burdubo village were also reported to be vacating from the area as the military exercises intensified in the past few weeks in Gedo region. Meanwhile, Kenya has bought three helicopter gunships from Russia and eight reconnaissance vehicles to boost its war abilities.",
        'properties': {
          '@context': 'http://schema.org/',
          '@type': 'CreativeWork',
          'name': 'Document 3'
        }
      },
      { '_id': "4",
        'corpus': "2",
        'rawText': "Joan Finnigan was born in and raised in Ottawa. She was the daughter of Frank Finnigan, an Ottawa Senators' hockey legend, and mother Maye Horner, and the sister of Frank Jr, Norma and Ross Finnigan.[1] She was educated at Lisgar Collegiate, Carleton University and Queen’s University. Together with her husband, Grant Mackenzie, whom she married in 1949, Finnigan had three children, Jonathan, Roderick and Martha Mackenzie.\nMacKenzie died in 1965 and Ms. Finnigan raised the children as a single mother, while supporting the family through her writing. Her daughter Martha recalls as a child falling asleep to the sound of the typewriter at night.[2] Finnigan died in Ottawa on August 12, 2007 at the age of 81. She was survived by her three children and seven grandchildren.",
        'properties': {
          '@context': 'http://schema.org/',
          '@type': 'CreativeWork',
          'name': 'Joan Finnigan'
        }
      },
      { '_id': "5",
        'corpus': "2",
        'rawText': "Chalair Aviation, previously Chalair, is an airline with its head office on the grounds of Caen – Carpiquet Airport in Carpiquet, France.[1] It provides scheduled services with the A5 Airlinair code under a franchise agreement, using Beechcraft turboprops, as well as corporate shuttle services, freight (including toxic and corrosive material), business and sanitary flights, pilot certification and training, aircraft management and engineering, noticeably in La Réunion and neighboring islands (such as a rather epic landing on a beach in Tromelin Island, as can be seen from the company's website), and JAR Part 145 maintenance services. Its base is Caen. The airline now employs a total 42 persons, among them 27 are pilots, and plans to fly 35,000 scheduled passengers in 2007. They are the only airline to offer flights to Annecy.\nStarting 1997, besides business and freight flights, Chalair Aviation began operating a Fairchild Swearingen Metroliner for scheduled flights between Le Mans and Eindhoven and an ATR 42 between Cherbourg and Orly, with their own IATA code, M6, abandoned since — but a new designator is expected soon.",
        'properties': {
          '@context': 'http://schema.org/',
          '@type': 'CreativeWork',
          'name': 'Joan Finnigan'
        }
      }
    ];
    for (var i = 0; i < documents.length; i++)
      Documents.insert(documents[i]);
  }
  if (Corpora.find().count() === 0) {
    var corpora = [
      { '_id': "1",
        'owner': "public",
        'properties': {
          '@context': 'http://schema.org',
          'name': 'CLAVIN sample docs'
        }
      },
      { '_id': "2",
        'owner': "public",
        'properties': {
          '@context': 'http://schema.org',
          'name': 'Wiki samples'
        }
      }
    ];
    for (var i = 0; i < corpora.length; i++)
      Corpora.insert(corpora[i]);
  }
  if (UserData.find().count() === 0) {
    var userdata = [
      { '_id': "public",
        'username': "_public",
        'name': "Public datasets"
      }
    ];
    for (var i = 0; i < userdata.length; i++)
      UserData.insert(userdata[i]);
  }
});
angular.bootstrap(['pteraformer']);
