
var fs = require('fs');

/*** elastic search ***/
var es = require('elasticsearch');
var client = new es.Client({
  host: 'localhost:9200'
});
/*** end elastic search ***/

/**
* Delete an existing index
*/
function deleteIndex() {
  return client.indices.delete({
      index: "gitdb"
  });
}

/**
* create the index
*/
function initIndex() {
    return client.indices.create({
        index: "gitdb"
    });
}

  function initMapping() {
    return client.indices.putMapping({
      index: "gitdb",
      type: "repos",
      body: {
          properties: {
              cont: {
                      type: "string" ,
                      analyzer: "simple",
                      search_analyzer: "simple",
                      payloads: true
              },
              class: {
                      analyzer: "simple",
                      search_analyzer: "simple",
                      payloads: true
              },
              score: { type: "integer"} ,
              suggest: {
                  type: "completion",
                  analyzer: "simple",
                  search_analyzer: "simple",
                  payloads: true
              }
          }
      }
    });
  }

  deleteIndex();
  initIndex();
  initMapping();

  fs.readFile('test_repositories.json', {encoding: 'utf-8'}, function(err, data) {

    if (err) { throw err; }
    // Build up a giant bulk request for elasticsearch.
    bulk_request = data.split('\n').reduce(function(bulk_request, line) {
      var obj, recipe;

      try {
        obj = JSON.parse(line);
      } catch(e) {
        console.log('Done reading');
        return bulk_request;
      }

      // Rework the data slightly
      recipe = {
        cont: obj.cont,
        class: obj.class,
        scre: obj.scre
      };

      bulk_request.push({index: {_index: 'gitdb', _type: 'repo'}});
      bulk_request.push(recipe);
      return bulk_request;
    }, []);

// A little voodoo to simulate synchronous insert
var busy = false;
var callback = function(err, resp) {
 if (err) { console.log(err); }

 busy = false;
};

// Recursively whittle away at bulk_request, 1000 at a time.
var perhaps_insert = function(){
 if (!busy) {
   busy = true;
   client.bulk({
     body: bulk_request.slice(0, 1000)
   }, callback);
   bulk_request = bulk_request.slice(1000);
   console.log(bulk_request.length);
 }

 if (bulk_request.length > 0) {
   setTimeout(perhaps_insert, 10);
 } else {
   console.log('Inserted all records.');
 }
};

perhaps_insert();
});
