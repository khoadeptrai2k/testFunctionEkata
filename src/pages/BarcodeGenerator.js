import React, {useState, useRef} from 'react'
// var Barcode = require('react-barcode');
import Barcode from "react-barcode";
import html2canvas from 'html2canvas';
import { Row, Col, Input } from 'antd';
import { jsPDF } from "jspdf";

function BarcodeGenerator() {
    const [value, setValue] = useState({
        productCode:"",
        productName:"",
        productPrice:""
    });
    const [message, setMessage] = useState(null);
    const wrapperRef = useRef()

    const handleInput = (e) => {
        setValue({
            ...value,
            [e.target.name] : e.target.value
        })
    }

    const downloadBarcode = (e) => {
        const opt = {
            scale: 4
        }
        const elem = wrapperRef.current;
        
        html2canvas(elem, opt).then(canvas => {
            const iframe = document.createElement('iframe')
            iframe.name = 'printf'
            iframe.id = 'printf'
            iframe.height = "150px"; //form page
            iframe.width = "150px";   //form page
            document.body.appendChild(iframe)
            const imgUrl = canvas.toDataURL({
                format: 'jpeg',
                quality: '1.0'
            })            
            const imgUrl2 = canvas.toDataURL({
                format: 'jpeg',
                quality: '1.0'
            })
            // const style=`
            //     height:80vh;
            //     width:200vh;
            //     position:absolute;
            //     left:0:
            //     top:0;
            // `;

            // const url = `<img style="${style}" src="${imgUrl}"/>`;
            const pdf = new jsPDF('landscape','mm',[72, 22]);
                pdf.html(document.getElementById("mybarcode"));
                pdf.addImage(imgUrl, 20, 0, 70, 22)

                pdf.addImage(imgUrl, -20, 0, 72, 22)

                pdf.save("download.pdf");  
            // var newWin = window.frames["printf"];
            // newWin.document.write(`<body onload="window.print()">${url}</body>`);
            // newWin.document.close();
        });
    
    }



    return (
      <div>
            <h2>Barcode Product</h2>
            <Input
                label="Enter code"
                value={value.productCode}
                onChange={handleInput}
                margin="normal"
                name="productCode"
            />
            <Input
                label="Enter Name"
                value={value.productName}
                onChange={handleInput}
                margin="normal"
                name="productName"
            />
            <Input
                label="Enter value"
                value={value.productPrice}
                onChange={handleInput}
                margin="normal"
                name="productPrice"
            />
            
            <div  id="mybarcode" ref={wrapperRef}>
                <Row>
                    <Col>
                        <text>{value.productName}</text>
                    </Col>
                    <Col>
                        <Barcode height={40} format="CODE128" value={value.productCode}/>
                    </Col>
                    <Col>
                        <text>{value.productPrice} VNĐ</text>
                    </Col>
                </Row>
            </div>
            {message && <p>{message}</p>}
            <button onClick={downloadBarcode}>
                Print
            </button>
      </div>
    );
  }
  
  export default BarcodeGenerator;

