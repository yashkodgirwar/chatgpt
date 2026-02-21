import "dotenv/config";
const getOpenAIAPIResponse=asyn(message)=>{
    const option={
        method:"POST",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${process.env.OPEN_API_KEY}`
        },
        body: JSON.stringify({
            model:"gpt-4o-mini",
            message:[{
                role:"user",
                content:message
            }]
        })
    };

    try{
        const response=await fetch (" chaturl", options);
        const data=await response.json()
        return data.choices[0].message.content;


    }catch(err){
        console.log(err);

    }
    export default getOpenAIAPIResponse;
}