var youtube = require('./models/youtube.js');
var config = require('./config');
 
module.exports = {
    configure: function(app) {
        app.get('/', function(req, res) {
		    res.end('No index provided.');
        });
        
        app.get('/get_example_videos', function(req, res){
            let nickname="NoCopyrightSounds";
            youtube.get_id_from_nickname(nickname).then(channel_id => {
                youtube.fetch_channel_uploads(channel_id,50).then(structured_data => {
                    youtube.parse_list_videos(structured_data).then(video_info => {
                        let new_arr = [];
                        for(let k in video_info){
                            new_arr[k] = {
                                title: video_info[k].title,
                                description: video_info[k].description,
                                video_url: video_info[k].url,
                                thumbnail: video_info[k].thumb,
                            }
                        }
                        res.send(new_arr)
                    }).catch(error => {console.log("Promise error: "+error)});
                }).catch(error => {console.log("Promise error: "+error)});
            }).catch(error => {console.log("Promise error: "+error)});
        });
    }
};
