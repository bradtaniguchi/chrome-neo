angular.module('chrome-neo').constant("constants", {
  "NEOWS_BASE_URL" : "https://api.nasa.gov/neo/rest/v1/feed",
  "ASTERANK_BASE_URL": "http://www.asterank.com/api/asterank",
  /*This should be kept save, but meh, for science!*/
  "API_KEY" : "ICzn1y9k7kZGjpJb91uaOGxnaKM8zHc7Pnzu2lg5",
  "MOMENT_FORMAT" : "YYYY-MM-DD"
});

/*These are definitions that are specified by nasa for what
these fields actually mean, used for tooltip popup helps*/
angular.module('chrome-neo').constant("queryFields", {
  "sigma_tp": "Time of perihelion passage sigma",
  "diameter":"Estimated object diameter",
  "tp":"time of perihelion passage", //done
  "epoch_mjd":"Epoch in Modified Julian Date", //done
  //"ad":, //?
  "producer":"Who computed the orbit", //done
  "rms": "Root Mean square",//done
  //"H_sigma":0.66439, //??
  "closeness":4.659571917281135,
  "spec":"SMASSII Spectral type value",
  /*"K2":"",
  "K1":"",
  "M1":"",
  "n_dop_obs_used":"",*/
  "full_name":"Name given by GPL",
  //"M2":"",
  "prov_des":"2001 AE2",
  "equinox":"J2000",
  //"DT":"",
  "diameter_sigma":"Diameter sigma",
  //"saved":-8641518801655.289,
  //"albedo":"",
  //"moid_ld":90.96226078,
  "two_body":"",
  "neo":"If the body is classified as an NEO",
  "prefix":"",
  //"sigma_ad":3.3626e-09,
  //"score":3.4508560938390502e-06,
  "data_arc":10120.0,
  "profit":2146841.445758379,
  "sigma_q":"Sigma value of q perihelion distance",
  "sigma_w":"Sigma value of perihelion degree sigma",
  "epoch":"Orbital elements defined at this epoch",
  "per":"Orbital Period",
  "id":"Id type",
  /*"A1":"",
  "PC":"",
  "A3":"",
  "A2":"",*/
  //"per_y":1.5680470070083,
  //"n_opp":"",
  //"epoch_cal":20130418.0,
  "orbit_id":"Orbit id ",
  /*"sigma_a":3.1086e-09,
  "sigma_om":0.00014823,
  "price":17254280.46919525,
  "sigma_e":4.2218e-08,*/
  //"condition_code":0.0,
  "rot_per":"Rotation period",
  //"G":"",
  "last_obs":"Last Observed date",
  //"H":19.032,
  //"pha":"N",
  //"IR":"",
  //"inexact":true,
  //"spec_T":"",
  //"tp_cal":20131229.5250111,
  //"n_obs_used":381.0,
  //"moid":0.233734,
  //"extent":"",
  //"dv":4.057,
  //"ma":199.3848106194188,
  //"GM":"",
  //"pdes":138911.0,
  "class":"AMO",
  "a": "Semi Major Access, in AU units", //done
  "t_jup":"Jupiter tisserand invarient",
  //"om":171.4867878184716, //node?
  "e": "eccentricity",//done
  "name":"offical name given by NASA", //done
  "i": "inclination, in degrees",
  //"sigma_per":1.9787e-06,
  //"BV":"",
  "n":"Mean Motion",
  "q": "perihelion distance, in AU units", //done
  "sigma_i":"Inclination sigma",
  "w": "Argument of perihelion in deg", //?
  //"sigma_ma":2.7756e-05,
  "first_obs":"	date of first observation used in the fit", //donechro
  "n_del_obs_used":"",
  //"sigma_n":2.1716e-09,
  //"spkid":2138911.0,
  "spkid" : "Small Body Database ID",
  //"UB":""
});
