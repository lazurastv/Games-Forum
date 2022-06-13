import { Container } from "@mui/material";
import SectionHeader from "../../components/SectionHeader";
import LatestReviews from "./LatestReviews";
import SampleGames from "./SampleGames";
import TopNews from "./TopNews";

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <TopNews />
      <SectionHeader>Najnowsze recenzje</SectionHeader>
      <LatestReviews />
      <SectionHeader>Gry</SectionHeader>
      <SampleGames />
    </Container>
  );
}


// import { ConstructionOutlined, Label } from "@mui/icons-material";
// import { Button, Container, TextField } from "@mui/material";
// import { useState } from "react";

// export default function Home() {
//   const [images, setImages] = useState<File[]>([]);

//   const pasteHandler = (e: any) => {
//     console.log(...e.clipboardData.files);
//     setImages([...images, ...e.clipboardData.files]);
//   }

//   const addFile = (e: any) => {
//     console.log(e)
//   }

//   const sendHandler = (e: any) => {
//     const formData = new FormData();
//     formData.append("file", images[0]);
//     fetch("https://forum-graczy-backend.herokuapp.com/api/images/upload",
//       {
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//           "Content-Type": "multipart/form-data"
//         },
//         body: formData
//       }
//     ).then(result => {
//       console.log("success", result)
//     }).catch(error => {
//       console.log(error);
//     })

//     // axios.post("https://forum-graczy-backend.herokuapp.com/api/images/upload",
//     //     formData,
//     //     {
//     //       headers: {
//     //         "Content-Type": "multipart/form-data"
//     //       }
//     //     }
//     //   ).then(result => {
//     //       console.log("success", result)
//     //     }).catch(error => {
//     //       console.log(error);
//     //     });
//   }

//   return (
//     <Container maxWidth="xl" sx={{ my: 4 }}>
//       <TextField onPaste={pasteHandler} style={{ backgroundColor: "white", width: "50px", height: "50px" }} ></TextField>
//       {
//         images.map((x, number) => { return <Label key={number.toString()} style={{ backgroundColor: "white", width: "50px" }}>{x.name}</Label> })
//       }
//       <Button onClick={sendHandler} style={{ backgroundColor: "white", width: "50px", height: "50px" }}>SEND</Button>

//       <Button
//         variant="contained"
//         component="label"
//         onChange={addFile}
//       >
//         Upload File
//         <input
//           type="file"
//           hidden
//         />
//       </Button>

//     </Container>
//   );
// }

// (node:3264) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// (node:3264) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option