import axios from 'axios'




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getInstagramFollowers() {
    const { data } = await axios.get(
        'https://instagram.com/hakan.ylcnn/?__a=1',
        {
            headers : {
                Cookie: 'sessionid=1366435271%3AmGJkc5jVaQBHO0%3A27;'
            }    
        }
    );
    const followersCount = data.graphql.user.edge_followed_by.count; 
    return followersCount;
}


export async function getInstagramFollowing() {
    const { data } = await axios.get(
        'https://instagram.com/hakan.ylcnn/?__a=1',
        {
            headers : {
                Cookie: 'sessionid=34894237889%3AEXyD27DbKaZpT1%3A15'/*'sessionid=1366435271%3AmGJkc5jVaQBHO0%3A27;'*/
            }    
        }
    );
    const followingCount = data.graphql.user.edge_follow.count; 
    return followingCount;
}

export async function getFollewers() {
    var count = await getInstagramFollowers();
    var chunk =  Math.floor(count/12); 

    var {data} = await axios.get(
        'https://i.instagram.com/api/v1/friendships/1366435271/followers/?count=12',
        {
            headers : {
                'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)',
                'x-asbd-id': '198387',
                'x-ig-app-id': '936619743392459',
                'x-ig-www-claim': 'hmac.AR2gLbPc5Q3WtK7w6Ll7GPMoOHtYbR761btBIIJVs-X6dAS9',
                Cookie: 'sessionid=34894237889%3AEXyD27DbKaZpT1%3A15'/*'sessionid=1366435271%3AmGJkc5jVaQBHO0%3A27;'*/
            }    
        }
        ); 
         
    var max_id = data.next_max_id;
    var arr = data.users;

    
for(let i=0; i < chunk*2; i++) {
    await sleep(Math.random()*10000);

    var {data} = await axios.get(`https://i.instagram.com/api/v1/friendships/1366435271/followers/?count=12&max_id=${max_id}&search_surface=follow_list_page`, {
            headers : {
                'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)',
                'x-asbd-id': '198387',
                'x-ig-app-id': '936619743392459',
                'x-ig-www-claim': 'hmac.AR2gLbPc5Q3WtK7w6Ll7GPMoOHtYbR761btBIIJVs-X6dAS9',
                Cookie: 'sessionid=34894237889%3AEXyD27DbKaZpT1%3A15'/*'sessionid=1366435271%3AmGJkc5jVaQBHO0%3A27;'*/
            }    
        }
        );
        console.log("chunk count is: "+ data.users.length);
        for (const user of data.users) {
            arr.push(user);
        }  

        if (data.next_max_id != null)
            var max_id = data.next_max_id;
        else {
            console.log("ayrildim.....");
            break;
        }
    }
        


    //console.log(arr);
    console.log(arr.length);

    return arr;
}
 

/* -------------------------------------*//* -------------------------------------*/
/* -------------------------------------*//* -------------------------------------*/

export async function getFollowing() {
    var count = await getInstagramFollowing();
    var chunk =  Math.floor(count/12); 

    var {data} = await axios.get(
        'https://i.instagram.com/api/v1/friendships/1366435271/following/?count=12',
        {
            headers : {
                'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)',
                'x-asbd-id': '198387',
                'x-ig-app-id': '936619743392459',
                'x-ig-www-claim': 'hmac.AR2gLbPc5Q3WtK7w6Ll7GPMoOHtYbR761btBIIJVs-X6dAS9',
                Cookie: 'sessionid=34894237889%3AEXyD27DbKaZpT1%3A15'/*'sessionid=1366435271%3AmGJkc5jVaQBHO0%3A27;'*/
            }    
        }
        ); 
         
    var max_id = data.next_max_id;
    var arr = data.users;

for(let i=0; i < chunk*2; i++) {
    await sleep(Math.random()*10000);

    var {data} = await axios.get(`https://i.instagram.com/api/v1/friendships/1366435271/following/?count=12&max_id=${max_id}`, {
            headers : {
                'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)',
                'x-asbd-id': '198387',
                'x-ig-app-id': '936619743392459',
                'x-ig-www-claim': 'hmac.AR2gLbPc5Q3WtK7w6Ll7GPMoOHtYbR761btBIIJVs-X6dAS9',
                Cookie: 'sessionid=34894237889%3AEXyD27DbKaZpT1%3A15'/*'sessionid=1366435271%3AmGJkc5jVaQBHO0%3A27;'*/
            }    
        }
        );
        console.log("following count is: "+ data.users.length);
        for (const user of data.users) {
            arr.push(user);
        }  

        if (data.next_max_id != null)
            var max_id = data.next_max_id;
        else {
            console.log("ayrildim follwing.....");
            break;
        }
    }
    //console.log(arr);
    console.log(arr.length);

    return arr;
}
