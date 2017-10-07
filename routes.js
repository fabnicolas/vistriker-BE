var youtube = require('./models/youtube.js');
var config = require('./config');
 
module.exports = {
    configure: function(app) {
        // Index of web server (for testing).
        app.get('/', function(req, res) {
		    res.end('No index provided.');
        });
        
        // Get channel videos by channel nickname.
        app.get('/get_videos/:nickname', function(req, res){
            let nickname=req.params.nickname;
            youtube.get_id_from_nickname(nickname).then(channel_id => {
                youtube.fetch_channel_uploads(channel_id,50).then(structured_data => {
                    youtube.parse_list_videos(structured_data).then(video_info => {
                        let new_arr = [];
                        for(let k in video_info){
                            new_arr[k] = {
                                title: video_info[k].title,
                                description: video_info[k].description,
                                video_id: video_info[k].video_id,
                                thumbnail: video_info[k].thumb,
                            }
                        }
                        res.send(new_arr);
                    }).catch(error => {console.log("Promise error: "+error)});
                }).catch(error => {console.log("Promise error: "+error)});
            }).catch(error => {console.log("Promise error: "+error)});
        });

        // Get channel similar names by channel input query.
        app.get('/search/channel/:nickname_query', function(req, res){
            let query=req.params.nickname_query;
            var list=[];
            youtube.search(query,10,'channel').then(list_channels => {
                for(let k in list_channels.items){
                    list[k]=list_channels.items[k].snippet.title;
                }
                res.send({status: 0, message: list});
            });
        });
    }
};
