// const labelMap = {
//     1:{name: "Church", color:"blue"},
//     2:{name:"Cousin", color: "yellow"},
//     3:{name:"Dad", color:'green'},
//     4:{name:"Eight", color:"brown"},
//     5:{name:"God", color: "white"},
//     6:{name:"House", color:"pink"},
//     7:{name:"People", color:"black"},
//     8:{name:"Red", color:"red"},
//     9:{name:"Thank you", color:"orange"},
//     10:{name:"To study", color:"gray"},
// }

const labelMap = {
    1:{name:'Hello', color:'red'},
    2:{name:'Thank You', color:'yellow'},
    3:{name:'I Love You', color:'lime'},
    4:{name:'Yes', color:'blue'},
    5:{name:'No', color:'purple'},
}

export const drawRectangle = (boxes, classes, scores, threshold, videoWidth, videoHeight, ctx)=>{
    for(let i=0; i <= boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i] > threshold){
            
            const [y,x,height,width] = boxes[i];
            const text = classes[i];
            // const name = "name";
            // const color = "color";

            // console.log("receiving input!");

            ctx.strokeStyle = labelMap[text]['color'];
            ctx.lineWidth = 10;
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';         
            
            ctx.beginPath();
            // ctx.strokeStyle = "blue";
            // ctx.lineWidth = 10;
            // ctx.fillStyle = 'white';
            // ctx.rect(30, 30, 50, 50);
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100)/100, x * videoWidth, y * videoHeight - 10);
            ctx.rect(x * videoWidth, y * videoHeight, width * videoWidth / 2, height * videoHeight / 1.5);
            ctx.stroke();
        }
    }
};

// for(let i=0; i <= boxes[0].length; i++){
//     console.log("receiving input!");
    
//     if(boxes[i] && classes[i] && scores[i] > 0.8){
//         console.log("receiving if statement!");
//     }else {
//         console.log("Not receiving if statement!");
//     }
//         // console.log("receiving input!");
//     // const [y,x,height,width] = boxes[0];
//     // console.log("X" + x);
//     // console.log("Y" + y);
//     // console.log("Height" + height);
//     // console.log("Width" + width);
//     ctx.beginPath();
//     ctx.strokeStyle = "blue";
//     ctx.lineWidth = 10;
//     ctx.fillStyle = 'white';
//     // ctx.moveTo(0, 0);
//     // ctx.lineTo(200, 100);
//     // ctx.rect(x * videoWidth, y * videoHeight, width * videoWidth / 2, height * videoHeight / 1.5);
//     ctx.rect(30, 30, 50, 50);
//     // ctx.fillStyle = 'white';
//     // ctx.font = '35px Arial';


//     ctx.stroke();
//     //}
// }