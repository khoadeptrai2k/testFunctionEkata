// import React, {useState, useEffect, useRef} from 'react'
// // var Barcode = require('react-barcode');
// import Barcode from "react-barcode";
// import html2canvas from 'html2canvas';
// import axios from 'axios';
// import { Row, Col, Input } from 'antd';

// function BarcodeGenerator() {
//     const [value, setValue] = useState({
//         productCode:"",
//         productName:"",
//         productPrice:""
//     });
//     const [message, setMessage] = useState(null);
//     const wrapperRef = useRef()
//     const [data, setData] = useState([])

//     const handleInput = (e) => {
//         setValue({
//             ...value,
//             [e.target.name] : e.target.value
//         })
//     }


//     // const handlePrint = (e) => {
//     //     const opt = {
//     //         scale: 4
//     //     }
//     //     const elem = wrapperRef.current;
        
//     //     html2canvas(elem, opt).then(canvas => {
//     //         const iframe = document.createElement('iframe')
//     //         iframe.name = 'printf'
//     //         iframe.id = 'printf'
//     //         iframe.height = 0; //form page
//     //         iframe.width = 0;   //form page
//     //         document.body.appendChild(iframe)
//     //         const imgUrl = canvas.toDataURL({
//     //             format: 'jpeg',
//     //             quality: '1.0'
//     //         })
//     //         const style=`
//     //             height:80vh;
//     //             width:200vh;
//     //             position:absolute;
//     //             left:0:
//     //             top:0;
//     //         `;
//     //         const url = `<img style="${style}" src="${imgUrl}"/>`;
//     //         var newWin = window.frames["printf"];
//     //         newWin.document.write(`<body onload="window.print()">${url}</body>`);
//     //         newWin.document.close();
//     //     });
    
//     // }
//     const downloadBarcode = () => {
//         const canvas = document.getElementById("mybarcode");
//         const pngUrl = canvas
//           .toDataURL("image/png")
//           .replace("image/png", "image/octet-stream");
//         let downloadLink = document.createElement("a");
//         downloadLink.href = pngUrl;
//         downloadLink.download = "mybarcode.png";
//         document.body.appendChild(downloadLink);
//         downloadLink.click();
//         document.body.removeChild(downloadLink);
//     };


//     return (
//       <div>
//             <h2>Barcode Product</h2>
//             <Input
//                 label="Enter code"
//                 value={value.productCode}
//                 onChange={handleInput}
//                 margin="normal"
//                 name="productCode"
//             />
//             <Input
//                 label="Enter Name"
//                 value={value.productName}
//                 onChange={handleInput}
//                 margin="normal"
//                 name="productName"
//             />
//             <Input
//                 label="Enter value"
//                 value={value.productPrice}
//                 onChange={handleInput}
//                 margin="normal"
//                 name="productPrice"
//             />
            
//             <div ref={wrapperRef}>
//                 <Row>
//                     <Col>
//                         <text>{value.productName}</text>
//                     </Col>
//                     <Col>
//                         <Barcode value={value.productCode}/>
//                     </Col>
//                     <Col>
//                         <text>{value.productPrice} VNĐ</text>
//                     </Col>
//                 </Row>
//             </div>
//             {message && <p>{message}</p>}
//             <button onClick={downloadBarcode}>
//                 Print
//             </button>
//       </div>
//     );
//   }
  
//   export default BarcodeGenerator;
import React, {useState} from 'react'
import {Fab, TextField, TextareaAutosize, Grid} from '@material-ui/core'
import {ArrowBack, GetApp} from '@material-ui/icons'
import { Link } from "react-router-dom";
// var Barcode = require('react-barcode');
import { useBarcode } from '@createnextapp/react-barcode'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

function BarcodeGenerator() {
    const [barcode, setBarcode] = useState('lintangwisesa');
    const handleChange = (event) => {
        setBarcode(event.target.value ? event.target.value : '');
    };
    const { inputRef } = useBarcode({
        value: barcode,
        options: {
          background: '#ffffff',
        }
    });
    const downloadBarcode = () => {
        const canvas = document.getElementById("mybarcode");
        const pngUrl = canvas.toDataURL("image/png", 1.0)
        const pdf = new jsPDF('landscape','mm',[72, 22]);
        pdf.html(document.getElementById("mybarcode"));
        pdf.addImage(pngUrl, 'PNG', 0, 0, 72,22)
        pdf.save("download.pdf");  
        // html2canvas(document.getElementById("mybarcode")).then(canvas => {
        //     const img = canvas.toDataURL("image/jpeg",1);
        //     const pdf = new jsPDF();
        //     pdf.addImage(img,"jpeg", 0, 0);
        //     pdf.save("file.pdf");

        let downloadLink = document.createElement("a");
        downloadLink.href = pdf;
        downloadLink.download = "mybarcode.pdf";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    // })

    };

    return (
      <div>
            <Link to="/">
            <Fab style={{marginRight:10}} color="secondary">
                <ArrowBack/>
            </Fab>
            </Link>
            <span>Barcode Generator</span>
            
            <div style={{marginTop:30, marginBottom:30}}>
                <TextField onChange={handleChange} style={{width:320}}
                value={barcode} label="Barcode content" size="large" variant="outlined" color="secondary" 
                />
            </div>

            <div>
                {
                    barcode !== ''
                    ?
                    // <Barcode 
                    //     id="mybarcode" value={barcode} background='#ffffff'
                    //     lineColor='red'
                    //     width="2"
                    //     height="100"
                    //     format="CODE128"
                    //     displayValue='true'
                    //     font='monospace'
                    //     textAlign='center'
                    //     textPosition='bottom'
                    //     textMargin='5'
                    //     fontSize='12'
                    //     margin='10'
                    //     marginTop='10'
                    //     marginBottom='10'
                    //     marginLeft='10'
                    //     marginRight='10'
                    // />
                    <canvas id="mybarcode" ref={inputRef} />
                    :
                    <p>No barcode preview</p>
                }
            </div>
            <div>
                {
                    barcode ? 
                    <Grid container style={{marginTop:30}}>
                        <Grid item xs={10}>
                        <TextareaAutosize
                            style={{fontSize:18, width:250, height:100}}
                            rowsMax={4}
                            defaultValue={barcode}
                            value={barcode}
                        />
                        </Grid>
                        <Grid item xs={2}>
                        <Fab onClick={downloadBarcode} style={{marginLeft:10}} color="secondary">
                            <GetApp/>
                        </Fab>
                        </Grid>
                    </Grid> :
                    ''
                }
            </div>
      </div>
    );
  }
  
  export default BarcodeGenerator;