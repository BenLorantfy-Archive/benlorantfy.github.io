const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mondrian-9afdb.firebaseio.com"
});

exports.submit = functions.https.onRequest((req, res) => {

  // Enable CORS using the `cors` express middleware.
  cors(req, res, () => {

    if (req.method !== 'POST') {
      res.status(500).send('function only accepts post requests');
      return;
    }

    var body = req.body;

    if(!body) { res.status(500).send("empty body"); return; }
    if(!body.rectangles) { res.status(500).send("missing rectangles"); return; };
    if(toString.call(body.rectangles) !== "[object Array]") { res.status(500).send("rectangles must be array"); return; };
    if(body.width === 0) { res.status(500).send("width can't be 0"); return; };
    if(body.height === 0) { res.status(500).send("height can't be 0"); return; };
    if(!body.width) { res.status(500).send("missing width"); return; };
    if(!body.height) { res.status(500).send("missing height"); return; };
    if(typeof body.width !== "number") { res.status(500).send("width must be a number"); return; };
    if(typeof body.height !== "number") { res.status(500).send("height must be a number"); return; };
    if(body.width < 0) { res.status(500).send("width can't be negative (tell it to cheer up)"); return; };
    if(body.height < 0) { res.status(500).send("height can't be negative (tell it to cheer up)"); return; };
    if(typeof body.author !== "string") { res.status(500).send("author must be a string"); return; };
    if(body.author.length > 30) { res.status(500).send("author length must be less than 30"); return; }

    var valid = validateRectangles(body.rectangles,body.width,body.height);
    if(!valid){
      res.status(500).send("rectangles aren't valid"); 
      return;
    }

    var score = calculateScore(body.rectangles);
    var data = {
      author: body.author,
      score: score,
      rectangles: body.rectangles,
      timestamp: (new Date()).toISOString()
    };

    admin.database().ref('grids/' + body.width + 'x' + body.height).transaction(function(oldData){
      if(!oldData){
        return data;
      }

      if(data.score < oldData.score){
        return data;
      }

      return oldData;
    }).then(function(){
      res.status(200).send("success");
    }).catch(function(){
      res.status(500).send("firebase set failed");
    })

  });
});

function validateRectangles(rectangles,width,height){

    //
    // Criteria for rectangles to be valid
    // -----------------------------------
    // 1. Proper format
    // 2. Have to be within width/height
    // 3. Can't overlap
    // 4. Can't be any rectangles with same dimensions
    // 5. Can't be any leftover space
    // 6. Can't have one or zero rectangles
    if(rectangles.length <= 1) return false;

    // O(n)
    for(var i = 0; i < rectangles.length; i++){
        var rectangle = rectangles[i];

        // [ Check proper format ]
        for(var key in rectangle){
          if(key != "x" && key != "y" && key != "maxX" && key != "maxY") return false;
        }

        if(typeof rectangle.x !== "number") return false;
        if(typeof rectangle.y !== "number") return false;
        if(typeof rectangle.maxX !== "number") return false;
        if(typeof rectangle.maxY !== "number") return false;

        if(rectangle.x < 0) return false;
        if(rectangle.y < 0) return false;
        if(rectangle.maxX < 0) return false;
        if(rectangle.maxY < 0) return false;

        if(!isFinite(rectangle.x)) return false;
        if(!isFinite(rectangle.y)) return false;
        if(!isFinite(rectangle.maxX)) return false;
        if(!isFinite(rectangle.maxY)) return false;       

        if(rectangle.x > rectangle.maxX) return false;
        if(rectangle.y > rectangle.maxY) return false;    

        // [ Check within width/height ]
        if(rectangle.x >= width) return false;
        if(rectangle.maxX >= width) return false;
        if(rectangle.y >= height) return false;
        if(rectangle.maxY >= height) return false;   
    }

    // O(n^2)
    for(var i = 0; i < rectangles.length; i++){
        var rectangle = rectangles[i];

        for(var j = 0; j < rectangles.length; j++){
            if(i == j) continue;
            var a = rectangle;
            var b = rectangles[j];

            // [ Check Overlap ]
            var intersects = 
                a.x <= b.maxX &&
                b.x <= a.maxX &&
                a.y <= b.maxY &&
                b.y <= a.maxY;

            if(intersects) return false;

            // [ Check if dimensions are same ]
            var widthA = a.maxX - a.x;
            var heightA = a.maxY - a.y;
            var widthB = b.maxX - b.x;
            var heightB = b.maxY - b.y;
            if(widthA == widthB && heightA == heightB) return false;
            if(widthA == heightB && heightA == widthB) return false;
        }
    }

    // [ Check for left over space ]
    var blocks = {};
    for(var i = 0; i < rectangles.length; i++){
        var rectangle = rectangles[i];

        for(var x = rectangle.x; x <= rectangle.maxX; x++){
            for(var y = rectangle.y; y <= rectangle.maxY; y++){
                blocks[x + "-" + y] = true;
            }
        }
    }   

    // Count number of blocks
    var blockCount = 0;
    for(var key in blocks){
        blockCount++;
    }

    if(blockCount != (width * height)) return false;

    return true;
}

function calculateScore(rectangles){
    var min = Number.MAX_VALUE;
    var max = Number.MAX_VALUE * -1;

    for(var i = 0; i < rectangles.length; i++){
        var rectangle = rectangles[i];
        var area = (rectangle.maxX - rectangle.x + 1) * (rectangle.maxY - rectangle.y + 1);
        min = Math.min(min,area);
        max = Math.max(max,area);
    }

    return max - min;
}