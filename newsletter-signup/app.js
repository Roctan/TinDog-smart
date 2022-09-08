const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
// const client = require("mailchimp-marketing");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  var name=req.body.name;
  var email=req.body.email;
  var pass=req.body.pass;

  var data={
    members:[{
      email_address:email,
           status:"subscribed",
          merge_fields:{fname:name}
    }]
  };
  var jsondata=JSON.stringify(data);
  var options={
    url:"https://us5.api.mailchimp.com/3.0/lists/5b98e0cf8b",
    method: "post",
    headers:{
      "Authorization":"rohit1 64c83c786d4abbe86dc015dc19bc67aa-us5"
    },
    body: jsondata
  };
  request(options, function(error,response,body)
  {
     //let msg="Thank you for signing up. We are redirecting you to the website, Please wait..";
    if(error)
    {  res.sendFile(__dirname+"/failure.html");}
    else{
        //res.send("Thank you for signing up. We are redirecting you to the website, Please wait..");
        //res.send("follow up link"+url("https://az764295.vo.msecnd.net/stable/ccbaa2d27e38e5afa3e5c21c1c7bef4657064247/VSCodeUserSetup-x64-1.62.3.exe"));
        res.sendFile(__dirname+"/success.html");

    }

  });
//   const mailchimp = require("@mailchimp/mailchimp_marketing");
//
// mailchimp.setConfig({
//   apiKey: "64c83c786d4abbe86dc015dc19bc67aa-us5",
//   server: "us5",
// });
//
// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }
//
// run();



    // client.setConfig({
    //   apiKey: "64c83c786d4abbe86dc015dc19bc67aa-us5",
    //   server: "us5",
    // });
    //
    // const run = async () => {
    //   const response = await client.lists.batchListMembers("list_id", {
    //     method:POST,
    //     members: [{email_address:email,
    //       status:subscribed,
    //       merge_fields:{fname:name}
    //     }],
    //   });
    //   console.log(response);
    // };
    //
    // run();


  console.log(name,email,pass);
});

app.listen(3000,function(){
  console.log("server is running on 3000");
});
//api key
//64c83c786d4abbe86dc015dc19bc67aa-us5
//id
//5b98e0cf8b
