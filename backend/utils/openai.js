// // // import "dotenv/config";
// // // const getOpenAIAPIResponse=async(message)=>{
// // //     const option={
// // //         method:"POST",
// // //         headers:{
// // //             "content-type": "application/json",
// // //             "Authorization": `Bearer ${process.env.OPEN_API_KEY}`
// // //         },
// // //         body: JSON.stringify({
// // //             model:"gpt-4o-mini",
// // //             message:[{
// // //                 role:"user",
// // //                 content:message
// // //             }]
// // //         })
// // //     };

// // //     try{
// // //         const response=await fetch (" chaturl", options);
// // //         const data=await response.json()
// // //         return data.choices[0].message.content;


// // //     }catch(err){
// // //         console.log(err);

// // //     }
    
// // // };
// // // export default getOpenAIAPIResponse;
// // import "dotenv/config";

// // const getOpenAIAPIResponse = async (message) => {
// //   const options = {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
// //     },
// //     body: JSON.stringify({
// //       model: "gpt-4o-mini",
// //       messages: [
// //         {
// //           role: "user",
// //           content: message
// //         }
// //       ]
// //     })
// //   };

// //   try {
// //     const response = await fetch(
// //       "https://api.openai.com/v1/chat/completions",
// //       options
// //     );

// //     const data = await response.json();

// //     return data.choices[0].message.content;

// //   } catch (err) {
// //     console.log(err);
// //     throw err;
// //   }
// // };

// // export default getOpenAIAPIResponse;
// import "dotenv/config";

// const getOpenAIAPIResponse = async (message) => {
//   try {
//     const response = await fetch(
//       "https://api.github.com/models/gpt-4o-mini/invocations",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.OPEN_API_KEY}`,
//         },
//         body: JSON.stringify({
//           messages: [
//             {
//               role: "user",
//               content: message,
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();
     

//     console.log("GitHub API response:", data); // 👈 ADD THIS


//     return data.choices[0].message.content;

//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// };

// export default getOpenAIAPIResponse;

import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  try {
    const response = await fetch(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPEN_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      }
    );

  const data = await response.json();

console.log("GitHub Models response:", data);

return data?.choices?.[0]?.message?.content || "No response";

  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getOpenAIAPIResponse;