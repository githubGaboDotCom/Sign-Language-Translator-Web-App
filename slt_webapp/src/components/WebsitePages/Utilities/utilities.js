const labelMap = {
    1:{name: "Church", color:"blue"},
    2:{name:"Cousin", color: "yellow"},
    3:{name:"Dad", color:'green'},
    4:{name:"Eight", color:"brown"},
    5:{name:"God", color: "white"},
    6:{name:"House", color:"pink"},
    7:{name:"People", color:"black"},
    8:{name:"Red", color:"red"},
    9:{name:"Thank you", color:"orange"},
    10:{name:"To study", color:"gray"},
}

export const drawRectangle = (boxes, classes, scores, threshold, videoWidth, videoHeight, ctx)=>{
    for(let i=0; i <= boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i] > threshold){
            
            const [y,x,height,width] = boxes[i];
            const text = classes[i];

            ctx.strokeStyle = labelMap[text]['color'];
            ctx.lineWidth = 10;
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';         
            
            ctx.beginPath();
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100)/100, x * videoWidth, y * videoHeight - 10);
            ctx.rect(x * videoWidth, y * videoHeight, width * videoWidth / 2, height * videoHeight / 1.5);
            ctx.stroke();
        }
    }
};