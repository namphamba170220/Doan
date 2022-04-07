// import React, { useEffect, useState } from "react";
// import accessoryApi from "../../Api/accessoryApi";
// import productApi from "../../Api/productApi";
// import Grid from "../../components/Grid/Grid";
// import Helmet from "../../components/Helmet/Helmet";
// import Section, { SectionBody } from "../../components/Section/Section";
// import AdminProductCard from "./AdminProductCard";

// export default function Admin() {
//   const [productData, setProductData] = useState([]);
//   const [accessoryData, setAccessoryData] = useState([]);

//   useEffect(() => {
//     productApi.getAll().then((res) => {
//       if (res.statusText === "OK") {
//         setProductData(res.data);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     accessoryApi.getAll().then((res) => {
//       if (res.statusText === "OK") {
//         setAccessoryData(res.data);
//       }
//     });
//   }, []);

//   return (
//     <Helmet title="Admin">
//       <Section>
//         <SectionBody>
//           <Grid col={4} mdCol={1} smCol={1} gap={1}>
//             {productData.map((item, index) => (
//               <AdminProductCard
//                 key={index}
//                 img01={item.image01}
//                 img02={item.image02}
//                 name={item.title}
//                 price={Number(item.price)}
//                 slug={item.slug}
//               ></AdminProductCard>
//             ))}
//           </Grid>
//         </SectionBody>
//       </Section>
//       <Section>
//         <SectionBody>
//           <Grid col={4} mdCol={1} smCol={1} gap={1}>
//             {accessoryData.map((item, index) => (
//               <AdminProductCard
//                 key={index}
//                 img01={item.image01}
//                 img02={item.image02}
//                 name={item.title}
//                 price={Number(item.price)}
//                 slug={item.slug}
//               ></AdminProductCard>
//             ))}
//           </Grid>
//         </SectionBody>
//       </Section>
//     </Helmet>
//   );
// }
